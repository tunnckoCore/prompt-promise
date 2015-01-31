/**
 * prompt-promise <https://github.com/tunnckoCore/prompt-promise>
 *
 * Copyright (c) 2014-2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var keypress = require('keypress');
var Deferred = require('native-or-another');

/**
 * Prompt for user input.
 */
exports = module.exports = prompt

function prompt(msg, opts) {
  var defer = new Deferred();
  opts = opts || {};

  process.stdout.write(msg);
  process.stdin.setEncoding('utf8');
  process.stdin.once('data', function(val) {
    if (opts.confirm === true && (opts.bool(val) || val.length - 1 === 0)) {
      defer.resolve(true);
      return;
    }
    if (!opts.confirm) {
      defer.resolve(val.trim());
      return;
    }
    defer.reject(val);
  }).resume();

  return defer.promise;
}

exports.finish = exports.done = exports.end = function() {
  return process.stdin.pause();
}

/**
 * Prompt for multi-line user input.
 */
exports.multiline = function(msg) {
  var defer = new Deferred();

  var buf = [];
  process.stdout.write(msg);
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function(val) {
    if (val === '\n' || val === '\r\n') {
      process.stdin.removeAllListeners('data');
      defer.resolve(buf.join('\n'));
    } else {
      buf.push(val.trimRight());
    }
  }).resume();

  return defer.promise;
};

/**
 * Prompt for confirmation.
 */
exports.confirm = function(msg, opts) {
  opts = opts || {};
  opts.confirm = true;
  opts.bool = opts.bool || opts.boolCheck || opts.truthy || defaulBoolCheck;
  return prompt(msg, opts);
};

/**
 * Prompt for password with optional mask.
 */
exports.password = function(msg, mask) {
  mask = !mask ? '*' : mask;
  var defer = new Deferred();
  var buf = '';

  keypress(process.stdin);
  process.stdin.setRawMode(true);
  process.stdout.write(msg);

  process.stdin.on('keypress', function onKeypress(c, key) {
    buf += c;

    if (key && key.name == 'backspace') {
      buf = buf.substring(0, buf.length - 2);
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(msg + buf.split('').map(function replaceWithMask() {
        return mask;
      }).join(''));
      return;
    }
    if (key && key.ctrl && key.name == 'c') {
      console.log();
      process.exit(0);
      return;
    }
    if (key && key.name == 'return') {
      console.log();
      process.stdin.pause();
      process.stdin.removeAllListeners('keypress');
      process.stdin.setRawMode(false);
      defer.resolve(buf.replace(/\r/g,''));
      return;
    }

    process.stdout.write(mask);
  }).resume();

  return defer.promise;
};

/**
 * Parse a boolean `str`.
 *
 * @param {String} str
 * @return {Boolean}
 * @api private
 */
function defaulBoolCheck(str) {
  return /^y|yea|yeah|yes|ok|okey|true$/i.test(str);
}
