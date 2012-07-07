/*!
 * timing
 * Copyright(c) 2012 Daniel D. Shaw <dshaw@dshaw.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var util = require('util')
  , EventEmitter = require('events').EventEmitter

/**
 * Configuration.
 */

var Time = Date // yep, that's how we roll
  , debug = function () {}

/**
 * Exports.
 */

module.exports = Timing
Timing.Timer = Timer


/**
 * Timing
 *
 * @param options
 * @constructor
 */

function Timing (options) {
  if (!(this instanceof Timing)) return new Timing(options)

  options || (options = {})

  if (options.debug) debug = console.log
  if (options.microtime) Time = require('microtime')

  this.options = options
  this.timers = {}
}

util.inherits(Timing, EventEmitter)

Timing.prototype.time = function (label, options) {
  options || (options = {})

  if (this.timers[label] && !options.force) return this.timers[label]

  this.timers[label] = new Timer(label)
}

Timing.prototype.timeEnd = function(label) {
  var self = this
    , timer = this.timers[label]
  if (!timer) throw new Error('No such label: ' + label)
  timer.on('end', function () {
    self.emit('end', timer)
  })
  timer.timeEnd()
  return timer
}

Timing.prototype.clear = function (label) {
  if (this.timers[label]) {
    delete this.timers[label]
    return true
  }
  return false
}


/**
 * Timer
 *
 * @param options
 * @constructor
 */

function Timer (label) {
  if (!label) throw new Error('Timer needs a label: ' + label)

  this.label = label
  this.start = Time.now()
  this.end = null
  this.duration = null
  this.resolution = (Time.nowStruct) ? 'us' : 'ms'

  this.emit('start', this.start)
}

util.inherits(Timer, EventEmitter)

Timer.prototype.timeEnd = function() {
  this.end = Time.now()
  this.duration = this.end - this.start
  this.emit('end', this.duration)

  debug('%s: %d%s', this.label, this.duration, this.resolution)
}
