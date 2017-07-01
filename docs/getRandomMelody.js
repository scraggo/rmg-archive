function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

// Arguments all optional
// Returns melody as array of midi codes.
function getRandomMelody( { type   = "diatonic", // diatonic or chromatic.
                            range  = "0 127",    // Any range string. Space as seperators.
                            length = 10,         // How many notes
                            jump   = 12,         // Biggest difference between notes
                            } = {} ) {           // If no object passed all defaults used
  
  // Error checking
  type = type.toLowerCase();
  if (type !== "diatonic" && type !== "chromatic") {
    console.log("Invalid Type passed. You are getting Diatonic");
    type = "diatonic";
  }
  
  length = Math.floor(Number(length));
  
  if (!Number(length) || length < 1) {
    console.log("Invalid length. You are getting 10 notes.")
    length = 10;
  }
  
  range = getMidiRange(range); // becomes range.min and range.max
  // End Error Checking
  
  let wholeNoteBases = [0, 2, 4, 5, 7, 9, 11]; // For determining diatonic
  let result = [];
  let lastNote = getRandomIntInclusive(range.min, range.max) // So we can decide about repitition. Unused atm.
  let currentNote = lastNote;
  
  // Helper Functions
  // Does remainder of note / 12 indicate that its a whole note? 
  function isDiatonic() {
    if (type !== "diatonic") { return true; } // We dont care
    return wholeNoteBases.includes(Math.floor(currentNote % 12)); // We do care
  }
  
  // To allow easy range checking
  function currentNoteInRange() {
    return currentNote >= range.min && currentNote <= range.max;
  }
  
  while (result.length < length) {
    let curMin = (currentNote - jump < 0) ? 0 : currentNote - jump;     //    0 is hard min
    let curMax = (currentNote + jump > 127) ? 127 : currentNote + jump; //  127 is hard max
    
    // Roll until we get a number in range
    // If type is diatonic it also rolls until its a whole note number.
    do {
      currentNote = getRandomIntInclusive(curMin, curMax);
    } while ( !currentNoteInRange() || !isDiatonic() );

    lastNote = currentNote;
    result.push(currentNote);
  }
  
  return result;
}

// Takes string. Works out Range. Can mix and match formats and orders
// "30 40", "C0 50", "C-1 10", "G3 G5", "G3 79", "30 10", "30 40 C5" all valid
function getMidiRange(range="") {
  if (typeof range !== "string" || range === "") return {min: 0, max: 127}; // No (or invalid) input
  let noteBases = {"C":0,"C#":1,"Db":1,"D":2,"D#":3,"Eb":3,"E":4,"F":5,"F#":6,"Gb":6,"G":7,"G#":8,"Ab":8,"A":9,"A#":10,"Bb":10,"B":11}
  let inputs = [];
  range.split(" ").forEach(each => inputs.push(each)) // Split input on spaces
  
  inputs = inputs.map(each => { // Map inputs to note numbers
    if (Number.isInteger(Number(each))) { // If input is a whole number
      return Number(each);
    } else { // Note String
      let note = each.match(/(?:(?!\d|-).)*/g)[0]; // Grab Note part. Thank you https://regex101.com
      let octave = Number(each.match(/[-]*\d/g));  // Grab number from string. Potentially negative
      if (noteBases[note] !== undefined) {         // Passed in note exists
        return noteBases[note] + 12* (octave+1);   // Return note number
      } else {
        console.log("Invalid Range Value Passed - ", each)
        return "Invalid"; 
      }
    }
  })
  
  inputs = inputs.filter(each => each !== "Invalid"); // Throw away any invalid input
  
  return { min: Math.min(...inputs), max: Math.max(...inputs) };
}

module.exports = getRandomMelody;