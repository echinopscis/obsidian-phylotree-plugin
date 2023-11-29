export interface FrontMatter {
  [key: string]: string | string[];
}

export interface WikidataEntity {
  entityId: string;
  label?: string;
  description?: string;
}

export class WikidataItemMeta {
  entityId: string;
  itemDesc?: string;
  itemLabel?: string;

  constructor(entityId: string, itemDesc: string, itemLabel: string) {
    this.entityId = entityId;
    this.itemDesc = itemDesc;
    this.itemLabel = itemLabel;
  }
}

export class WikidataItemDesc {
  entityId: string;
  itemLabel: string;
  itemDesc?: string;
  image?: string;

  constructor(entityId: string, itemLabel?: string, itemDesc?: string, image?: string) {
    this.entityId = entityId;
    this.itemLabel = itemLabel;
    this.itemDesc = itemDesc;
    this.image = image;
  }
}

export class WikidataItemStatements {
  entityId: string;
  statements: Statement[];

  constructor(entityId: string, statements: Statement[]) {
    this.entityId = entityId;
    this.statements = statements;
  }
}

export class Statement {
  property: string;
  value: string;
  valueUri: string;
}

export class WikidataItemLinks {
  entityId: string;
  links: Link[];
  constructor(entityId: string, links: Link[]) {
    this.entityId = entityId;
    this.links = links;
  }
}

export class Link {
  property: string;
  valueUri: string;
  url: string;
}
