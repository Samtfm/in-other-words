const Board = require("./board.js");
const Thesaurus = require("./thesaurus.js");
document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 600;
  canvasEl.height = 400;
  const board = new Board(canvasEl);

});
const axios = require('axios');
window.axios = axios;

//randoword api
// http://setgetgo.com/randomword/get.php
