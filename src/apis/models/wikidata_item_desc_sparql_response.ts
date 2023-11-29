export interface WikidataItemDescResponse {
  head: WdItemDescHead;
  results: WdItemDescResults;
}

export interface WdItemDescHead {
  vars: string[];
}

export interface WdItemDescResults {
  bindings: WdItemDescBinding[];
}

export interface WdItemDescBinding {
  itemLabel: ItemLabel;
  itemDesc: ItemDesc;
  image: Image;
}

export interface ItemLabel {
  'xml:lang': string;
  type: string;
  value: string;
}

export interface ItemDesc {
  'xml:lang': string;
  type: string;
  value: string;
}

export interface Image {
  type: string;
  value: string;
}
