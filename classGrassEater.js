class GrassEater extends LiveForm {
  constructor(x, y) {
    super(x, y);
  }
  move() {
    let fundCords = this.chooseCell(0);
    let cord = random(fundCords);
    if (cord) {
      let x = cord[0];
      let y = cord[1];
      matrix[y][x] = 2;
      matrix[this.y][this.x] = 0;
      this.x = x;
      this.y = y;
    }
  }
  die() {
    matrix[this.y][this.x] = 0;
    for (let i in grassEaterArr) {
      if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
        grassEaterArr.splice(i, 1);
      }
    }
  }
  eat() {
    let fundCords = this.chooseCell(1);
    let cord = random(fundCords);
    if (cord) {
      let x = cord[0];
      let y = cord[1];
      matrix[y][x] = 2;
      matrix[this.y][this.x] = 0;
      this.x = x;
      this.y = y;
      this.multiply++;
      this.energy++;
      if (this.energy >= 20) {
        this.energy = 20;
      }
      for (let i in grassArr) {
        if (x == grassArr[i].x && y == grassArr[i].y) {
          grassArr.splice(i, 1);
        }
      }
      if (this.multiply >= 5) {
        this.mul();
        this.multiply = 0;
      }
    } else {
      this.move();
      this.energy--;
      if (this.energy <= 0) {
        this.die();
      }
    }
  }
}