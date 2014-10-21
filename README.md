ditty-grid-stream
===

Stream observable array-grids as ditty note events to trigger soundbanks.

## Examples

```js
var DittyGridStream = require('ditty-grid-stream')

var audioContext = new AudioContext() // Web Audio API
var scheduler = require('bopper') // clock
var SoundbankTrigger = require('soundbank-trigger')
var ArrayGrid = require('array-grid')
var ObservMidi = require('observ-midi')
var MidiStream = require('midi-stream')

// set up grid mapping
var controllerMapping = getLaunchpadGridMapping()
var soundMapping = getSoundMapping()

// get mapped input midi observ
var duplexPort = MidiStream('Launchpad Mini')
var controller = ObservMidi(duplexPort, soundMapping)

DittyGridStream(controller, soundMapping, scheduler).pipe(SoundbankTrigger(soundbank))

function getSoundMapping(){
  return ArrayGrid([
    'drums#0',
    'drums#1',
    'drums#2',
    'drums#3',
  ], [8, 8])
}

function getLaunchpadGridMapping(){
  var result = []
  var message = 144
  for (var r=0;r<8;r++){
    for (var c=0;c<8;c++){
      var noteId = (r*16) + (c % 8)
      result.push(message + '/' + noteId)
    }
  }
  return ArrayGrid(result, [8, 8])
}
```