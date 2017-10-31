# Random-Music-Generators

# PROJECT OUTLINE

## Random Melody Generator

Midi Style - Diatonic or Chromatic 
- possibly rename to "Tonality"

Note Range - user specified, default G3 G5

Midi Length - number of notes in melody, default 10 
- possibly rename to "No of Notes"

Max Jump - 12 (octave)
- Possibly put an instruction for user that 12 = octave

Note Durations - the rhythm length, 2 is default
- Probably best as drop-down menu that the user can tell that 2 is a "half-note"

No of Melodies - 10 is default
- this may not be needed for the user-end: if user wants more melodies, he can generate again. If he wants fewer it's a non-issue.

IDEAS:
- Add tempo
- Add time signature (though if the rhythm is constant, it doesn't really matter)

## Random Chord Progression Generator

Codepen:

>    Generate a random set of major, minor, diminished, and augmented chords.
>
>    Number of chords in a measure: 8
>
>    Number of chord progressions: 10
>
>    20 Random Progressions of 8 Chords
>
>    1.   Ebm | E | Gdim | F | C#dim | Fm | B+ | F+
>    2.   F#m | B | E+ | Bb+ | Gdim | F | Bm | Bdim
>    3.   A#dim | Gm | A+ | C#dim | C#m | G#dim | Bdim | Bdim
>    4.   Em | Eb+ | Abm | D+ | Eb+ | Eb+ | D | C
>    5.   Fdim | Ab+ | Gm | B+ | E+ | Cdim | Gdim | Bb+
>    6.   Edim | Cm | Em | F | E | F#m | C+ | C#

Code:
```
  let replaceObj = {'Ebdim': 'D#dim', 'Abdim': 'G#dim', 'Bbdim': 'A#dim'};
  let chRoot = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
  let chQuality = ['', 'm', 'dim', '+'];
```
The idea is that every possible chord (3 notes simultaneous) can be generated, but I limited the "spelling" of the chords for music theory reasons. 

C Chords:
- C is [C, E, G] in some octave
- Cm is [C, Eb, G]
- Cdim is [C, Eb, Gb]
- C+ is [C, E, G#]

The notes will be limited in range so that the notes won't be too high in one chord and too low in another. Example: C chord might be: [C3, E3, G3] while an F chord might be [C3, F3, A3] (instead of [F3, A3, C4])

For now, we can set a steady duration ('2' or '1') but down the road, I'd like to add repetitions with different durations.

Would like to have a bass note in another track.

## Random Rhythm Generator

Codepen display
```
Generate 200 random measures of rhythms.
Choose Time Signature:    
Choose Rhythm Types:

200 Measures of Random Rhythms - 8th Triplets in 7/4

Guide to rhythmic values: 
    1/2 = half note. 1/4 = quarter note. 3/4 = dotted half note. 1/16 = sixteenth note. 3/16 = dotted 8th note.
    1/6 = quarter note triplet (2 tied 8th note triplets). 1/12 = 8th note triplet. 1/24 = 16th note triplet. 
    5/24 = 8th note tied to an 8th note triplet.

1/4 3/4 3/4
1/2 1/12 1/6 1/12 3/4 1/12 1/12
1/6 1/12 3/4 1/2 1/12 1/6
1/4 1/12 1/4 1/4 3/4 1/6
3/4 1/2 1/4 1/6 1/12
1/2 1/6 1/4 1/6 1/6 1/4 1/6 1/12
1/4 1/4 1/2 3/4
```

- Add ability to set the tempo

- Add a separate percussion track that plays a steady '4' or '8' note (a click track) (depending on the time signature)

- Have this rhythm repeat 8 times

- *support was recently added for 8t and 16t! Also: for 5/24, we can do ['8', '8t'] and they'll be added together. Sweet!

## Random Mode & Meter Generator

Codepen
```
Generate a random set of modes, meters, tempos, and feels. A full compositional palette.
1.   F#/Gb Melodic Minor 15/8 130bpm Shuffle
2.   D Augmented 4/4 165bpm Straight
3.   C#/Db Whole Tone 7/8 125bpm Straight
4.   D#/Eb Diminished 9/8 125bpm Straight
5.   A Diminished 3/4 135bpm Straight
6.   B Whole Tone 11/8 115bpm Straight
```

This one will take the most messing with - it's to generate a backing track with drums, bass, piano for someone to practice over.

- Each mode will have a chord associated with it.
- Each time signature will have a rhythm associated with it.
- Shuffle vs Straight: this will determine if the rhythm will have triplets or not.

## Combinations

When we've set up the basics, we could combine a number of elements.

- Melodies & Chord progressions could have random rhythms
- Mode / meter could have a random chord progression
- A Chord progression could have a melody that fits with it (would be tough but I think do-able)






---
Codepen:
- https://codepen.io/scraggo/pen/JNveOq

I found 2 frameworks on github for the MIDI thing:

- https://github.com/grimmdude/MidiWriterJS - * going with this one - works, seems better for rhythm.
- https://github.com/walmik/scribbletune - (in case above doesn't work)


I was looking into the best way to 'require' node modules in sites, and standard practice seems to be using browserify.org
    (also Webpack and RequireJS)

Making a file available for download:
* [javascript allow user to download file - Google Search](https://www.google.com/search?q=javascript+allow+user+to+download+file&rlz=1C5CHFA_enUS579US579&oq=javascript+allow+user&aqs=chrome.1.69i57j0l2.4608j0j7&sourceid=chrome&ie=UTF-8)
* [javascript - Create a file in memory for user to download, not through server - Stack Overflow](https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server)
* [Using HTML5/Javascript to generate and save a file - Stack Overflow](https://stackoverflow.com/questions/2897619/using-html5-javascript-to-generate-and-save-a-file)
* [How to create a file and generate a download with Javascript in the Browser (without a server) | Our Code World](http://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server)
* [JavaScript – Creating A Downloadable File in the Browser – Chris West's Blog](http://cwestblog.com/2014/10/21/javascript-creating-a-downloadable-file-in-the-browser/)

The data URI ideas I've seen work before. Depends how file is encoded.

Server ideas:

- Github pages
- Heroku
- ?


Confirmed note 60 = C4 = Middle C. Some standards its C3, some C4, some C5.
https://www.youtube.com/watch?v=FtqgqYRDTDg :)

# Changelog

*Sept 2017*
- Slight tweaks in index.html styles.

*July 2017*
- Random Melody Generator V1 in good working form.

*June 2017*
- The node_modules folder is quickly spiraling out of control.
- Initial package.json added.
- Have added node_modules to .gitignore
