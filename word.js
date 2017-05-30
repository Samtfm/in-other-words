const MIN_SPEED = 0.001;
const FRICTION = 0.3;
const PADDING = 4;
class Word{
  constructor(text, x, y, ctx){
    this.text = text;
    this.pos = {x, y};
    this.vel = {x: Math.random()*10-5, y: Math.random()*10-5};
    ctx.font = '10pt sans-serif';
    this.width = ctx.measureText(this.text).width + PADDING * 2;
    this.height = 10 + PADDING * 2;
    this.active = true;
  }

  render(ctx){
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.fillText(this.text, this.pos.x + PADDING, this.pos.y - PADDING + this.height);
    ctx.fillStyle = 'red';
    ctx.fillRect(this.pos.x + this.width/2, this.pos.y + this.height/2, 3, 3);
  }

  move(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    if (Math.hypot(this.vel.x + this.vel.y) < MIN_SPEED) {
      this.vel.x = 0;
      this.vel.y = 0;
    } else {
      this.vel.x *= 1-FRICTION;
      this.vel.y *= 1-FRICTION;
    }
  }

  moveTo(x, y){
    this.pos.x = x - this.width*0.5;
    this.pos.y = y - this.height*0.5;
  }

  hitTest(x, y){
    return (
      x >= this.pos.x && x <= this.pos.x + this.width &&
      y >= this.pos.y && y <= this.pos.y + this.height
    );
  }

  checkCollision(otherWord){
    // check for box collision
    if (this.pos.x + this.width > otherWord.pos.x &&
    this.pos.x < otherWord.pos.x + otherWord.width &&
    this.pos.y + this.height > otherWord.pos.y &&
    this.pos.y < otherWord.pos.y + otherWord.height){


      const thisRight = this.pos.x + this.width;
      const thisLeft = this.pos.x;
      const otherRight = otherWord.pos.x + otherWord.width;
      const otherLeft = otherWord.pos.x;

      const thisTop = this.pos.y;
      const thisBottom = this.pos.y + this.height;
      const otherTop = otherWord.pos.y;
      const otherBottom = otherWord.pos.y + otherWord.height;

      //calculate overlap in X and Y directions
      let xDiff, yDiff;
      if (this.pos.x + this.width*0.5 < otherWord.pos.x + otherWord.width*0.5) {
        // this word needs to move to the left
        xDiff = otherLeft - thisRight;
      } else {  // this word needs to move to the right
        xDiff = otherRight - thisLeft;
      }
      if (this.pos.y + this.height*0.5 < otherWord.pos.y + otherWord.height*0.5) {
        // this word needs to move up
        yDiff = otherTop - thisBottom;
      } else {  //this word needs to move down
        yDiff = otherBottom - thisTop;
      }

      // generate rough impulse vector that mostly moves over the shorter overlap
      const impulse = {};
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        impulse.x = Math.abs(yDiff) / xDiff;
        impulse.y = yDiff;
      } else {
        impulse.x = xDiff;
        impulse.y = Math.abs(xDiff) / yDiff;
      }
      return {object: this, impulse};
    }
    // const leftCollision = this.x+this.width/2 - (otherWord.pos.x + otherWord.width/2);
  }
}

module.exports = Word;
