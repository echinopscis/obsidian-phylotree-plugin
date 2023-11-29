import { ItemView, WorkspaceLeaf } from 'obsidian';
import { WikidataItemDesc, WikidataItemStatements, Statement, WikidataItemLinks, Link } from '@models/wikidata.model';
import WikidataSidebarPlugin from '../main';

export const VIEW_TYPE_EXAMPLE = 'wikidata-list-view';

export class WikidataListView extends ItemView {
  plugin: WikidataSidebarPlugin;
  wikidataItemDesc: WikidataItemDesc;
  wikidataItemStatements: WikidataItemStatements;
  wikidataItemLinks: WikidataItemLinks;

  constructor(leaf: WorkspaceLeaf, plugin: WikidataSidebarPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType() {
    return VIEW_TYPE_EXAMPLE;
  }

  getDisplayText() {
    return 'Display text';
  }

  setWikidataData(
    plugin: WikidataSidebarPlugin,
    wikidataItemDesc: WikidataItemDesc,
    wikidataItemStatements: WikidataItemStatements,
    wikidataItemLinks: WikidataItemLinks,
  ) {
    this.plugin = plugin;
    this.wikidataItemDesc = wikidataItemDesc;
    this.wikidataItemStatements = wikidataItemStatements;
    this.wikidataItemLinks = wikidataItemLinks;

    const container = this.containerEl.children[1];
    container.empty();
    container.createEl('h4', { text: 'Wikidata' });
    if (this.wikidataItemDesc !== undefined) {
      const h = container.createEl('h6');
      const a = h.createEl('a');
      a.href = `https://www.wikidata.org/wiki/${this.wikidataItemDesc.entityId}`;
      a.text = this.wikidataItemDesc.entityId;
    }
    if (this.wikidataItemDesc.itemLabel !== undefined) {
      if (this.wikidataItemDesc.itemDesc !== undefined) {
        container.createEl('h6', { text: `${this.wikidataItemDesc.itemLabel} (${this.wikidataItemDesc.itemDesc})` });
      } else {
        container.createEl('h6', { text: this.wikidataItemDesc.itemLabel });
      }
    }
    if (this.wikidataItemDesc.image !== undefined) {
      const img = container.createEl('img');
      img.src = this.wikidataItemDesc.image;
    }
    container.createEl('hr');
    this.wikidataItemStatements.statements.forEach(function (statement: Statement) {
      console.log(statement.valueUri, statement.value);
      container.createEl('b', { text: statement.property + ': ' });
      const a = container.createEl('a');
      a.text = statement.value;
      a.addEventListener('click', async () => {
        console.log('clicked');
        await plugin.searchByEntityId(statement.valueUri.split('/').pop());
      });
      container.appendText(' ');

      const a_ext = container.createEl('a');
      a_ext.className = 'external-link';
      a_ext.href = statement.valueUri;
      a_ext.text = '...';
      container.appendText(' ');
      container.createEl('br');
    });
    container.createEl('hr');
    this.wikidataItemLinks.links.forEach(function (link: Link) {
      container.createEl('b', { text: link.property + ': ' });
      const a = container.createEl('a');
      a.href = link.url;
      a.text = link.valueUri;
      a.className = 'external-link';
      container.appendText(' ');
      container.createEl('br');
    });
    container.createEl('hr');
  }

  async onOpen() {
    console.log('in onOpen');
  }

  async onClose() {
    // Nothing to clean up.
  }
}
