const Word = require('./word.js');

class Board{
  constructor(ctx, width, height){
    this.width = width;
    this.height = height;
    this.words = [];
    for (var i = 0; i < 15; i++) {
      let word = new Word(
        `worrrddd${i}`,
        Math.random()*this.width,
        Math.random()*this.height,
        ctx);
      this.words.push(word);
    }
    console.log(this.width);
    let times = 0;
    let ticker = setInterval( () => {
      ctx.clearRect(0,0, 400,400);
      this.updateVelocities();
      this.updatePositions();
      this.renderAll(ctx);
      if (times > 60) {
        clearInterval(ticker);
      }
      console.log(times);
      times++;
    }, 40);
  }

  updateVelocities(){
    const collisions = [];
    this.words.forEach(wordA => {
      this.words.forEach(wordB => {
        if (wordA !== wordB) {
          let collision = wordA.checkCollision(wordB);
          if (collision) {
            collisions.push(collision);
          }
        }
      });
    });
    collisions.forEach(({object, impulse}) => {
      object.vel = impulse;
    });
  }
  updatePositions(){
    this.words.forEach(word => {
      word.move();
    });
  }
  renderAll(ctx){
    this.words.forEach(word => {
      word.render(ctx);
    });
  }
}
module.exports = Board;
