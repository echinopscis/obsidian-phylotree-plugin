import { App, FuzzySuggestModal } from 'obsidian';
import { WikidataEntity } from '../models/wikidata.model';

export class WikidataSuggestModal extends FuzzySuggestModal<WikidataEntity> {
  constructor(
    app: App,
    private readonly suggestion: WikidataEntity[],
    private onChoose: (error: Error | null, result?: WikidataEntity) => void,
  ) {
    super(app);
  }

  getItems(): WikidataEntity[] {
    return this.suggestion;
  }

  getItemText(item: WikidataEntity): string {
    return `${item.entityId} ${item.label}`;
  }
  onChooseItem(item: WikidataEntity): void {
    console.log('chosen', item);
    this.onChoose(null, item);
  }
}
