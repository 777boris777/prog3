module.exports = class LiveForm {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.multiply = 0;
    this.energy = 20;
    this.directions = [];
  }
  newDirections() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1]
    ];
  }
  chooseCell(t) {
    this.newDirections();
    let found = [];
    for (let i in this.directions) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == t) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }
}