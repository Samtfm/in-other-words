const Word = require('./word.js');

class Board{
  constructor(ctx){
    this.words = [new Word('happy', 20, 20)];
    let i = 1;
    setInterval( () => {
      ctx.clearRect(0,0, 400,400);
      this.words.forEach(word => {
        word.move();
        word.render(ctx);
      });
    }, 1000);
  }



  updateVelocities(){
    this.words.forEach(wordA => {
      this.word.forEach(wordB => {
        if (wordA !== wordB) {
          // calculateVel
        }
      });
    });

  }
}
module.exports = Board;
