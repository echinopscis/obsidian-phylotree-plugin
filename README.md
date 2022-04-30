# Obsidian Book Search Plugin

<br>

## Description

Use to query book using :

- A book title, author, publisher or ISBN (10 or 13).

Use Google Books API to get the book information.

<br>

## How to use

1. Set the folder to new file location in plugin options. And you can also add a frontmatter that is inserted when creating a note.
   ![](https://user-images.githubusercontent.com/3969643/162614248-c60baab1-ef26-4f68-bf78-d0bc462e6c41.png)

2. Excute the command "Create new book note".
   ![](https://user-images.githubusercontent.com/3969643/161973483-ab007598-e0b8-433f-9697-75ee0ef74195.png)

3. Search for books by keywords.
   ![](https://user-images.githubusercontent.com/3969643/161973979-51f642c9-626a-4015-a7e9-dfdbe6ec2cbc.png)

4. Select the book from the search results.
   ![](https://user-images.githubusercontent.com/3969643/161974310-13c3b39b-51dc-472f-b787-db64f74caf74.png)

5. Voila! A note has been created.
   ![](https://user-images.githubusercontent.com/3969643/161974593-1b7bfe69-cb9d-47d7-a43d-1d725295a122.png)

<br>

## How to use settings

### Text to insert into content
You can add content for dataview inline metadata.

#### Example template

```
# {{title}}

author:: {{author}}
publisher:: {{publisher}}
publishDate:: {{publishDate}}
totalPage:: {{totalPage}}
isbn10:: {{isbn10}}
isbn13:: {{isbn13}}

![cover]({{coverUrl}})
```

<br>

## Installation

Search in the Obsidian Community plugin. And install it.
![](https://user-images.githubusercontent.com/3969643/166097211-abb60f55-3d77-4de6-9e0d-b681f903aafc.png)
