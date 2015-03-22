/**
 * prompt-promise <https://github.com/tunnckoCore/prompt-promise>
 *
 * Copyright (c) 2014-2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var keypress = require('keypress');
var chalk = require('chalk');
var Deferred = require('native-or-another');

/**
 * Prompt for user input.
 */
exports = module.exports = prompt

function prompt(msg, opts) {
  var defer = new Deferred();
  opts = opts || {};
  opts.bool = opts.bool || opts.boolCheck || opts.truthy || defaulBoolCheck;

  process.stdout.write(msg);
  process.stdin.setEncoding('utf8');
  process.stdin.once('data', function(val) {
    if ((val.length - 1) === 0) {
      val = opts.default || '';
    }
    if (opts.confirm) {
      defer.resolve(opts.bool(val));
      process.stdin.pause();
      return;
    }
    defer.resolve(val.trim());
    process.stdin.pause();
  }).resume()

  return defer.promise;
}

/**
 * Prompt for multi-line user input.
 */
exports.multiline = function(msg, opts) {
  var defer = new Deferred();
  opts = opts || {};

  var buf = [];
  process.stdout.write(msg);
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function(val) {
    if (val === '\n' || val === '\r\n') {
      process.stdin.removeAllListeners('data');
      if (buf.length === 0) {
        buf = [opts.default] || [];
      }
      defer.resolve(buf.join('\n'));
      process.stdin.pause();
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
  return prompt(msg, opts);
};

/**
 * Prompt for password with optional mask.
 */
exports.password = function(msg, opts) {
  opts = opts || {};
  opts.mask = !opts.mask ? '*' : opts.mask;
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
        return opts.mask;
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

    process.stdout.write(opts.mask);
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
  return /^y(?:es)?|t(?:rue)?|ok(?:ey)?$/i.test(str);
}
