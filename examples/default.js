/**
 * prompt-promise <https://github.com/tunnckoCore/prompt-promise>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var prompt = require('../index');
var result = [];

function catched(err) {
  console.log('error:', err);
  prompt.end();
}

// node < 0.11
prompt('username: ')
.then(function username(val) {
  result.push(val);

  prompt.password('password: ')
  .then(function password(val) {
    result.push(val);

    prompt.multiline('description: ')
    .then(function description(val) {
      result.push(val);

      prompt.confirm('Is this ok? (yes) ')
      .then(function isOkey(val) {
        result.push(val);
        console.log('response:', result);
        console.log('Done! :)');
        prompt.end();
      })
      .catch(catched);
    })
    .catch(catched);
  })
  .catch(catched);
})
.catch(catched);
