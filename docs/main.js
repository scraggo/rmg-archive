var MidiWriter = require('midi-writer-js');
var getRandomMelody = require('./getRandomMelody');

// Needs polished. Temp implementation will add flat notes
function numToNote(num) {
  let tableNotes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  return tableNotes[Math.floor(num%12)] + Math.floor(num/12);
}

let midiStyle = document.getElementById("midiStyle");
let midiRange = document.getElementById("midiRange");
let midiLength = document.getElementById("midiLength");
let midiJump = document.getElementById("midiJump");
let midiTempo = document.getElementById("midiTempo");
let midiQTY = document.getElementById("midiQTY");
let generate = document.getElementById("generate");
let results = document.getElementById("results");

generate.addEventListener("click", function() {
  let type = midiStyle.options[midiStyle.selectedIndex].value;
  let range = midiRange.value;
  let length = midiLength.value;
  let jump = midiJump.value;
  let randomNotes = getRandomMelody({type, range, length, jump});

  let track = new MidiWriter.Track();

  let noteArray = [];

  for (let i = 0; i<randomNotes.length; i++) {
    let pitch = [randomNotes[i]];
    let duration = midiTempo.value;
    let note = new MidiWriter.NoteEvent({pitch, duration});
    noteArray.push(note);
  }

  track.addEvent(noteArray);

  let write = new MidiWriter.Writer([track]);
  let file = write.dataUri();

  let result = "";

  for (let i = 0; i < midiQTY.value; i++) {
    result += `<div style="position: relative" class="resultRow">`;
    result += `${randomNotes.map(m=>`<span>${m}</span>`).join(" ")}`;
    result += `<br>`;
    result += `${randomNotes.map(m=>`<span>${numToNote(m)}</span>`).join(" ")}`;

    result +=  `<a class="download" title="Download" href="${file}">
                  <i class="fa fa-music fa-lg" aria-hidden="true"></i>
                </a>`

    result += `</div>`;
  }

  results.innerHTML = result;
})

// For reference

// function getRandomMelody( { type   = "diatonic", // diatonic or chromatic.
//                             range  = "0 127",    // Any range string. Space as seperators.
//                             length = 10,         // How many notes
//                             jump   = 12,         // Biggest difference between notes
//                             } = {} ) {           // If no object passed all defaults used

// function zeroTo127(speed=8) {
//   var track = new MidiWriter.Track();
//   let noteArray = [];
//   for (let i = 0; i<=127; i++) {
//     let pitch = [i];
//     let duration = speed;
//     let note = new MidiWriter.NoteEvent({pitch, duration});
//     noteArray.push(note);
//   }
//   track.addEvent(noteArray);
//   var write = new MidiWriter.Writer([track]);
//   return write.dataUri();
// }

// function zeroTo127dia(speed=8) {
//   let wholeNoteBases = [0, 2, 4, 5, 7, 9, 11]; // For determining diatonic
//   var track = new MidiWriter.Track();
//   let noteArray = [];
//   for (let i = 0; i<=127; i++) {
//     if (!wholeNoteBases.includes(Math.floor(i % 12))) continue; // Skip non diatomic
//     let pitch = [i];
//     let duration = speed;
//     let note = new MidiWriter.NoteEvent({pitch, duration});
//     noteArray.push(note);
//   }
//   track.addEvent(noteArray);
//   var write = new MidiWriter.Writer([track]);
//   return write.dataUri();
// }

// document.body.innerHTML += `<a href="${zeroTo127()}" download="0t127.midi">0 to 127</a><br>`;
// document.body.innerHTML += `<a href="${zeroTo127("t20")}" download="0t127.midi">0 to 127 (Faster)</a><br><br>`;    
// document.body.innerHTML += `<a href="${zeroTo127dia()}" download="0t127.midi">0 to 127 Diatomic</a><br>`;
// document.body.innerHTML += `<a href="${zeroTo127dia("t20")}" download="0t127.midi">0 to 127 Diatomic(Faster)</a><br><br>`;    

// //This is so not pretty
// let tableNotes = ["C","C#/Db","D","D#/Eb","E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B"];

// let table = document.createElement("table");
// table.style["border"] = "solid 1px black";
// table.style["margin"] = "5px auto";
// table.style["text-align"] = "center";
// table.style["table-layout"] = "fixed";
// document.body.appendChild(table);

// let row = table.insertRow();
// let cell = row.insertCell();

// cell.innerHTML = "<b>Octave</b>";

// tableNotes.forEach(each => {
//   cell = row.insertCell();
//   cell.innerHTML = `<b>${each}</b>`;
// })

// row = table.insertRow();
// for (let i = 0; i <= 127; i++) {
//   if (i % 12 === 0) {
//     row = table.insertRow();
//     cell = row.insertCell();
//     cell.appendChild(document.createTextNode(((i/12)-1).toFixed(0)));
//   }
//   cell = row.insertCell();
//   cell.style["width"] = "50px";
//   cell.appendChild(document.createTextNode(i));
// }