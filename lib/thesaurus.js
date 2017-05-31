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
    document.addEventListener("fetchRelatedWords", (e) => {
      this.fetchSynonyms(e.detail.text, this.addWords.bind(this));
    });
    submitButton.onclick = (e) => {
      e.preventDefault();
      console.log(e.target);
      if (wordField.value !== ''){
        this.board.addWord(wordField.value);
        wordField.value = '';
      }
    };
  }

  addWords(words, pos){
    this.board.addWords(words, pos);
  }

  fetchSynonyms(word, callback){
    if (this.store[word]){
      callback(this.store[word]);
    } else {
      APIUtil.fetchRelatedWords(word).then(res => {
        console.log(res);
        const synonyms = res.data.find(relation => (
          relation.relationshipType === "synonym"
        ));
        this.store[word] = synonyms.words;
        console.log(synonyms.words);
        callback(synonyms.words, word.pos);
      });
    }
  }
}

export default Thesaurus;
