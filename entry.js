const Board = require("./board.js");
const Thesaurus = require("./thesaurus.js");
document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 400;
  canvasEl.height = 200;
  const board = new Board(canvasEl);
});
