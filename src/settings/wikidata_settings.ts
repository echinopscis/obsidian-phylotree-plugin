import { App, PluginSettingTab, Setting } from 'obsidian';
import WikidataSidebarPlugin from '../main';
const default_frontmatter2wdpropertymapper = {
  orcid: 'P496',
  doi: 'P356',
  ipni_name_id: 'P961',
  ihcode: 'P5858',
};

export const DEFAULT_SETTINGS: WikidataSidebarPluginSettings = {
  frontmatter2wdpropertymapper: default_frontmatter2wdpropertymapper,
  frontmatter_wikidata_entity_property_name: 'wikidata_entity_id',
};

export interface WikidataSidebarPluginSettings {
  frontmatter2wdpropertymapper: Record<string, string>;
  frontmatter_wikidata_entity_property_name: string;
}

export class WikidataSidebarPluginSettingTab extends PluginSettingTab {
  plugin: WikidataSidebarPlugin;

  constructor(app: App, plugin: WikidataSidebarPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h3', { text: 'Wikidata sidebar settings' });

    new Setting(containerEl)
      .setName('Frontmatter key mappings')
      .setDesc('Mapping between frontmatter key and wikidata property IDs')
      .addTextArea(text =>
        text
          .setPlaceholder('mapping dictionary')
          .setValue(JSON.stringify(this.plugin.settings.frontmatter2wdpropertymapper))
          .onChange(async value => {
            this.plugin.settings.frontmatter2wdpropertymapper = JSON.parse(value);
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName('Frontmatter wikidata entity ID property name')
      .setDesc('Name of a frontmatter property which stores a wikidata entity ID (a Q-number)')
      .addText(text =>
        text.setPlaceholder('wikidata_entity_id').onChange(async value => {
          this.plugin.settings.frontmatter_wikidata_entity_property_name = value;
          await this.plugin.saveSettings();
        }),
      );
  }
}
