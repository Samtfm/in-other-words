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
      e.detail.startInflation();
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
    // APIUtil.fetchRandomWords(5).then(res => {
    //   this.board.addWords(res.data.map(datum => datum.word));
    // }, err => console.log(err));
    APIUtil.requestRandomWords(5, words => {
      this.board.addWords(words);
    });
    // for (let i = 0; i < 4; i++) {
    //   APIUtil.fetchRandomWord().then(res => {
    //     this.board.addWord(res.data);
    //   });
    // }
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
      // APIUtil.fetchRelatedWords(wordObj.text).then(res => {
      //   console.log(res);
      //   let synonyms = res.data.find(relation => (
      //     relation.relationshipType === "synonym"
      //   ));
      //   synonyms = synonyms || {words: []};
      //   this.store[wordObj.text] = synonyms.words;
      //   callback(synonyms.words, wordObj);
      // });
    }
  }
}

export default Thesaurus;
