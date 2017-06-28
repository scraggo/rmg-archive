var MidiWriter = require('midi-writer-js');

window.hotCrossBun = function() {
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

  return write.dataUri();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

window.trulyRandom = function() {
  var track = new MidiWriter.Track();

  let noteArray = [];
  let durations = ['2','4', '8'];

  for (let i=0; i<50; i++) {
    let notesHeld = getRandomInt(1, 12);
    let pitch = [];
    for (let j=0; j<notesHeld; j++) {
      pitch.push(getRandomInt(20, 100));
    }
    let duration = durations[getRandomInt(0,3)];
    let note = new MidiWriter.NoteEvent({pitch, duration});
    noteArray.push(note);
  }

  track.addEvent(noteArray, function(event, index) {
      return {sequential:false};
    }
  );

  var write = new MidiWriter.Writer([track]);

  return write.dataUri();
}





//melody test
window.melodyTest = function() {
  var track = new MidiWriter.Track();
  let noteArray = [];
  let melody = ['↑5', '↑6', '↓5', '↑2', '↑1', '↓5', '↓5', '↓2'];
  let pitchMap = { '1': 'C', '2': 'D', '3': 'E', '4': 'F', '5': 'G', '6': 'A', '7': 'B'};
  let duration = 2;
  
  for (let i=0; i<melody.length; i++) {
    let pitchNum = melody[i][3];//the arrow is some weird $#% thing
    let pitchLetter = pitchMap[pitchNum];
    let pitch = [pitchLetter + '4']
    console.log(pitch, duration);
    let note = new MidiWriter.NoteEvent({pitch, duration});
    noteArray.push(note);
    }
    
    track.addEvent(noteArray, function(event, index) {
      return {sequential:true};
    }
  );

  var write = new MidiWriter.Writer([track]);

  return write.dataUri();
}

/**/