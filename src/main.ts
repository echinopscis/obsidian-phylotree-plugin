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
      // Test if we should define width and height using user supplied values
			var first_line = newick.split(/\r?\n/)[0];
			const regex = /height=(?<height>\d+),width=(?<width>\d+)/;
			let x = regex.exec(first_line);
			var width = tree_container.clientWidth;
			var height = tree_container.clientHeight;
			console.log(x);
			if (x){
				height = parseInt(x.groups['height']);
				width = parseInt(x.groups['width']);
			}      
      const tree = new phylotree.phylotree(newick, { type: phyloTreeFormat });
      const renderOptions = {
        container: tree_container,
        height: height,
        width: width,
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
