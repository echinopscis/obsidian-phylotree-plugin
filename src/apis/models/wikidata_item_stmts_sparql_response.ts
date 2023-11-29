export interface WikidataItemStatementsResponse {
  head: WdItemStmtsHead;
  results: WdItemStmtsResults;
}

export interface WdItemStmtsHead {
  vars: string[];
}

export interface WdItemStmtsResults {
  bindings: WdItemStmtsBinding[];
}

export interface WdItemStmtsBinding {
  property: Property;
  value: Value;
  valueUri: ValueUri;
}

export interface Property {
  'xml:lang': string;
  type: string;
  value: string;
}

export interface Value {
  'xml:lang': string;
  type: string;
  value: string;
}

export interface ValueUri {
  'xml:lang': string;
  type: string;
  value: string;
}
