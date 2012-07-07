var Timing = require('..')
  , test = require('tap').test

test('hammer time', function (t) {
  t.plan(5)

  var timing = Timing()
  timing.time('hammer')

  setTimeout(function () {
    var timer = timing.timeEnd('hammer')

    t.equal(timer.label, 'hammer', 'timer label')
    t.ok(timer.start, 'timer start')
    t.ok(timer.end, 'timer end')
    t.ok(timer.duration, 'timer duration')
    t.equal(timer.resolution, 'ms', 'timer resolution')
    t.end()
  }, 500)
})

test('microtimer', function (t) {
  t.plan(5)

  var timing = Timing({ microtime: true })
  timing.time('microtimer')

  setTimeout(function () {
    var timer = timing.timeEnd('microtimer')
    console.log('%s: %d%s', timer.label, timer.duration, timer.resolution)

    t.equal(timer.label, 'microtimer', 'microtimer label')
    t.ok(timer.start, 'microtimer start')
    t.ok(timer.end, 'microtimer end')
    t.ok(timer.duration, 'microtimer duration')
    t.equal(timer.resolution, 'us', 'microtimer resolution')
    t.end()
  }, 500)
})
