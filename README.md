# In Other Words
In Other Words is a tool for writing and coming up with ideas.
Starting with a random word (or one of their choosing), users will be able to fetch more related words from each word they click on.

Inspired by [visuwords](https://visuwords.com/) with the following modifications
 - words can be rearranged, and are not tied to their original source
 - design focuses less on the types of associations and more on the words themselves.

# wireframe

![Kiku](docs/wireframe.png)

# Features

**MVP**
  - [ ] users can enter a word to
  - [ ] words have basic collision handling, so they spread without overlapping
  - [ ] users can drag words around the screen to rearrange them
  - [ ] double-clicking a word expands fetches related words

**bonus**
  - [ ] users can manually enter words by typing them in
  - [ ] users can hold on to words by dragging them to the notepad section


# Tools/Technologies
  - [words API](https://www.wordsapi.com/)
  - html Canvas
  - webpack

# scripts
`word.js`: this class will hold the word and it's physics properties.

`api_util.js`: this script will be responsible for making dictionary requests.

`word_cloud.js`: the WordCloud will hold many words, and update their velocities based on their collisions. On clicks, this script will call an api request of the appropriate word.

`main.js`: this script will handle logic for clearing the board and updating the canvas

# Implementation Timeline
Day 1: draw words to canvas as movable objects

Day 2: implement physics to spread words apart

Day 3: Integrate API calls to fetch new words

Day 4: Add css styling to interface. Add visual effects to words.
