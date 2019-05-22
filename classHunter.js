let LiveForm = require("./class");
let Grass = require("./classGrass");
module.exports = class Hunter extends LiveForm {
  constructor(x, y) {
    super(x, y);
  }
  move2() {
    let fundCords = this.chooseCell(0, 1);
    var cord = fundCords[Math.floor(Math.random() * fundCords.length)];
    if (cord) {
      let x = cord[0];
      let y = cord[1];
      matrix[this.y][this.x] = 0;
      matrix[y][x] = 4;
      this.x = x;
      this.y = y;
    }
  }
  move1() {
    let fundCords = this.chooseCell(1, 1);
    var cord = fundCords[Math.floor(Math.random() * fundCords.length)];
    if (cord) {
      let x = cord[0];
      let y = cord[1];
      matrix[this.y][this.x] = 1;
      let grass = new Grass(this.x, this.y);
      grassArr.push(grass);
      matrix[y][x] = 4;
      this.x = x;
      this.y = y;
    }
  }
  mul() {
    let fundCords = this.chooseCell(0, 1);
    var cord = fundCords[Math.floor(Math.random() * fundCords.length)];
    if (cord) {
      let x = cord[0];
      let y = cord[1];
      let hunter = new Hunter(x, y);
      hunterArr.push(hunter);
      matrix[y][x] = 4;
    }
  }
  die() {
    matrix[this.y][this.x] = 0;
    for (let i in hunterArr) {
      if (this.x == hunterArr[i].x && this.y == hunterArr[i].y) {
        hunterArr.splice(i, 1);
      }
    }
  }
  eat(m) {
    let cord;
    for (let k = 1; k <= 10; k++) {
      let fundCords1 = this.chooseCell(2, k);
      let fundCords2 = this.chooseCell(3, k);
      let fundCords = fundCords1.concat(fundCords2);
      cord = fundCords[Math.floor(Math.random() * fundCords.length)];
      if (cord) {
        break;
      }
    }
    if (cord) {
      let x = cord[0];
      let y = cord[1];
      this.energy++;
      this.multiply++;
      if (this.energy >= 20) {
        this.energy = 20;
      }
      if (matrix[y][x] == 2) {
        matrix[y][x] = 0;
        for (let i in grassEaterArr) {
          if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
            grassEaterArr.splice(i, 1);
          }
        }
      } else if (matrix[y][x] == 3) {
        matrix[y][x] = 0;
        for (let i in predatorArr) {
          if (x == predatorArr[i].x && y == predatorArr[i].y) {
            predatorArr.splice(i, 1);
          }
        }
      }
      if (this.multiply >= m) {
        this.mul();
        this.multiply = 0;
      }
    } else {
      this.move1();
      this.move2();
      this.energy--;
      if (this.energy < 0) {
        this.die();
      }
    }
  }
}