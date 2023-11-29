# Obsidian Wikidata Sidebar Plugin

Load data from wikidata to a sidebar, using a direct text search or via mapped frontmatter properties.

<br>

## Changelog

### 0.1.0 Initial revision

### Features

- Specify frontmatter mappings (eg DOI - [P356](https://www.wikidata.org/wiki/Property:P356))
- Specify frontmatter property that holds a wikidata entity ID (Q-number)
- Simple text search
- Navigation through linked wikidata entities in the sidebar
- Links to external conent (to wikidata and using identifiers attached to an entity

## Demo

TBC

## Description

TBC

## How to install

Click the link to install the Wikidata sidebar plugin: [Install Link](https://obsidian.md/plugins?id=obsidian-wikidata-sidebar-plugin)

Or, Search in the Obsidian Community plugin. And install it.

## How to use

### 1. To use frontmatter properties to retrieve associated wikidata entities
Click the ribbon icon 🌍, or excute the command "Wikidata sidebar: Load wikidata from frontmatter".

### 2. To search wikidata
Use the command "Wikidata sidebar: Search wikidata for sidebar".

### 3. Select the wikidata entity from the search results.

### 4. The entity will be loaded in a sidebar.

## How to use settings

### Frontmatter property mapping

By default this is:
```
{
  orcid: 'P496',
  doi: 'P356',
  ipni_name_id: 'P961',
  ihcode: 'P5858',
}
```

### Frontmatter property for the wikidata entity ID

This defaults to `wikidata_entity_id`

## License

[Wikidata sidebar plugin](https://github.com/echinopscis/obsidian-wikidata-plugin) is licensed under the MIT license. Refer to [LICENSE](/LICENSE.TXT) for more information.

<br>

## Contributing

Feel free to contribute.

You can create an [issue](https://github.com/echinopscis/obsidian-wikidata-plugin/issues) to report a bug, suggest an improvement for this plugin, ask a question, etc.

You can make a [pull request](https://github.com/echinopscis/obsidian-wikidata-plugin/pulls) to contribute to this plugin development.

## Credits 

Sincere thanks to Toby Hudson (AKA [9909](https://github.com/99of9)) for his work on the browser plugin [Entity Explosion](https://github.com/99of9/Entity-Explosion) which inspired this plugin, and to [anpigon](https://github.com/anpigon) who developed the [obsidian book search plugin](https://github.com/anpigon/obsidian-book-search-plugin) which was used as the basis for this development.
