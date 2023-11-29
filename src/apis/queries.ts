export const wikidataUrlQuery = `PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX wd: <http://www.wikidata.org/entity/>
    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
    SELECT DISTINCT ?prop ?regex ?formatter_url WHERE {
    {?prop wdt:P1630 ?formatter_url .}
    UNION
    {?prop wdt:P3303 ?formatter_url .}
    FILTER (CONTAINS( ?formatter_url, "$1" ) )
    {?prop <http://www.wikidata.org/prop/P2302> ?o.
    ?o <http://www.wikidata.org/prop/qualifier/P1793> ?regex.}
    UNION
    {?prop wdt:P1793 ?regex .} 
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en" } .
    }`;

export const wikidataItemByPropertyQuery = (propertyId: string, propertyValue: string) =>
  `SELECT DISTINCT ?item ?itemLabel ?itemDescription ?sitelinks
    WHERE {
        ?item wdt:${propertyId} "${propertyValue}"; # Item with specified ORCID ID
            wikibase:sitelinks ?sitelinks.   
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" }
    }
    ORDER BY DESC(?sitelinks)
    `;

export const wikidataItemDescriptionQuery = (entityId: string) =>
  `PREFIX schema: <http://schema.org/>
    SELECT DISTINCT ?itemLabel ?itemDesc ?image WHERE {
        OPTIONAL {<http://www.wikidata.org/entity/${entityId}> rdfs:label ?itemLabel.
        FILTER(LANG(?itemLabel) = "en")}
        OPTIONAL {<http://www.wikidata.org/entity/${entityId}> schema:description ?itemDesc.
        FILTER ( lang(?itemDesc) = "en" )}
        OPTIONAL {
        ?subProperties wdt:P1647* wd:P18.
        ?subProperties wikibase:directClaim ?propertyRel.
        <http://www.wikidata.org/entity/${entityId}> ?propertyRel ?image
        }
    } 
    ORDER BY ASC(xsd:integer(STRAFTER(STR(?subProperties), "P")))
    LIMIT 1`;

export const wikidataItemStatementsQuery = (entityId: string) =>
  `PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX wd: <http://www.wikidata.org/entity/>
    PREFIX wdt: <http://www.wikidata.org/prop/direct/>
    SELECT DISTINCT ?property ?value ?valueUri WHERE {
    wd:${entityId} ?propertyUri ?valueUri.
    ?valueUri rdfs:label ?value.
    ?genProp <http://wikiba.se/ontology#directClaim> ?propertyUri.
    ?genProp rdfs:label ?property.
    FILTER(substr(str(?propertyUri),1,36)="http://www.wikidata.org/prop/direct/")
    FILTER(LANG(?property) = "en")
    FILTER(LANG(?value) = "en")
    }
    ORDER BY ASC(?property)`;

export const wikidataFormattedLinksQuery = (entityId: string) =>
  `SELECT DISTINCT ?property ?valueUri ?URL WHERE {
	wd:${entityId} ?propertyUri ?valueUri.
	?genProp wikibase:directClaim ?propertyUri.
	?genProp rdfs:label ?property.
	FILTER(substr(str(?propertyUri),1,36)="http://www.wikidata.org/prop/direct/")
	FILTER(LANG(?property) = "en")
	FILTER(substr(str(?valueUri),1,31)!="http://www.wikidata.org/entity/")
	?genProp wdt:P1630 ?fmt_URL .
	BIND (REPLACE( STR(?fmt_URL), "\\\\$1", ?valueUri ) AS ?URL)
	FILTER(BOUND(?URL))
  }
  ORDER BY ASC(?property)`;
