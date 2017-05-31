const Board = require("./board.js");

class Thesaurus{
  constructor(submitButton, wordField, canvas) {
    this.board = new Board(canvas);
    const clearButton = document.getElementById("clear-button");

    clearButton.onclick = (e) => {
      e.preventDefault();
      this.board.clear();
    };

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
