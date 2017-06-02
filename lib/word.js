const MIN_SPEED = 0.001;
const FRICTION = 0.3;
const PADDING = 8;

import Color from './color';

const YELLOW = new Color(240,240,140);
const TRANSPARENT = new Color(128,128,128,0);
const BRIGHT_YELLOW = new Color(256,256,210,.3);
const YELLOW_FILTER = new Color(80,256,0,.5);
// const GRAY_FILTER = new Color(0,0,0,.4);
const GRAY_FILTER = new Color(128,128,128,.7);


const WHITE = new Color(230,230,230);
console.log(YELLOW.toString());
const GREEN = new Color(100, 256, 100);

class Word{
  constructor(text, x, y, ctx, vel = {x: 0, y: 0}){
    this.filterColor = TRANSPARENT;
    this.text = text;
    this.ctx = ctx;
    ctx.font = 'bold 22pt Cormorant Garamond, sans-serif';
    this.width = ctx.measureText(this.text).width + PADDING * 2;
    this.height = 22 + PADDING * 2;
    this.padding = PADDING;

    this.moveTo(x+this.width/2,y);

    this.vel = vel;
    this.active = true;
    this.frozen = false;
    this.color = WHITE;
    this.setColor(GREEN, .1);
    // this.baseColor = WHITE;
    var i = 0;
    // this.fade = setInterval(()=>{
    //   if (i > 1) clearInterval(this.fade);
    //   this.color = GREEN.mix(this.baseColor, i);
    //   i += .01;
    // }, 40);
  }

  setPadding(pixels){
    this.padding = pixels;
    this.height = 22 + pixels * 2;
    this.width = this.ctx.measureText(this.text).width + this.padding * 2;
  }

  setColor(color, factor = .4){
    if (this.fade) clearInterval(this.fade);
    let i = 0;
    const oldColor = this.color;
    this.fade = setInterval(()=>{
      if (i >= .95) clearInterval(this.fade);
      this.color = oldColor.mix(color, i);
      i += (1-i)*factor;
    }, 40);
  }
  setFilter(color, factor = .4){
    if (this.filterFade) clearInterval(this.filterFade);
    let i = 0;
    const oldColor = this.filterColor;
    console.log(typeof this.filterColor);
    this.filterFade = setInterval(()=>{
      if (i >= .95) clearInterval(this.filterFade);

      this.filterColor = oldColor.mix(color, i);
      i += (1-i)*factor;
      console.log(typeof this.filterColor);

    }, 40);
  }
  setOld(){
    this.setColor(WHITE, .1);
  }
  setHappy(){
    this.setFilter(YELLOW_FILTER);
  }

  render(ctx, options){
    options = options || {};
    if (options.shadow){
      ctx.shadowColor = 'gray';
      ctx.shadowBlur = 12;
    }
    ctx.fillStyle = 'black';
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    // ctx.fillStyle = options.newWord ? "yellow" : "aliceblue";
    ctx.fillStyle = this.color.toString();

    ctx.fillRect(this.pos.x+2, this.pos.y+2, this.width-4, this.height-4);
    //reset shadow
    ctx.shadowColor = 'rgba(0,0,0,0)';
    ctx.shadowBlur = 0;

    // if (this.exhausted) {
    //   ctx.fillStyle = 'rgba(50,50,0,.4)';
    //   ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    // }


    ctx.fillStyle = 'black';
    ctx.fillText(this.text, this.pos.x + this.padding, this.pos.y - (this.padding+2) + this.height);

    // ctx.fillStyle = this.filterColor.toString();
    // ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);


    var gradient = ctx.createLinearGradient(0, this.pos.y, 0, this.pos.y+this.height);
    gradient.addColorStop(0, TRANSPARENT.toString());
    try{

      gradient.addColorStop(.9, this.filterColor.toString());
      gradient.addColorStop(1, TRANSPARENT.toString());

    }catch(e){
      console.log(typeof this.filterColor);

      console.log(this.filterColor.toString());
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);

  }

  setExhausted(){
    this.setFilter(GRAY_FILTER);
    // this.baseColor = new Color(230,230,230);
    // this.color = this.baseColor;
  }
  resetFilter(){
    this.setFilter(TRANSPARENT);
  }

  startInflation(){
    this.inflation = setInterval(() => {
      if (this.padding < 12){
        this.padding += .3;
      }
      // this.padding += (14 - this.padding)*0.2;
      // const newPadding = this.padding +
      this.setPadding(this.padding);
    }, 40);
  }
  resetSize(){
    if (this.inflation) {
      clearInterval(this.inflation);
    }
    this.setPadding(PADDING);
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

  touch(options = {}){
    if (options.forceUntouch) this.selected = true;
    if (options.forceTouch) this.selected = false;

    if (this.selected) {
      this.setColor(WHITE);
      this.selected = false;
    } else {
      this.setColor(YELLOW);
      this.selected = true;
    }
    // this.baseColor = YELLOW;
    // this.color = this.baseColor;
    // if (this.fade) clearInterval(this.fade);
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
        impulse.x = .01*Math.abs(yDiff) / xDiff;
        impulse.y = yDiff;
      } else {
        impulse.x = xDiff;
        impulse.y = .01*Math.abs(xDiff) / yDiff;
      }
      return {object: this, impulse};
    }
    // const leftCollision = this.x+this.width/2 - (otherWord.pos.x + otherWord.width/2);
  }
}

module.exports = Word;
