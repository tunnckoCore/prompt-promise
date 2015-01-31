/**
 * prompt-promise <https://github.com/tunnckoCore/prompt-promise>
 *
 * Copyright (c) 2014 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var prompt = require('../index');
var result = [];

// node < 0.11
prompt('username: ')
.then(function usernameResponse(val) {
  result.push(val);
  return prompt.password('password: ');
})
.then(function passwordResponse(val) {
  result.push(val);
  return prompt.multiline('description: ');
})
.then(function multilineResponse(val) {
  result.push(val);
  return prompt.confirm('Is this ok? (yes) ');
})
.then(function confirmResponse(val) {
  console.log('response:', result);
  console.log('Done! :)');
  prompt.end();
})
.catch(function errorHandler(err) {
  console.log('error:', err);
  prompt.end();
});
