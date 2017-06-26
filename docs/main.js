var MidiWriter = require('midi-writer-js');

var track = new MidiWriter.Track();

track.addEvent([
      new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
      new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
      new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
      new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
      new MidiWriter.NoteEvent({pitch: ['C4', 'C4', 'C4', 'C4', 'D4', 'D4', 'D4', 'D4'], duration: '8'}),
      new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
      new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'})
  ], function(event, index) {
    return {sequential:true};
  }
);

var write = new MidiWriter.Writer([track]);

window.hotCrossBun = function() {
  return write.dataUri();
}