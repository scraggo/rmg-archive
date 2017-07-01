//var MidiWriter = require('midi-writer-js');
//
//function hotCrossBun() {
//  var track = new MidiWriter.Track();
//
//  track.addEvent([
//        new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
//        new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
//        new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
//        new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
//        new MidiWriter.NoteEvent({pitch: ['C4', 'C4', 'C4', 'C4', 'D4', 'D4', 'D4', 'D4'], duration: '8'}),
//        new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
//        new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'})
//    ], function(event, index) {
//      return {sequential:true};
//    }
//  );
//
//  var write = new MidiWriter.Writer([track]);
//
//  return write.dataUri();
//}
//
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
//
//function trulyRandom() {
//  var track = new MidiWriter.Track();
//
//  let noteArray = [];
//  let durations = ['2','4', '8'];
//
//  for (let i=0; i<50; i++) {
//    let notesHeld = getRandomInt(1, 12);
//    let pitch = [];
//    for (let j=0; j<notesHeld; j++) {
//      pitch.push(getRandomInt(20, 100));
//    }
//    let duration = durations[getRandomInt(0,3)];
//    let note = new MidiWriter.NoteEvent({pitch, duration});
//    noteArray.push(note);
//  }
//
//  track.addEvent(noteArray, function(event, index) {
//      return {sequential:false};
//    }
//  );
//
//  var write = new MidiWriter.Writer([track]);
//
//  return write.dataUri();
//}
//
//
//



function melodyTest(melody) {
//  var track = new MidiWriter.Track();
//  let melody = ['↑5', '↑6', '↓5', '↑2', '↑1', '↓5', '↓5', '↓2'];
//  let melody = [' 5', '↑6', '↓5', '↑2', '↑1', '↓5', '↓5', '↓2', ' 2'];
  let pitchMap = { '1': 'C', '2': 'D', '3': 'E', '4': 'F', '5': 'G', '6': 'A', '7': 'B'};
  let duration = 2;
  let octave = 4;
  let noteArray = [];

//  if (randomMelody) {
//    melody = randomMelody.split(" ");
//  }
//    
  for (let i=0; i<melody.length; i++) {
    let pitchNum = melody[i][1];
    let pitchDir = melody[i][0];
    if (pitchDir === '↑' && pitchNum <= melody[i-1][1]) {
      octave += 1;
//      console.log('up');
      }
    else if (pitchDir === '↓' && pitchNum >= melody[i-1][1]) {
      octave -= 1;
//      console.log('down');
      }
//    else {console.log('stay')};
    let pitchLetter = pitchMap[pitchNum];
    let pitch = [pitchLetter + octave]
    //console.log(pitch, duration);
//    let note = new MidiWriter.NoteEvent({pitch, duration});
//    noteArray.push(note);
    let note = {pitch, duration};
    noteArray.push(note);
//    console.log(noteArray);
  }
    
//  track.addEvent(noteArray, function(event, index) {
//    return {sequential:true};
//  });

//  var write = new MidiWriter.Writer([track]);

//  return write.dataUri();
    console.log('mtest: ', melody);
    return noteArray;
}





//let notes =  C,C#/Db,D,D#/Eb,E,F,F#/Gb,G,G#/Ab,A,A#/Bb,B,

//document.getElementById("app").innerHTML = `<a href="${hotCrossBun()}" download="Hot Cross Bun.midi">Hot Cross Bun</a>`;
//document.getElementById("app").innerHTML += `<br><a href="${trulyRandom()}" download="Truly Random.midi">Truly Random</a>`;
//document.getElementById("app").innerHTML += `<br><a href="${melodyTest()}" download="melodyTest.midi">Melody Test</a>`;    
//
//
let direction = ["↑", "↓"];

function melody_d(notes) {
  let melody = [];
  for (let x = 0; x < notes; x++) {
    let randDirection = direction[Math.floor(Math.random()*direction.length)];
    let diatonic7 = getRandomInt(1, 7);
    if (x === 0) {
      melody.push(` ${diatonic7}`);
    } else {
      let prevNum = melody[x-1][1];
      if (diatonic7.toString() === prevNum) {//if current note = previous note
        noArrow = getRandomInt(0,4);//skewing the chances more towards no arrow
        if (noArrow !== 0) {
          //don't put in arrow
          melody.push(` ${diatonic7}`);
          } else {
            melody.push(`${randDirection}${diatonic7}`);
          }
        } else {
            melody.push(`${randDirection}${diatonic7}`);
        }
      }
    }
  //make melody into a string
let melodyString = '';
  for (let i = 0; i<melody.length; i++) {
    if (melody[i][0] === ' ') {
      melodyString += `${melody[i][1]} `;
    } else {
      melodyString += `${melody[i]} `
    }
  }




  
//  console.log(melodyString);
  return [melody, melodyString];//for use separately in the midi function / html output
} // Direction + Number

//test
console.log(melody_d(10));
//TEST
console.log(melodyTest(melody_d(10)[0]));


//let button = document.createElement("button");
//button.innerHTML = "New Random Melody";
//button.addEventListener("click", newRandom);
//document.body.prepend(button);
//
//function newRandom() {
//  let newRandomMelody = melody_d(10);
//  console.log(newRandomMelody);
//  document.getElementById("app").innerHTML += `<br>${newRandomMelody} - <a href="${melodyTest(newRandomMelody)}" download="melodyTest.midi">Random Melody Test</a>`;
//}