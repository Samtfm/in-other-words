import Thesaurus from './thesaurus.js';

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 800;
  canvasEl.height = 600;

  const submitButton = document.getElementById("submit-word");
  const wordField = document.getElementById("word-field");
  const thesaurus = new Thesaurus(submitButton, wordField, canvasEl);

});
const axios = require('axios');
window.axios = axios;

//randoword api
// http://setgetgo.com/randomword/get.php
