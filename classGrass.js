class Grass extends LiveForm {
  constructor(x, y) {
    super(x, y);
  }
  mul() {
    this.multiply++;
    if (this.multiply >= 5) {
      let emptyCells = this.chooseCell(0);
      let newCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];
      if (this.multiply >= 5 && newCell) {
        let x = newCell[0];
        let y = newCell[1];
        let grass = new Grass(x, y);
        grassArr.push(grass);
        matrix[y][x] = 1;
        this.multiply = 0;
      }
    }
  }
}