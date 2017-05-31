const MIN_SPEED = 0.001;
const FRICTION = 0.3;
const PADDING = 6;
class Word{
  constructor(text, x, y, ctx, vel = {x: 0, y: 0}){
    this.text = text;
    ctx.font = '14pt sans-serif';
    this.width = ctx.measureText(this.text).width + PADDING * 2;
    this.height = 14 + PADDING * 2;

    this.moveTo(x+this.width/2,y);

    this.vel = vel;
    this.active = true;
    this.frozen = false;
  }

  render(ctx, options){
    options = options || {};
    if (options.shadow){
      ctx.shadowColor = 'gray';
      ctx.shadowBlur = 12;
    }
    ctx.fillStyle = options.newWord ? "yellow" : "aliceblue";
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    //reset shadow
    ctx.shadowColor = 'rgba(0,0,0,0)';
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'black';
    ctx.fillText(this.text, this.pos.x + PADDING, this.pos.y - PADDING + this.height);
  }

  move(){
    if (!this.frozen){
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
    }
    if (Math.hypot(this.vel.x + this.vel.y) < MIN_SPEED) {
      this.vel.x = 0;
      this.vel.y = 0;
    } else {
      this.vel.x *= 1-FRICTION;
      this.vel.y *= 1-FRICTION;
    }
  }

  shortFreeze(){
    this.frozen = true;
    setTimeout(() => (this.frozen = false), 500);
  }

  moveTo(x, y){
    if (!this.pos) this.pos = {};
    this.pos.x = x - this.width*0.5;
    this.pos.y = y - this.height*0.5;
    if (this.vel){
      this.vel.x = 0;
      this.vel.y = 0;
    }
  }

  getCenter(){
    return {
      x: this.pos.x + this.width*0.5,
      y: this.pos.y + this.height*0.5
    };
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
      if (Math.abs(xDiff*.3) > Math.abs(yDiff)) {
        impulse.x = .2*Math.abs(yDiff) / xDiff;
        impulse.y = yDiff;
      } else {
        impulse.x = xDiff;
        impulse.y = .2*Math.abs(xDiff) / yDiff;
      }
      return {object: this, impulse};
    }
    // const leftCollision = this.x+this.width/2 - (otherWord.pos.x + otherWord.width/2);
  }
}

module.exports = Word;
