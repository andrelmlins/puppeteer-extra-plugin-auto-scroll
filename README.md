# puppeteer-extra-plugin-auto-scroll

> A plugin for [puppeteer-extra](https://github.com/berstend/puppeteer-extra) to auto scroll.

[![npm version](https://badge.fury.io/js/puppeteer-extra-plugin-auto-scroll.svg)](https://www.npmjs.com/package/puppeteer-extra-plugin-auto-scroll) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/andrelmlins/puppeteer-extra-plugin-auto-scroll/blob/master/LICENSE) [![Build Status](https://travis-ci.com/andrelmlins/puppeteer-extra-plugin-auto-scroll.svg?branch=master)](https://travis-ci.com/andrelmlins/puppeteer-extra-plugin-auto-scroll)

## Install

```sh
npm install puppeteer-extra-plugin-auto-scroll
# or
yarn add puppeteer-extra-plugin-auto-scroll
```

If this is your first [puppeteer-extra](https://github.com/berstend/puppeteer-extra) plugin here's everything you need:

```sh
yarn add puppeteer puppeteer-extra puppeteer-extra-plugin-auto-scroll
# or
npm install puppeteer puppeteer-extra puppeteer-extra-plugin-auto-scroll
```

## Usage

```js
const puppeteer = require('puppeteer-extra');
const autoScrollPlugin = require('puppeteer-extra-plugin-auto-scroll');

puppeteer.use(autoScrollPlugin());

async function getPage(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  await page.autoScroll();

  let content = await page.content();
  await browser.close();
  return content;
}
```

## NPM Statistics

Download stats for this NPM package

[![NPM](https://nodei.co/npm/puppeteer-extra-plugin-auto-scroll.png)](https://nodei.co/npm/puppeteer-extra-plugin-auto-scroll/)

## License

`puppeteer-extra-plugin-auto-scroll` is open source software [licensed as MIT](https://github.com/andrelmlins/puppeteer-extra-plugin-auto-scroll/blob/master/LICENSE).
