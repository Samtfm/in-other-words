const Board = require("./board.js");
import * as APIUtil from './api_util.js';

class Thesaurus{
  constructor(submitButton, wordField, canvas) {
    this.board = new Board(canvas);
    this.store = {};
    const clearButton = document.getElementById("clear-button");

    clearButton.onclick = (e) => {
      e.preventDefault();
      this.board.clearUntouched();
      wordField.focus();
    };
    submitButton.setAttribute("disabled", true);
    wordField.onkeyup = (e) => {
      console.log( e.target.value === "");
      if (e.target.value === ""){
        submitButton.setAttribute("disabled", true);
      } else {
        submitButton.removeAttribute("disabled");
      }
    };
    document.addEventListener("fetchRelatedWords", (e) => {
      this.fetchSynonyms(e.detail, this.addWords.bind(this));
    });
    submitButton.onclick = (e) => {
      e.preventDefault();
      if (wordField.value !== ''){
        this.board.addWord(wordField.value);
        wordField.value = '';
      } else {
        // APIUtil.requestRandomWords(1, words => {
        //   this.board.addWord(words[0]);
        // });
      }
    };
    APIUtil.requestRandomWords(5, words => {
      this.board.addWords(words);
    });
  }

  addWords(words, wordObj){
    this.board.addWords(words, wordObj);
    wordObj.resetSize();
  }

  fetchSynonyms(wordObj, callback){
    if (this.store[wordObj.text]){
      callback(this.store[wordObj.text], wordObj);
    } else {
      APIUtil.requestRelatedWords(wordObj.text, synonyms => {
        this.store[wordObj.text] = synonyms;
        wordObj.loading = false;
        callback(synonyms, wordObj);
      });
    }
  }
}

export default Thesaurus;
