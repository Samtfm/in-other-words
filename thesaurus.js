const Board = require("./board.js");

class Thesaurus{
  constructor(submitButton, wordField, canvas) {
    this.board = new Board(canvas);

    submitButton.onclick = (e) => {
      e.preventDefault();
      console.log(e.target);
      if (wordField.value !== ''){
        this.board.addWord(wordField.value);
        wordField.value = '';
      }
    };

    
  }
}

export default Thesaurus;
