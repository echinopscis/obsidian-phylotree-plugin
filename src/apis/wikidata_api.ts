import { apiGet, BaseWikidataApiImpl } from '@apis/base_api';
import {
  WikidataEntity,
  WikidataItemDesc,
  WikidataItemStatements,
  Statement,
  WikidataItemLinks,
  Link,
} from '@models/wikidata.model';
import { WikidataResponse, WikidataEntitySearchResult } from './models/wikidata_response';
import {
  WikidataItemByPropertyResponse,
  WdItemByPropertyBinding,
} from './models/wikidata_item_by_property_sparql_reponse';
import { WikidataItemDescResponse, WdItemDescBinding } from './models/wikidata_item_desc_sparql_response';
import { WikidataItemStatementsResponse, WdItemStmtsBinding } from './models/wikidata_item_stmts_sparql_response';
import { WikidataItemLinksResponse, WdItemLinksBinding } from './models/wikidata_item_links_sparql_response';
import {
  wikidataItemByPropertyQuery,
  wikidataItemDescriptionQuery,
  wikidataItemStatementsQuery,
  wikidataFormattedLinksQuery,
} from './queries';

export class WikidataApi implements BaseWikidataApiImpl {
  constructor() {}

  async getByQuery(query: string) {
    try {
      const params = {
        action: 'wbsearchentities',
        list: 'search',
        search: query,
        format: 'json',
        language: 'en',
        type: 'item',
        limit: 50,
      };

      const searchResults = await apiGet<WikidataResponse>('https://www.wikidata.org/w/api.php', params);
      return searchResults.search.map(this.wikidataEntitySearchResult2WikidataEntity);
    } catch (error) {
      console.warn(error);
      throw error;
    }
  }

  async getByProperty(pname: string, pvalue: string) {
    try {
      const query = wikidataItemByPropertyQuery(pname, pvalue);
      const params = { query: query, format: 'json' };
      const searchResults = await apiGet<WikidataItemByPropertyResponse>('https://query.wikidata.org/sparql', params);
      console.log(searchResults);
      return searchResults.results.bindings.map(this.wikidataItemByPropertySearchResult2WikidataEntity);
    } catch (error) {
      console.warn(error);
      throw error;
    }
  }

  async getEntityDescription(entityid: string) {
    try {
      const query = wikidataItemDescriptionQuery(entityid);
      const params = { query: query, format: 'json' };
      const searchResults = await apiGet<WikidataItemDescResponse>('https://query.wikidata.org/sparql', params);
      return this.wikidataItemDescriptionResult2WikidataItemDesc(entityid, searchResults.results.bindings[0]);
    } catch (error) {
      console.warn(error);
      throw error;
    }
  }

  async getEntityStatements(entityid: string) {
    try {
      const query = wikidataItemStatementsQuery(entityid);
      const params = { query: query, format: 'json' };
      const searchResults = await apiGet<WikidataItemStatementsResponse>('https://query.wikidata.org/sparql', params);
      console.log('getEntityStatements searchResults', searchResults);
      return this.wikidataItemStatementsResult2WikidataItemStatements(entityid, searchResults.results.bindings);
    } catch (error) {
      console.warn(error);
      throw error;
    }
  }

  async getEntityLinks(entityid: string) {
    try {
      const query = wikidataFormattedLinksQuery(entityid);
      const params = { query: query, format: 'json' };
      const searchResults = await apiGet<WikidataItemLinksResponse>('https://query.wikidata.org/sparql', params);
      console.log(searchResults);
      return this.wikidataItemLinksResult2WikidataItemLinks(entityid, searchResults.results.bindings);
    } catch (error) {
      console.warn(error);
      throw error;
    }
  }

  wikidataEntitySearchResult2WikidataEntity(item: WikidataEntitySearchResult): WikidataEntity {
    const wdEntity: WikidataEntity = {
      entityId: item.id,
      label: item.label,
      description: item.description,
    };
    return wdEntity;
  }

  wikidataItemByPropertySearchResult2WikidataEntity(item: WdItemByPropertyBinding): WikidataEntity {
    const wdEntity: WikidataEntity = {
      entityId: item.item.value,
      label: item.itemLabel.value,
      description: item.itemDescription.value,
    };
    return wdEntity;
  }

  wikidataItemDescriptionResult2WikidataItemDesc(entityId: string, item: WdItemDescBinding): WikidataItemDesc {
    const wdItemDesc: WikidataItemDesc = {
      entityId: entityId,
      itemLabel: item.itemLabel.value,
      itemDesc: item.itemDesc.value,
      image: item.image?.value,
    };
    return wdItemDesc;
  }

  wikidataItemStatementsResult2WikidataItemStatements(entityid, results: WdItemStmtsBinding[]): WikidataItemStatements {
    const wdItemStatements: WikidataItemStatements = {
      entityId: entityid,
      statements: results.map(this.statementBinding2Statement),
    };
    return wdItemStatements;
  }

  statementBinding2Statement(binding: WdItemStmtsBinding): Statement {
    const statement: Statement = {
      property: binding.property.value,
      value: binding.value.value,
      valueUri: binding.valueUri.value,
    };
    return statement;
  }

  wikidataItemLinksResult2WikidataItemLinks(entityid, results: WdItemLinksBinding[]): WikidataItemLinks {
    const wdItemLinks: WikidataItemLinks = {
      entityId: entityid,
      links: results.map(this.linkBinding2Link),
    };
    return wdItemLinks;
  }

  linkBinding2Link(binding: WdItemLinksBinding): Link {
    const link: Link = {
      url: binding.URL.value,
      valueUri: binding.valueUri.value,
      property: binding.property.value,
    };
    return link;
  }
}
