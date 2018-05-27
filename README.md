# page-exists [![Build Status](https://travis-ci.org/nukeop/page-exists.svg?branch=master)](https://travis-ci.org/nukeop/page-exists)
> Check if a page can be accessed or returns an error code

## Installation
``` shell
$ npm install --save page-exists
```

## Usage
``` javascript
const pageExists = require('page-exists');
pageExists('https://httpstat.us/200').then(
	exists => console.log(exists)
); //prints true

pageExists('https://httpstat.us/404'.then(
	exists => console.log(exists)
); //prints false

pageExists.many([
	'https://httpstat.us/200',
    'https://httpstat.us/404',
    'https://httpstat.us/500'
]).then(results => console.log(results)); //prints a map of results
```

## About
### License
Copyright © 2018, [nukeop](https://github.com/nukeop).
Released under the [MIT License](LICENSE).
