const Board = require("./board.js");
import * as APIUtil from './api_util.js';

class Thesaurus{
  constructor(submitButton, wordField, canvas) {
    this.board = new Board(canvas);
    this.store = {};
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

  fetchSynonyms(word, callback){
    if (this.store[word]){
      callback(this.store[word]);
    } else {
      APIUtil.fetchSynonyms(word).then(res => {
        const synonyms = res.data.find(relation => (
          relation.relationshipType === "synonym"
        ));
        this.store[word] = synonyms.words;
        callback(synonyms.words);
      });
    }
  }
}

export default Thesaurus;
