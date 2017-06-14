const Word = require('./word.js');
import * as API from './api_util';
const WORDS_PER_CLICK = 6;

class Board{
  constructor(canvas){
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.newWords = [];
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
        height: 100
      },
      { //bottom
        pos: {x: -400, y: this.height},
        width: this.width + 800,
        height: 100
      }
    ];
    this.rect = canvas.getBoundingClientRect();
    this.ctx = canvas.getContext("2d");
    this.words = [];
    canvas.onmousemove = this.onMouseMove.bind(this);
    canvas.onmousedown = this.startDrag.bind(this);
    canvas.ondblclick = this.handleDoubleClick.bind(this);
    this.heldWord = null;
    document.addEventListener("mouseup", this.endDrag.bind(this));

    for (var i = 0; i < 0; i++) {
      let word = new Word(
        `worrrddd${i}`,
        Math.random()*this.width,
        Math.random()*this.height,
        this.ctx);
      this.words.push(word);
    }
    let ticker = setInterval( () => {
      this.ctx.clearRect(0,0, this.width,this.height);
      this.updateVelocities();
      this.updatePositions();
      this.renderAll(this.ctx);
    }, 40);
  }

  getCoords(e) {
    let x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    let y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    x -= this.canvas.offsetLeft;
    y -= this.canvas.offsetTop;
    return {x, y};
  }
  startDrag(e){
    this.dragging = false;
    e.preventDefault();
    const {x, y} = this.getCoords(e);
    // const x = e.clientX - this.rect.left;
    // const y = e.clientY - this.rect.top;
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
    this.dragging = true;
    const {x, y} = this.getCoords(e);

    // const x = e.clientX - this.rect.left;
    // const y = e.clientY - this.rect.top;
    if (this.heldWord) {
      this.heldWord.moveTo(x, y);
    }
  }
  endDrag(e){
    if (this.heldWord) {
      this.heldWord.active = true;
      this.heldWord.shortFreeze();
      if (!this.dragging) this.heldWord.touch();
    }
    this.dragging = false;
    this.heldWord = null;
  }

  addWord(text, pos={x:this.width*0.5, y:this.height*0.5}, vel={x:0,y:0}){
    const word = new Word(text, pos.x, pos.y, this.ctx, vel);
    this.words.push(word);
    this.newWords.push(word);
  }

  addWords(wordStrings, wordObj){
    let newWords = wordStrings.filter(wordString => {
      return !(this.words.find(word => word.text === wordString));
    });
    if (wordObj && newWords.length <= WORDS_PER_CLICK){
      wordObj.setExhausted();
    }
    let pos;
    if (wordObj){
      pos = { x: wordObj.pos.x+wordObj.width*.5,
              y: wordObj.pos.y+wordObj.height*.5};
    } else{
      pos = { x: this.width*0.5, y: this.height*0.5 };
    }
    newWords = newWords.slice(0,WORDS_PER_CLICK);
    if (newWords.length > 0){
      this.newWords.forEach(oldWord => {if (oldWord !== wordObj) oldWord.setOld();});
      this.newWords = [];
      newWords.forEach(word =>{
        const angle = Math.random()*Math.PI*2;
        const vel = {x: Math.cos(angle)*20, y: Math.sin(angle)*20};
        this.addWord(word, pos, vel);
      });
    }
  }

  clear(){
    this.words = [];
  }
  clearUntouched(){
    this.words = this.words.filter(word => word.selected);
    this.words.forEach(word => {
      word.resetFilter();
    });
  }
  handleDoubleClick(e){
    const {x, y} = this.getCoords(e);
    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      if (word.hitTest(x, y)){
        word.shortFreeze();
        // word.touch({forceTouch: true});
        const fetchEvent = new CustomEvent('fetchRelatedWords', { 'detail': word });
        document.dispatchEvent(fetchEvent);
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
    // ctx.fillStyle='rgba(0,0,0,.2)';
    this.words.forEach(word => {
      const isNew = this.newWords.includes(word);
      word.render(ctx, {newWord: isNew});
    });
    if (this.heldWord) this.heldWord.render(ctx, {shadow: true});
  }
}
module.exports = Board;
