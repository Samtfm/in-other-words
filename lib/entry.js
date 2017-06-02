import Thesaurus from './thesaurus.js';



document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = document.body.clientWidth;
  canvasEl.height = document.body.clientHeight*.7;
  const submitButton = document.getElementById("submit-word");
  const wordField = document.getElementById("word-field");
  const thesaurus = new Thesaurus(submitButton, wordField, canvasEl);

  window.onresize = (e)=>{
    // thesaurus.board.resizeCanvas(document.body.clientWidth, document.body.clientHeight);;
  };


});
const axios = require('axios');
window.axios = axios;

//randoword api
// http://setgetgo.com/randomword/get.php
