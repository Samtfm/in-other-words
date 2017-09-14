const MIN_SPEED = 0.001;
const FRICTION = 0.3;
const PADDING = 8;

import Color from './color';

const YELLOW = new Color(240,240,140);
const TRANSPARENT = new Color(128,128,128,0);
// const BRIGHT_YELLOW = new Color(256,256,210,.3);
// const YELLOW_FILTER = new Color(80,256,0,1);
// const GRAY_FILTER = new Color(0,0,0,.4);
const GRAY_FILTER = new Color(50,50,50,.25);


const WHITE = new Color(246,246,246);
const GREEN = new Color(100, 256, 100);

class Word{
  constructor(text, x, y, ctx, vel = {x: 0, y: 0}){
    this.filterColor = TRANSPARENT;
    this.text = text;
    this.ctx = ctx;
    ctx.font = 'bold 22pt Cormorant Garamond, sans-serif';
    this.width = ctx.measureText(this.text).width + PADDING * 2;
    this.height = 28 + PADDING * 2;
    this.padding = PADDING;
    this.selected = false;
    this.moveTo(x-this.width*0.1,y-this.height*0.5);

    this.vel = vel;
    this.active = true;
    this.frozen = false;
    this.color = TRANSPARENT;
    this.setColor(GREEN, .2, () => {
      this.setColorLinear(this.selected ? YELLOW : WHITE, .01);
    });

    var i = 0;
  }

  setPadding(pixels){
    this.padding = pixels;
    this.height = 28 + pixels * 2;
    this.width = this.ctx.measureText(this.text).width + this.padding * 2;
  }

  setColor(color, factor = .4, callback){
    if (this.fade) clearInterval(this.fade);
    let i = 0;
    const oldColor = this.color;
    this.fade = setInterval(()=>{
      if (i >= .95) {
        clearInterval(this.fade);
        if (callback) callback();
      }
      this.color = oldColor.mix(color, i);
      i += (1-i)*factor;
    }, 40);
  }
  setColorLinear(color, increment = .05){
    if (this.fade) clearInterval(this.fade);
    let i = 0;
    const oldColor = this.color;
    this.fade = setInterval(()=>{
      if (i >= 1) {
        clearInterval(this.fade);
        i = 1;
      }
      this.color = oldColor.mix(color, i);
      i += increment;
    }, 40);
  }
  setFilter(color, factor = .4){
    if (this.filterFade) clearInterval(this.filterFade);
    let i = 0;
    const oldColor = this.filterColor;
    this.filterFade = setInterval(()=>{
      if (i >= .95) clearInterval(this.filterFade);

      this.filterColor = oldColor.mix(color, i);
      i += (1-i)*factor;

    }, 40);
  }
  setOld(){
    if (!this.selected) {
      this.setColor(WHITE, .1);
    }
  }

  render(ctx, options){
    this.setPadding(PADDING);
    options = options || {};
    ctx.shadowColor = '#444';
    if (options.shadow){
      ctx.shadowBlur = 22;
    } else {
      ctx.shadowBlur = 7;
    }
    ctx.fillStyle = this.color.toString();

    //main color
    ctx.fillRect(this.pos.x+2, this.pos.y+2, this.width-4, this.height-4);

    //reset shadow
    ctx.shadowColor = 'rgba(0,0,0,0)';
    ctx.shadowBlur = 0;

    //write text
    ctx.fillStyle = 'black';
    ctx.fillText(this.text, this.pos.x + this.padding, this.pos.y - (this.padding+4) + this.height);

    //exhausted word filter;
    ctx.fillStyle = this.filterColor;
    ctx.fillRect(this.pos.x+2, this.pos.y+2, this.width-4, this.height-4);
  }

  setExhausted(){
    this.setFilter(TRANSPARENT, .8);

    setTimeout(()=>{
      this.setFilter(GRAY_FILTER, .2);

    },500);
    this.happy = false;
  }
  resetFilter(){
    this.setFilter(TRANSPARENT);
    this.happy = false;
  }

  startInflation(){
    const x = this.pos.x;
    const y = this.pos.y;
    this.inflation = setInterval(() => {
      this.vel.x = (Math.random() > .5) ? (2*Math.random()+2) : (-2*Math.random()+2);
      this.vel.y = (Math.random() > .5) ? (2*Math.random()+2) : (-2*Math.random()+2);
      this.pos.y += (y - this.pos.y)/2;

      this.pos.x += (x - this.pos.x)/2;
      // this.vel.x -= x;
      // this.vel.y += 5*(Math.random()-.5);
      // if (this.padding < 12){
      //   this.padding += .3;
      // }
      // this.setPadding(this.padding);
    }, 40);
  }
  resetSize(){
    if (this.inflation) {
      clearInterval(this.inflation);
      this.shortFreeze(350);
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

  shortFreeze(time = 500){
    this.frozen = true;
    setTimeout(() => (this.frozen = false), time);
  }

  touch(options = {}){
    // if (options.forceUntouch) this.selected = true;
    // if (options.forceTouch) this.selected = false;
    if (this.selected) {
      this.setColor(WHITE);
      this.selected = false;
    } else {
      this.setColor(YELLOW);
      this.selected = true;
    }
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

      //define variables for determining overlap
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
