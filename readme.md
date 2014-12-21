## [![npm versi][npmjs-img]][npmjs-url] [![mit license][license-img]][license-url] [![deps status][daviddm-img]][daviddm-url]

> Sane CLI user-input (command prompt, confirm, multiline, password) as promises, it can be used with [co@4][co]

## Install
```bash
npm install prompt-promise
```

## Run examples
```bash
npm run-script with-co
npm run-script without-co
```

## Usage
> For more use-cases see [examples](./examples)

```js
var co = require('co');
var prompt = require('prompt-promise');

prompt('username: ')
.then(function fulfilled(val) {
  console.log('response:', val);
  prompt.done();
})
.catch(function rejected(err) {
  console.log('error:', err.stack);
  prompt.finish();
});

// or with `co@4`
co(function * genPrompt() {
  var username = yield prompt('username: ');
  var password = yield prompt.password('password: ');

  return yield [username, password];
})
.then(function fulfilled(array) {
  console.log('response:', array);
  prompt.end();
})
.catch(function rejected(err) {
  console.log('error:', err.stack);
  process.stdin.pause();
});
```
`.end()`, `.done()`, `.finish()` are just aliases for `process.stdin.pause();` its required, nah..


## Author
**Charlike Mike Reagent**
+ [gratipay/tunnckoCore][author-gratipay]
+ [twitter/tunnckoCore][author-twitter]
+ [github/tunnckoCore][author-github]
+ [npmjs/tunnckoCore][author-npmjs]
+ [more ...][contrib-more]


## License [![MIT license][license-img]][license-url]
Copyright (c) 2014 [Charlike Mike Reagent][contrib-more], [contributors][contrib-graf].   
Copyright (c) 2014 [TJ Holowaychuk](https://github.com/tj), [contributors][contrib-graf].  
Released under the [`MIT`][license-url] license.


[npmjs-url]: http://npm.im/prompt-promise
[npmjs-img]: https://img.shields.io/npm/v/prompt-promise.svg?style=flat&label=prompt-promise

[coveralls-url]: https://coveralls.io/r/tunnckoCore/prompt-promise?branch=master
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/prompt-promise.svg?style=flat

[license-url]: https://github.com/tunnckoCore/prompt-promise/blob/master/license.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat

[travis-url]: https://travis-ci.org/tunnckoCore/prompt-promise
[travis-img]: https://img.shields.io/travis/tunnckoCore/prompt-promise.svg?style=flat

[daviddm-url]: https://david-dm.org/tunnckoCore/prompt-promise
[daviddm-img]: https://img.shields.io/david/tunnckoCore/prompt-promise.svg?style=flat

[author-gratipay]: https://gratipay.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-npmjs]: https://npmjs.org/~tunnckocore

[contrib-more]: http://j.mp/1stW47C
[contrib-graf]: https://github.com/tunnckoCore/prompt-promise/graphs/contributors

[co]: https://github.com/tj/co

***

_Powered and automated by [readdirp + hogan.js](https://github.com/tunnckoCore), December 21, 2014_