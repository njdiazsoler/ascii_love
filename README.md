# Products Grid
====

This is an ecommerce site, where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, in a wide variety of font sizes. The homepage should display a list of products for people to browse.

Please read the instructions and FAQ below before beginning.

## Installation
----

Download the files using git or any other repository manager and run the following command to install all dependencies of the project:

#### npm install

## Available Scripts
----

For serving the app in development mode, you can use:

#### npm run dev

This command will run the app in dev mode.
For serving the app in production mode, you can use:

#### npm start

These scripts are indicated in the package.json file. 
Please, check that file if you need info on what process are running.


## Features
----

- Products are displayed in a grid, which loads more products as you scroll down. Each product has a size, a price and a date. Items with a date older than 7 days ago will show its full date.
- Users can sort items by price, id or size using the Order By button.
- The message "~ end of catalogue ~" shows there are no more results to display.

### Ads features
----

- After every 20 products, an ad will display using a fade from the left effect.
- Ads are randomly selected and they don't repeat in the same row.