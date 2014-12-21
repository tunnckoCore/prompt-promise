/**
 * prompt-promise <https://github.com/tunnckoCore/prompt-promise>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var co = require('co');
var prompt = require('../index');

function catched(err) {
  console.log('error:', err);
  prompt.end();
}

co(function * prompting() {
  var confirm = prompt.confirm;
  var password = prompt.password;
  var multiline = prompt.multiline;

  var username    = yield prompt('username: ');
  var password    = yield password('password: ');
  var description = yield multiline('description: ');
  var isOkey      = yield confirm('Is okey?: ');

  return yield [username, password, description, isOkey];
})
.then(function fulfilled(val) {
  console.log('response:', val);
  prompt.end();
})
.catch(catched);
