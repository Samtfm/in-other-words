class Word{
  constructor(text, x, y){
    this.text = text;
    this.posx = x;
    this.posy = y;
    this.velx = 5;
    this.vely = 3;
  }

  render(ctx){
    ctx.font = '10pt sans-serif';
    console.log(ctx.measureText(this.text));
    this.width = ctx.measureText(this.text).width;
    this.height = 10;
    ctx.fillStyle = 'black';

    ctx.fillText(this.text, this.posx - this.width/2, this.posy + this.height/2);
    ctx.fillStyle = 'red';
    ctx.fillRect(this.posx, this.posy, 3, 3);
  }
  move(){
    this.posx += this.velx;
    this.posy += this.vely;
  }
}

module.exports = Word;
