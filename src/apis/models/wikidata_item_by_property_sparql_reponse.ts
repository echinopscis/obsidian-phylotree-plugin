export interface WikidataItemByPropertyResponse {
  head: WdItemByPropertyHead;
  results: WdItemByPropertyResults;
}

export interface WdItemByPropertyHead {
  vars: string[];
}

export interface WdItemByPropertyResults {
  bindings: WdItemByPropertyBinding[];
}

export interface WdItemByPropertyBinding {
  item: Item;
  itemLabel: ItemLabel;
  itemDescription: ItemDescription;
  sitelinks: Sitelinks;
}

export interface Item {
  type: string;
  value: string;
}

export interface ItemLabel {
  'xml:lang': string;
  type: string;
  value: string;
}

export interface ItemDescription {
  'xml:lang': string;
  type: string;
  value: string;
}

export interface Sitelinks {
  datatype: string;
  type: string;
  value: string;
}
