const Board = require("./board.js");
document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 400;
  canvasEl.height = 200;
  const ctx = canvasEl.getContext("2d");
  const board = new Board(ctx, 400, 200);
});
