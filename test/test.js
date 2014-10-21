var test = require('tape')
var DittyGridStream = require('../')
var ObservGrid = require('observ-grid')
var ArrayGrid = require('array-grid')

test(function(t){
  var scheduler = FakeScheduler()
  var input = ObservGrid([], [2,2])
  var mapping = ArrayGrid(['drums#0','drums#1','drums#2', 'drums#3'], input.shape())
  var stream = DittyGridStream(input, mapping, scheduler)

  var events = []
  stream.on('data', function(data){
    events.push(data)
  })

  input.set(0,0, true)
  input.set(0,0, false)
  input.set(0,1, true)
  input.set(1,0, true)
  input.set(0,1, false)
  input.set(1,0, false)

  t.deepEqual(events, [ 
    { id: 'drums#0', event: 'start', time: 0, position: 0 },
    { id: 'drums#0', event: 'stop', time: 1, position: 1 },
    { id: 'drums#1', event: 'start', time: 2, position: 2 },
    { id: 'drums#2', event: 'start', time: 3, position: 3 },
    { id: 'drums#1', event: 'stop', time: 4, position: 4 },
    { id: 'drums#2', event: 'stop', time: 5, position: 5 } 
  ])

  t.end()

})

function FakeScheduler(){
  var pos = 0
  return {
    context: FakeAudioContext(),
    getCurrentPosition: function(){
      return pos++
    }
  }
}

function FakeAudioContext(){
  var currentTime = 0
  return {
    get currentTime(){
      return currentTime++
    }
  }
}