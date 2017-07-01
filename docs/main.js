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


function zeroTo127(speed=8) {
  var track = new MidiWriter.Track();

  let noteArray = [];

  // 0 to 127 inclusive
  for (let i = 0; i<=127; i++) {
    let pitch = [i];
    let duration = speed;
    let note = new MidiWriter.NoteEvent({pitch, duration});
    noteArray.push(note);
  }

  track.addEvent(noteArray);

  var write = new MidiWriter.Writer([track]);

  return write.dataUri();
}


document.getElementById("app").innerHTML += `<br><a href="${zeroTo127()}" download="0t127.midi">0 to 127</a><br>`;
document.getElementById("app").innerHTML += `<br><a href="${zeroTo127("t20")}" download="0t127.midi">0 to 127 (Faster)</a><br>`;    

function otherC(speed=8) {
  var track = new MidiWriter.Track();

  let noteArray = [];

  // 0 to 127 inclusive

  let pitch = ["C-1"];
  let duration = speed;
  let note = new MidiWriter.NoteEvent({pitch, duration});
  noteArray.push(note);

  pitch = ["0"];
  duration = speed;
  note = new MidiWriter.NoteEvent({pitch, duration});
  noteArray.push(note);

  pitch = ["C0"];
  duration = speed;
  note = new MidiWriter.NoteEvent({pitch, duration});
  noteArray.push(note);

  pitch = ["12"];
  duration = speed;
  note = new MidiWriter.NoteEvent({pitch, duration});
  noteArray.push(note);

  pitch = ["C-2"];
  duration = speed;
  note = new MidiWriter.NoteEvent({pitch, duration});
  noteArray.push(note);

  pitch = ["C-2"];
  duration = speed;
  note = new MidiWriter.NoteEvent({pitch, duration});
  noteArray.push(note);


  track.addEvent(noteArray);

  var write = new MidiWriter.Writer([track]);

  return write.dataUri();
}


document.getElementById("app").innerHTML += `<br><a href="${otherC("1")}" download="otherC.midi">C-1, 0, C0, 12. C-2??</a><br>Confirmed. C-1 matches 0. C0 matches 12. C-2 does not exist<br>Higher than 127 seems to wrap back to 0 automatically.<br>`;

function midC(speed=8) {
  var track = new MidiWriter.Track();

  let noteArray = [];

  // 0 to 127 inclusive

  let pitch = ["60"];
  let duration = speed;
  let note = new MidiWriter.NoteEvent({pitch, duration});
  noteArray.push(note);

  pitch = ["C4"];
  duration = speed;
  note = new MidiWriter.NoteEvent({pitch, duration});
  noteArray.push(note);


  track.addEvent(noteArray);

  var write = new MidiWriter.Writer([track]);

  return write.dataUri();
}


document.getElementById("app").innerHTML += `<br><a href="${midC("1")}" download="midC.midi">Middle C</a><br>`;
document.getElementById("app").innerHTML += `<br>Confirmed note 60 = C4 = Middle C<br>Means our table looks like this<br>`;


//This is so not pretty
let tableNotes = ["C","C#/Db","D","D#/Eb","E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B"];

let table = document.createElement("table");
table.style["border"] = "solid 1px black";
table.style["margin"] = "5px";
table.style["text-align"] = "center";
table.style["table-layout"] = "fixed";
document.body.appendChild(table);

let row = table.insertRow();
let cell = row.insertCell();

cell.innerHTML = "<b>Octave</b>";

tableNotes.forEach(each => {
  cell = row.insertCell();
  cell.innerHTML = `<b>${each}</b>`;
})

row = table.insertRow();
for (let i = 0; i <= 127; i++) {
  if (i % 12 === 0) {
    row = table.insertRow();
    cell = row.insertCell();
    cell.appendChild(document.createTextNode(((i/12)-1).toFixed(0)));
  }
  cell = row.insertCell();
  cell.style["width"] = "50px";
  cell.appendChild(document.createTextNode(i));
}
