const MIN_SPEED = 0.01;
const FRICTION = 0.01;
class Word{
  constructor(text, x, y, ctx){
    this.text = text;
    this.pos = {x, y};
    this.vel = {x: Math.random()*10-5, y: Math.random()*10-5};
    ctx.font = '10pt sans-serif';
    this.width = ctx.measureText(this.text).width;
    this.height = 10;
  }

  render(ctx){
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(this.pos.x, this.pos.y, this.width, -this.height);
    ctx.fillStyle = 'black';
    ctx.fillText(this.text, this.pos.x, this.pos.y);
    ctx.fillStyle = 'red';
    ctx.fillRect(this.pos.x + this.width/2, this.pos.y - this.height/2, 3, 3);
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

  checkCollision(otherWord){
    if (this.pos.x + this.width > otherWord.pos.x &&
    this.pos.x < otherWord.pos.x + otherWord.width &&
    this.pos.y + this.height > otherWord.pos.y &&
    this.pos.y < otherWord.pos.y + otherWord.height){
      console.log(this.vel);
      // const impulse = {};
      // if (this.pos.x + this.width*0.5 < otherWord.pos.x + otherWord.width*0.5) {
      //   this.impulse.x =
      // } else {
      //
      // }
      // const impulse = {
      //   x: this.pos.x + this.width*0.5 - (otherWord.pos.x + otherWord.width*0.5),
      //   y: this.pos.y + this.width*0.5 - (otherWord.pos.y + otherWord.width*0.5),
      // };
      return {object: this, impulse: {x: otherWord.vel.x, y: otherWord.vel.y}};
    }
    // const leftCollision = this.x+this.width/2 - (otherWord.pos.x + otherWord.width/2);
  }
}

module.exports = Word;
