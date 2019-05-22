let LiveForm = require("./class");
module.exports = class Grass extends LiveForm {
  constructor(x, y) {
    super(x, y);
  }
  mul(m) {
    this.multiply++;
    if (this.multiply >= m) {
      let fundCords = this.chooseCell(0)
      var cord = fundCords[Math.floor(Math.random()*fundCords.length)];
      if (this.multiply >= 5 && cord) {
        let x = cord[0]
        let y = cord[1]
        let grass = new Grass(x, y);
        grassArr.push(grass);
        matrix[y][x] = 1;
        this.multiply = 0;
      }
    }
  }
}