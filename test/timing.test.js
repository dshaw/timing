var Timing = require('..')
  , Timer = Timing.Timer
  , test = require('tap').test

test('Timing', function (t) {
  t.ok(Timing, 'exports Timing')
  t.ok(Timer, 'exports Timer')

  var timing = new Timing

  t.isa(timing, Timing, 'timing is an instance of Timing')
  t.ok(timing.options, 'timing exposes options')
  t.ok(timing.timers, 'initialized timers hash')

  t.end()
})

test('timing timer', function (t) {
  t.plan(1)

  var timing = new Timing
    , timeout = 500

  timing.time('hammer')

  setTimeout(function () {
    var timer = timing.timeEnd('hammer')
    t.equal(Math.round(timer.duration/10), Math.round(timeout/10), 'timer duration')
    t.end()
  }, timeout)
})

test('timing with microtime', function (t) {
  t.plan(1)

  var timing = new Timing({ microtime: true, debug: true })
    , timeout = 500

  timing.time('hammer')

  setTimeout(function () {
    var timer = timing.timeEnd('hammer')
    t.equal(Math.round(timer.duration/10000), Math.round(timeout*1000/10000), 'timer duration')
    t.end()
  }, timeout)
})
