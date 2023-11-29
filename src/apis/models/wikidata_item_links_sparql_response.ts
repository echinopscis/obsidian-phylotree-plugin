export interface WikidataItemLinksResponse {
  head: WdItemLinksHead;
  results: WdItemLinksResults;
}

export interface WdItemLinksHead {
  vars: string[];
}

export interface WdItemLinksResults {
  bindings: WdItemLinksBinding[];
}

export interface WdItemLinksBinding {
  property: Property;
  valueUri: ValueUri;
  URL: Url;
}

export interface Property {
  'xml:lang': string;
  type: string;
  value: string;
}

export interface ValueUri {
  type: string;
  value: string;
}

export interface Url {
  type: string;
  value: string;
}
