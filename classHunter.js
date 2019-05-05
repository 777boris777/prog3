class Hunter {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0
        this.energy = 10;
        this.directions = [];
    }
    newDirections(i) {
        this.directions = [
            [this.x - i, this.y - i],
            [this.x, this.y - i],
            [this.x + i, this.y - i],
            [this.x - i, this.y],
            [this.x + i, this.y],
            [this.x - i, this.y + i],
            [this.x, this.y + i],
            [this.x + i, this.y + i]
        ];
    }
    chooseCell(t, e) {
        this.newDirections(e);
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
    move2() {
        let fundCords = this.chooseCell(0, 1);
        let cord = random(fundCords)
        if (cord) {
            let x = cord[0]
            let y = cord[1]
            matrix[this.y][this.x] = 0
            matrix[y][x] = 4;
            this.x = x;
            this.y = y;
        }
    }
    move1() {
        let fundCords = this.chooseCell(1, 1);
        let cord = random(fundCords)
        if (cord) {
            let x = cord[0]
            let y = cord[1]
            matrix[this.y][this.x] = 1
            let grass = new Grass(this.x, this.y);
            grassArr.push(grass);
            matrix[y][x] = 4;
            this.x = x;
            this.y = y;
        }
    }
    mul() {
        let fundCords = this.chooseCell(0, 1);
        let cord = random(fundCords);
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
    eat() {
        let cord;
        for (let k = 1; k <= 10; k++) {
            let fundCords1 = this.chooseCell(2, k);
            let fundCords2 = this.chooseCell(3, k);
            let fundCords = fundCords1.concat(fundCords2);
            cord = random(fundCords);
            if (cord) {
                break;
            }
        }
        if (cord) {
            let x = cord[0];
            let y = cord[1];
            this.energy++;
            this.multiply++
            if (this.energy >= 20) {
                this.energy = 20
            }
            if (matrix[y][x] == 2) {
                matrix[y][x] = 0
                for (let i in grassEaterArr) {
                    if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                    }
                }
            }
            else if (matrix[y][x] == 3) {
                matrix[y][x] = 0
                for (let i in predatorArr) {
                    if (x == predatorArr[i].x && y == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                    }
                }
            }
            if (this.multiply >= 5) {
                this.mul()
                this.multiply = 0;
            }
        }
        else {
            this.move1();
            this.move2();
            this.energy--;
            if (this.energy < 0) {
                this.die();
            }
        }
    }
}