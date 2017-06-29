var MidiWriter = require('midi-writer-js');

function hotCrossBun() {
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

function trulyRandom() {
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
function melodyTest(randomMelody=undefined) {
  var track = new MidiWriter.Track();
  let noteArray = [];
  let melody = ['↑5', '↑6', '↓5', '↑2', '↑1', '↓5', '↓5', '↓2'];
  let pitchMap = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  let duration = 2;

  if (randomMelody) {
    melody = randomMelody.split(" ");
  }
  
  for (let i=0; i<melody.length; i++) {
    let pitchNum = melody[i][1]; 
    let pitchLetter = pitchMap[pitchNum];
    let pitch = [pitchLetter + '4']
    //console.log(pitch, duration);
    let note = new MidiWriter.NoteEvent({pitch, duration});
    noteArray.push(note);
  }
    
  track.addEvent(noteArray, function(event, index) {
    return {sequential:true};
  });

  var write = new MidiWriter.Writer([track]);

  return write.dataUri();
}

// http://computermusicresource.com/midikeys.html

let notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

document.getElementById("app").innerHTML = `<a href="${hotCrossBun()}" download="Hot Cross Bun.midi">Hot Cross Bun</a>`;
document.getElementById("app").innerHTML += `<br><a href="${trulyRandom()}" download="Truly Random.midi">Truly Random</a>`;
document.getElementById("app").innerHTML += `<br><a href="${melodyTest()}" download="melodyTest.midi">Melody Test</a><br>`;    


let direction = ["↑", "↓"];

function melody_d(notes) {
  let melody = "";
  for (let x = 0; x < notes; x++) {
    let randDirection = direction[Math.floor(Math.random()*direction.length)];
    let diatonic12 = getRandomInt(0, 12); // 0 - 11. 12 Exclusive.
    melody += `${randDirection}${diatonic12} `;
  }
  return melody.slice(0, melody.length-1);
} // Direction + Number

let button = document.createElement("button");
button.innerHTML = "New Random Melody";
button.addEventListener("click", newRandom);
document.body.prepend(button);

function newRandom() {
  let newRandomMelody = melody_d(10);
  let newRandomMelodyNotes = getNotes(newRandomMelody);
  console.log(newRandomMelody);
  document.getElementById("app").innerHTML += `<br>${newRandomMelody.split(" ").map(m => "<span class='noteOut'>" + m + "</span>").join("")}<br>
                                                   ${newRandomMelodyNotes.split(" ").map(m => "<span class='noteOut'>" + m + "</span>").join("")}<br>
                                                   <a href="${melodyTest(newRandomMelody)}" download="melodyTest.midi">Random Melody Test</a><br>`;
}

function getNotes(melody) {
  return melody.split(" ").map(m => notes[m[1]]).join(" ");
} 