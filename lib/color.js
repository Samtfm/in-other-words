class Color{
  constructor(r,g,b,a=1){
    this.values = {r,g,b,a};
  }

  toString(){
    const {r,g,b,a} = this.values;
    return `rgba(${r},${g},${b},${a})`;
  }

  mix(other, amount){
    const r = Math.floor(other.values.r*(amount) + this.values.r*(1-amount));
    const g = Math.floor(other.values.g*(amount) + this.values.g*(1-amount));
    const b = Math.floor(other.values.b*(amount) + this.values.b*(1-amount));
    const a = Math.floor((other.values.a*(amount) + this.values.a*(1-amount))*100)*.01;
    return new Color(r,g,b,a);
  }
  equals(other){
    return (
      this.values.r === other.values.r &&
      this.values.g === other.values.g &&
      this.values.b === other.values.b &&
      this.values.a === other.values.a
    );
  }
}


export default Color;
