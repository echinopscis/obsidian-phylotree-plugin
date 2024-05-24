# Obsidian Phylotree Plugin

Display phylogenetic trees in Obsidian. Tree data is specified in a fenced code block in newick or nexus format, and the tree is visualised using the phylotree library.

<br>

## Changelog

### 0.2.0 

- Fix [issue #1](https://github.com/nickynicolson/obsidian-phylotree-plugin/issues/1) - translate and quote node labels when building search term

### 0.1.0 Initial revision

- Adds newick and nexus fenced code blocks to Obsidian to specify phylogenetic trees for visualisation
- Node click constructs a search for the node labels included in the clade

## Demo

TBC

## Description

TBC

## How to install

Download the zip file named "phylotree-plugin.zip" attached to the [latest release](https://github.com/echinopscis/obsidian-wikidata-plugin/releases/latest) and unzip in under the `.obsidian/plugins` directory under your Obsidian vault.

## How to use

Create a fenced code block containing phylogenetic tree data, labelled either "newick" or "nexus" depending on the tree format used. Switch to view mode and you should see a visual representation of the tree. The visualisation is interactive: clicking on a node will execute a search across the Obsidian vault for all included node labels.


## License

[Phylotree plugin](https://github.com/echinopscis/obsidian-phylotree-plugin) is licensed under the MIT license. Refer to [LICENSE](/LICENSE.TXT) for more information.

<br>

## Contributing

Feel free to contribute.

You can create an [issue](https://github.com/echinopscis/obsidian-phylotree-plugin/issues) to report a bug, suggest an improvement for this plugin, ask a question, etc.

You can make a [pull request](https://github.com/echinopscis/obsidian-phylotree-plugin/pulls) to contribute to this plugin development.

## Credits 

Thanks to the developers of phylotree, on which this plugin relies.
