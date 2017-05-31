const Board = require("./board.js");
const Thesaurus = require("./thesaurus.js");
document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 600;
  canvasEl.height = 400;
  const board = new Board(canvasEl);
  const submitButton = document.getElementById("submit-word");
  const wordField = document.getElementById("word-field");

  submitButton.onclick = (e) => {
    e.preventDefault();
    console.log(e.target);
    if (wordField.value !== ''){
      board.addWord(wordField.value);
      wordField.value = '';
    }
  };

});
const axios = require('axios');
window.axios = axios;

//randoword api
// http://setgetgo.com/randomword/get.php
