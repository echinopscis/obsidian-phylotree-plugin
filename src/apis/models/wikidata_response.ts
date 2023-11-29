export interface WikidataResponse {
  searchinfo: Searchinfo;
  search: WikidataEntitySearchResult[];
  'search-continue': number;
  success: number;
}

export interface Searchinfo {
  search: string;
}

export interface WikidataEntitySearchResult {
  id: string;
  title: string;
  pageid: number;
  display: Display;
  repository: string;
  url: string;
  concepturi: string;
  label: string;
  description?: string;
  match: Match;
  aliases?: string[];
}

export interface Display {
  label: Label;
  description?: Description;
}

export interface Label {
  value: string;
  language: string;
}

export interface Description {
  value: string;
  language: string;
}

export interface Match {
  type: string;
  language: string;
  text: string;
}
