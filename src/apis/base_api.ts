import { requestUrl } from 'obsidian';
import { WikidataApi } from './wikidata_api';
import { WikidataEntity, WikidataItemStatements, WikidataItemLinks, WikidataItemDesc } from '@models/wikidata.model';

export interface BaseWikidataApiImpl {
  getByQuery(query: string): Promise<WikidataEntity[]>;
  getByProperty(pname: string, pvalue: string): Promise<WikidataEntity[]>;
  getEntityDescription(entityId: string): Promise<WikidataItemDesc>;
  getEntityStatements(entityId: string): Promise<WikidataItemStatements>;
  getEntityLinks(entityId: string): Promise<WikidataItemLinks>;
}

export function factoryServiceProvider(): BaseWikidataApiImpl {
  return new WikidataApi();
}

export async function apiGet<T>(
  url: string,
  params: Record<string, string | number> = {},
  headers?: Record<string, string>,
): Promise<T> {
  const apiURL = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    apiURL.searchParams.append(key, value?.toString());
  });
  const res = await requestUrl({
    url: apiURL.href,
    method: 'GET',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json; charset=utf-8',
      ...headers,
    },
  });
  return res.json as T;
}
