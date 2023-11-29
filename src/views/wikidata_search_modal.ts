import { WikidataEntity } from '../models/wikidata.model';
import { ButtonComponent, Modal, Setting, TextComponent, Notice } from 'obsidian';
import { BaseWikidataApiImpl, factoryServiceProvider } from '@apis/base_api';
import WikidataSidebarPlugin from '../main';

export class WikidataSearchModal extends Modal {
  private isBusy = false;
  private okBtnRef?: ButtonComponent;
  private serviceProvider: BaseWikidataApiImpl;

  constructor(
    plugin: WikidataSidebarPlugin,
    private query: string,
    private callback: (error: Error | null, result?: WikidataEntity[]) => void,
  ) {
    super(plugin.app);
    this.serviceProvider = factoryServiceProvider();
  }

  setBusy(busy: boolean) {
    this.isBusy = busy;
    this.okBtnRef?.setDisabled(busy);
    this.okBtnRef?.setButtonText(busy ? 'Requesting...' : 'Search');
  }

  async searchWikidata() {
    if (!this.query) {
      throw new Error('No query entered.');
    }
    console.log(`Searching for ${this.query}`);
    if (!this.isBusy) {
      try {
        this.setBusy(true);
        const searchResults = await this.serviceProvider.getByQuery(this.query);
        this.setBusy(false);

        if (!searchResults?.length) {
          new Notice(`No results found for "${this.query}"`); // Couldn't find anything matching.
          return;
        }

        this.callback(null, searchResults);
      } catch (err) {
        this.callback(err as Error);
      }
      this.close();
    }
  }

  submitEnterCallback(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.isComposing) {
      this.searchWikidata();
    }
  }

  onOpen() {
    const { contentEl } = this;

    contentEl.createEl('h2', { text: 'Search wikidata' });

    contentEl.createDiv({ cls: 'book-search-plugin__search-modal--input' }, settingItem => {
      new TextComponent(settingItem)
        .setValue(this.query)
        .setPlaceholder('Search by keyword or ISBN')
        .onChange(value => (this.query = value))
        .inputEl.addEventListener('keydown', this.submitEnterCallback.bind(this));
    });

    new Setting(contentEl).addButton(btn => {
      return (this.okBtnRef = btn
        .setButtonText('Search')
        .setCta()
        .onClick(() => {
          this.searchWikidata();
        }));
    });
  }

  onClose() {
    this.contentEl.empty();
  }
}
