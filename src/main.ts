import { App, Plugin, MarkdownPostProcessorContext } from 'obsidian';
import * as phylotree from 'phylotree';

export default class PhyloPlugin extends Plugin {
  async onload() {
    this.registerMarkdownCodeBlockProcessor('newick', this.phyloCodeBlockProcessor(this.app, 'nwk'));
    this.registerMarkdownCodeBlockProcessor('nexus', this.phyloCodeBlockProcessor(this.app, 'nexus'));
  }

  onunload() {}

  phyloCodeBlockProcessor(app: App, phyloTreeFormat: string) {
    return (newick: string, el: HTMLElement, _: MarkdownPostProcessorContext) => {
      const tree_container = el.createEl('div');
      tree_container.className = 'tree-container';
      tree_container.id = 'tree-container';
      const tree = new phylotree.phylotree(newick, { type: phyloTreeFormat });
      const renderOptions = {
        container: tree_container,
        height: tree_container.clientHeight,
        width: tree_container.clientWidth,
        'left-right-spacing': 'fit-to-size',
        'top-bottom-spacing': 'fit-to-size',
        selectable: true,
        'restricted-selectable': false,
        'binary-selectable': false,
        collapsible: false,
        transitions: false,
        'show-scale': false,
        'align-tips': false,
        zoom: false,
        reroot: false,
        hide: false,
        brush: false,
        branches: 'step',
        'label-nodes-with-name': true,
        'internal-names': true,
        'node-styler': function (element: HTMLElement, data: phylotree.Node) {
          element.on('click', function () {
            if (tree.isLeafNode(data)) {
              const query = '"' + data.data.name.replace('_', ' ') + '"';
              app['internalPlugins'].plugins['global-search'].instance.openGlobalSearch(query);
            } else {
              const sel = tree.selectAllDescendants(data, true, true);
              const nodeLabels = sel.filter(obj => obj.data.name.length > 0).map(obj => obj.data.name.replace('_', ' '));
              console.log(nodeLabels);
              const query = '"' + nodeLabels.join('" OR "') + '"';
              app['internalPlugins'].plugins['global-search'].instance.openGlobalSearch(query);
            }
          });
        },
      };
      const rendered_tree = tree.render(renderOptions);
      tree_container.append(rendered_tree.show());
    };
  }
}
