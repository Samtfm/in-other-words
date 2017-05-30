const Word = require('./word.js');

class Board{
  constructor(ctx, width, height){
    this.width = width;
    this.height = height;
    this.words = [new Word('happy', 20, 20)];
    for (var i = 0; i < 10; i++) {
      this.words.push(new Word(`worrrddd${i}`,
         Math.random()*this.width,
         Math.random()*this.height));
    }
    console.log(this.width);
    let times = 0;
    let ticker = setInterval( () => {
      ctx.clearRect(0,0, 400,400);
      this.updateVelocities();
      this.updatePositions();
      this.renderAll(ctx);
      if (times > 20) {
        clearInterval(ticker);
      }
      console.log(times);
      times++;
    }, 40);
  }

  updateVelocities(){
    this.words.forEach(wordA => {
      this.words.forEach(wordB => {
        if (wordA !== wordB) {
          // resolveCollision
        }
      });
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
