const MIN_SPEED = 0.01;
const FRICTION = 0.3;
class Word{
  constructor(text, x, y){
    this.text = text;
    this.pos = {x, y};
    this.vel = {x: 10, y: 6};
  }

  render(ctx){
    ctx.font = '10pt sans-serif';
    this.width = ctx.measureText(this.text).width;
    this.height = 10;
    ctx.fillStyle = 'black';

    ctx.fillText(this.text, this.pos.x - this.width/2, this.pos.y + this.height/2);
    ctx.fillStyle = 'red';
    ctx.fillRect(this.pos.x, this.pos.y, 3, 3);
  }
  move(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    if (Math.hypot(this.vel.x + this.vel.y) < MIN_SPEED) {
      this.vel.x = 0;
      this.vel.y = 0;
    } else {
      this.vel.x *= FRICTION;
      this.vel.y *= FRICTION;
    }
    console.log(this.vel);
  }
}

module.exports = Word;
