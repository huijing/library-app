# Simple library book tracker app

The public libraries in Singapore are really awesome, and so I've built up a large wishlist of books I'd like to read/borrow. I started out tracking the book titles in a text file stored on Dropbox, then I figured adding the dewey decimal number for each book would help when I was roaming the shelves. But since Singapore has many libraries scattered all across the island, I threw in location information for the books as well. You can see where this is going.

Eventually I thought, why not build an app for this? Yes, to some this might be a cringe-worthy phrase, but it's an excuse for me to finally get off my butt and build an app from scratch (okay, maybe not completely from scratch), and record the process.

## General objective

To have an app that allows me to track the library books on my wishlist, with information extracted from the [NLB's search function](http://catalogue.nlb.gov.sg/cgi-bin/spydus.exe/ENQ/EXPNOS/BIBENQ?ENTRY=&ENTRY_NAME=BS&ENTRY_TYPE=K&GQ=&SORTS=SQL_REL_TITLE). Information required include: title, dewey decimal number, library location, whether I'd borrowed/read the book before. 

## Development setup

1. `git clone git@github.com:huijing/library-app.git`
2. `npm install`
3. `npm run dev`
4. `gulp`

- Styles go in the `_scss` folder file, and will be compiled by Gulp
- Scripts go into the `_js` folder, and will be concatenated by Gulp

## :white_check_mark: Phase 1: Basic app setup

- Simple node server
- Express middleware
- Nunjucks as templating engine
- Mongodb as database

First pass functionality was very simple, CRUD functionality for each book entry, handled through a basic HTML form.

## :white_check_mark: Phase 2: Simple filter function

Ability to filter books based on library location and function to show/hide library information per book.

## Phase 3: Make it work offline

List of books should be available regardless of connectivity. Adding/editing of books is a secondary functionality.

## Phase 4: Add authentication

We can't have bots and bored humans spamming my list. It's a personal utility app, not a let's-all-go-to-town-on-this app. 

## Phase 5: Make it look prettier

WIP.
