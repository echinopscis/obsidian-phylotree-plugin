import { Notice, Plugin, WorkspaceLeaf } from 'obsidian';
import { WikidataListView, VIEW_TYPE_EXAMPLE } from '@views/wikidata_sidebar';
import { WikidataSearchModal } from '@views/wikidata_search_modal';
import { WikidataSuggestModal } from '@views/wikidata_suggest_modal';
import { WikidataEntity } from '@models/wikidata.model';
import {
  WikidataSidebarPluginSettingTab,
  WikidataSidebarPluginSettings,
  DEFAULT_SETTINGS,
} from '@settings/wikidata_settings';
import { BaseWikidataApiImpl, factoryServiceProvider } from '@apis/base_api';

export default class WikidataSidebarPlugin extends Plugin {
  settings: WikidataSidebarPluginSettings;
  serviceProvider: BaseWikidataApiImpl;

  async onload() {
    await this.loadSettings();

    this.serviceProvider = factoryServiceProvider();

    console.log('registering view');
    this.registerView(VIEW_TYPE_EXAMPLE, leaf => new WikidataListView(leaf, this));

    // This creates an icon in the left ribbon.
    const ribbonIconEl = this.addRibbonIcon('globe', 'Consult wikidata', () => this.useFrontmatter());
    // Perform additional things with the ribbon
    ribbonIconEl.addClass('wikidata-sidebar-plugin-ribbon-class');

    this.addCommand({
      id: 'open-wikidata-search-modal',
      name: 'Search wikidata for sidebar',
      callback: () => this.searchForWikidataSidebar(),
    });

    this.addCommand({
      id: 'use-mapped-frontmatter',
      name: 'Load wikidata from frontmatter',
      callback: () => this.useFrontmatter(),
    });

    // This adds a settings tab so the user can configure various aspects of the plugin
    this.addSettingTab(new WikidataSidebarPluginSettingTab(this.app, this));

    console.log(
      `Wikidata sidebar: version ${this.manifest.version} (requires obsidian ${this.manifest.minAppVersion})`,
    );
  }

  showNotice(message: unknown) {
    try {
      new Notice(message?.toString());
    } catch {
      // eslint-disable
    }
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async searchForWikidataSidebar(): Promise<void> {
    const item = await this.searchWikidataMetadata();
    this.loadWikidataSidebar(item.entityId);
  }

  async useFrontmatter(): Promise<void> {
    const currentPage = this.app.workspace.getActiveFile();
    const fmc = this.app.metadataCache.getFileCache(currentPage)?.frontmatter;
    console.log(fmc);

    if (fmc.hasOwnProperty(this.settings.frontmatter_wikidata_entity_property_name)) {
      const entityId = fmc[this.settings.frontmatter_wikidata_entity_property_name];
      this.loadWikidataSidebar(entityId);
    } else {
      let fmValue;
      let wdProperty;
      for (const [fmkey, fmvalue] of Object.entries(fmc)) {
        if (this.settings.frontmatter2wdpropertymapper.hasOwnProperty(fmkey.toLowerCase())) {
          fmValue = fmvalue;
          wdProperty = this.settings.frontmatter2wdpropertymapper[fmkey.toLowerCase()];
        }
      }
      console.log(`Found mapping of ${wdProperty}, looking up value ${fmValue}`);
      const item = await this.searchWikidataMetadataByProperty(wdProperty, fmValue);
      const entityId = item.entityId.split('/').pop();
      console.log(entityId);
      this.loadWikidataSidebar(entityId);
    }
  }

  async loadWikidataSidebar(entityId: string): Promise<void> {
    try {
      const myEntityId = entityId;
      const wikidataItemDesc = await this.serviceProvider.getEntityDescription(myEntityId);
      console.log(wikidataItemDesc);
      const wikidataItemDescStatements = await this.serviceProvider.getEntityStatements(myEntityId);
      console.log(wikidataItemDescStatements);
      const wikidataItemDescLinks = await this.serviceProvider.getEntityLinks(myEntityId);
      console.log(wikidataItemDescLinks);

      console.log('Now should load sidebar view');
      const { workspace } = this.app;

      let leaf: WorkspaceLeaf | null = null;
      const leaves = workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE);

      if (leaves.length > 0) {
        console.log('A leaf with our view already exists, use that');
        leaf = leaves[0];
      } else {
        console.log('Our view could not be found in the workspace, create a new leaf in the right sidebar for it');
        leaf = workspace.getRightLeaf(false);
        await leaf.setViewState({ type: VIEW_TYPE_EXAMPLE, active: true });
      }
      if (leaf.view instanceof WikidataListView) {
        console.log('Leaf is WikidataListView');
        leaf.view.setWikidataData(this, wikidataItemDesc, wikidataItemDescStatements, wikidataItemDescLinks);
        workspace.revealLeaf(leaf);
      } else {
        console.log('what is the leaf?');
      }
    } catch (err) {
      console.warn(err);
      this.showNotice(err);
    }
  }

  async searchByEntityId(entityId: string) {
    console.log(`searching for ${entityId}`);
    this.loadWikidataSidebar(entityId);
  }

  async searchWikidataMetadata(query?: string): Promise<WikidataEntity> {
    const searchResults = await this.openWikidataSearchModal(query);
    console.log(`Found ${searchResults.length}`);
    console.log('hello');
    return await this.openWikidataSuggestModal(searchResults);
  }

  async openWikidataSearchModal(query = ''): Promise<WikidataEntity[]> {
    return new Promise((resolve, reject) => {
      return new WikidataSearchModal(this, query, (error, results) => {
        return error ? reject(error) : resolve(results);
      }).open();
    });
  }

  async searchWikidataMetadataByProperty(propertyname: string, propertyvalue: string): Promise<WikidataEntity> {
    const searchResults = await this.serviceProvider.getByProperty(propertyname, propertyvalue);
    console.log(`Found ${searchResults.length}`);
    console.log('hello');
    return await this.openWikidataSuggestModal(searchResults);
  }

  async openWikidataSuggestModal(items: WikidataEntity[]): Promise<WikidataEntity> {
    return new Promise((resolve, reject) => {
      return new WikidataSuggestModal(this.app, items, (error, selectedItem) => {
        return error ? reject(error) : resolve(selectedItem);
      }).open();
    });
  }
}
