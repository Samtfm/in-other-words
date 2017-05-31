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
      this.fetchSynonyms(e.detail, this.addWords.bind(this));
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

  addWords(words, wordObj){
    this.board.addWords(words, wordObj);
  }

  fetchSynonyms(wordObj, callback){
    if (this.store[wordObj.text]){
      callback(this.store[wordObj.text], wordObj);
    } else {
      APIUtil.fetchRelatedWords(wordObj.text).then(res => {
        console.log(res);
        let synonyms = res.data.find(relation => (
          relation.relationshipType === "synonym"
        ));
        synonyms = synonyms || {words: []};
        this.store[wordObj.text] = synonyms.words;
        callback(synonyms.words, wordObj);
      });
    }
  }
}

export default Thesaurus;
