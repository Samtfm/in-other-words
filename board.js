const Word = require('./word.js');

class Board{
  constructor(canvas){
    this.width = canvas.width;
    this.height = canvas.height;
    this.walls = [
      { //left
        pos: {x: -100, y: -400},
        width: 100,
        height: this.height + 800
      },
      { //right
        pos: {x: this.width, y: -400},
        width: 100,
        height: this.height + 800
      },
      { //top
        pos: {x: -400, y: -100},
        width: this.width + 800,
        height: -100
      },
      { //bottom
        pos: {x: -400, y: this.height},
        width: this.width + 800,
        height: 100
      }
    ];
    this.ctx = canvas.getContext("2d");
    this.words = [];
    this.rect = canvas.getBoundingClientRect();
    canvas.onmousemove = this.onMouseMove.bind(this);
    canvas.onmousedown = this.startDrag.bind(this);
    canvas.ondblclick = this.handleDoubleClick.bind(this);
    this.heldWord = null;
    document.addEventListener("mouseup", this.endDrag.bind(this));

    for (var i = 0; i < 20; i++) {
      let word = new Word(
        `worrrddd${i}`,
        Math.random()*this.width,
        Math.random()*this.height,
        this.ctx);
      this.words.push(word);
    }
    let times = 0;
    let ticker = setInterval( () => {
      this.ctx.clearRect(0,0, this.width,this.height);
      this.updateVelocities();
      this.updatePositions();
      this.renderAll(this.ctx);
      if (times > 600) {
        clearInterval(ticker);
        this.ctx.fillText('TIMEOUT', 100,50);
      }
      times++;
    }, 40);
  }

  startDrag(e){
    e.preventDefault();
    const x = e.clientX - this.rect.left;
    const y = e.clientY - this.rect.top;
    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      if (word.hitTest(x, y)){
        this.heldWord = word;
        this.heldWord.active = false;
        break;
      }
    }
  }
  onMouseMove(e){
    const x = e.clientX - this.rect.left;
    const y = e.clientY - this.rect.top;
    if (this.heldWord) {
      this.heldWord.moveTo(x, y);
    }
  }
  endDrag(e){
    if (this.heldWord) {
      this.heldWord.active = true;
      this.heldWord.shortFreeze();
    }
    this.heldWord = null;
  }
  handleDoubleClick(e){
    const x = e.clientX - this.rect.left;
    const y = e.clientY - this.rect.top;
    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      if (word.hitTest(x, y)){
        word.shortFreeze();
        // for (var i = 0; i < 5; i++) {
        //   this.vel = {x: Math.random()*4-2), y: Math.random()*4-2)}
        // }
        this.words.push(new Word("I'm related!", word.pos.x, word.pos.y, this.ctx));
        this.words.push(new Word("I'm related!", word.pos.x, word.pos.y, this.ctx));
        this.words.push(new Word("I'm related!", word.pos.x, word.pos.y, this.ctx));
        this.words.push(new Word("I'm related!", word.pos.x, word.pos.y, this.ctx));

        break;
      }
    }
  }

  updateVelocities(){
    const collisions = [];
    this.words.forEach(wordA => {
      this.words.forEach(wordB => {
        if (wordA !== wordB && wordA.active && wordB.active) {
          let collision = wordA.checkCollision(wordB);
          if (collision) {
            collisions.push(collision);
          }
        }
      });
      this.walls.forEach(wall => {
        let collision = wordA.checkCollision(wall);
        if (collision) {
          collisions.push(collision);
        }
      });

    });
    collisions.forEach(({object, impulse}) => {
      object.vel.x += Math.sign(impulse.x)*.3;
      object.vel.y +=  Math.sign(impulse.y)*.1;
      if (!object.frozen){
        object.pos.x += impulse.x/5;
        object.pos.y += impulse.y/5;
      }
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
    if (this.heldWord) this.heldWord.render(ctx, {shadow: true});
  }
}
module.exports = Board;
