# Last Click - Save the last external website your visitors clicked
[![Software License][ico-license]](LICENSE)
[![Build Status][ico-travis]][link-travis]
[![Coverage Status][ico-scrutinizer]][link-scrutinizer]
[![Quality Score][ico-code-quality]][link-code-quality]

The name 'last click' comes from marketing terms where the last click refers to the last external website a user clicked before arriving on your website.

That external website is what we try to figure out and save in this library.

## Installation
```bash
$ npm install last-click
```

## Usage
```javascript
// these are the default settings used in the library
// you can add more sources if you want
const defaultSettings = {
    sources: [
        {referrer: 'google'},
        {referrer: 'yahoo'},
        {referrer: 'bing'},
        {queryParameter: 'gclid', 'value': 'adwords'},
        {queryParameter: 'utm_source'}
    ],
    cookie: {
        name: 'last_click',
        expires: 30 * 24 * 60 * 60 // 30 days in seconds
    }
};

const lastClick = require('last-click')(defaultSettings);
console.log(lastClick.getLastClick());
```

## Test
```bash
$ npm test
```

[ico-license]: https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square
[ico-travis]: https://img.shields.io/travis/loevgaard/last-click/master.svg?style=flat-square
[ico-scrutinizer]: https://img.shields.io/scrutinizer/coverage/g/loevgaard/last-click.svg?style=flat-square
[ico-code-quality]: https://img.shields.io/scrutinizer/g/loevgaard/last-click.svg?style=flat-square

[link-travis]: https://travis-ci.org/loevgaard/last-click
[link-scrutinizer]: https://scrutinizer-ci.com/g/loevgaard/last-click/code-structure
[link-code-quality]: https://scrutinizer-ci.com/g/loevgaard/last-click