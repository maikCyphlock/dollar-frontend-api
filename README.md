# Dolar ve | pricing app

this is a mini-app made up with astro that fetch data from https://github.com/maikCyphlock/dollar-ve-api that do an scrape and retreive the data to cloudflare workers and github actions cron deploy api every one hour
![Group 1](https://github.com/maikCyphlock/dollar-frontend-api/assets/66704744/af6175d7-3aa2-436b-9e05-c9e39ef9c7f7)


The code fetches data from an external API and then uses that data to display currency information in a visually appealing grid-card format. The data retrieved includes an image URL, the origin of the currency, the current price, and a variation in stock. The code then maps over the data to create a "dolar-card" div for each data item. Each "dolar-card" has an image, title, pricing information, and variation information displayed. The stock variation information is color-coded based on whether it has increased, decreased, or remained the same. Finally, the code uses the "grid-card" class to format the cards in a responsive grid layout.

### api status

[![Deploy API](https://github.com/maikCyphlock/dollar-ve-api/actions/workflows/deploy-api.yml/badge.svg?branch=master)](https://github.com/maikCyphlock/dollar-ve-api/actions/workflows/deploy-api.yml) [![Scrape Dolar api](https://github.com/maikCyphlock/dollar-ve-api/actions/workflows/cron-scrapper.yml/badge.svg)](https://github.com/maikCyphlock/dollar-ve-api/actions/workflows/cron-scrapper.yml)
