class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
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
        ]
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
    mul() {
        this.multiply++;
        if (this.multiply >= 5) {
            let emptyCells = this.chooseCell(0)
            let newCell = random(emptyCells);
            if (this.multiply >= 5 && newCell) {
                let x = newCell[0]
                let y = newCell[1]
                let grass = new Grass(x, y);
                grassArr.push(grass);
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }
}
class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0
        this.energy = 10;
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
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }
    mul() {
        let fundCords = this.chooseCell(0);
        let cord = random(fundCords);
        if (cord) {
            let x = cord[0];
            let y = cord[1];
            let grassEater = new GrassEater(x, y, this.index);
            grassEaterArr.push(grassEater);
            matrix[y][x] = 2;
        }
    }
    move() {
        let fundCords = this.chooseCell(0);
        let cord = random(fundCords)
        if (cord) {
            let x = cord[0]
            let y = cord[1]
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0
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
        let cord = random(fundCords)
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
                this.energy = 20
            }
            for (let i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1)
                }
            }
            if (this.multiply >= 5) {
                this.mul()
                this.multiply = 0;
            }
        }
        else {
            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }
}
class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0
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
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }
    mul() {
        let fundCords = this.chooseCell(0);
        let cord = random(fundCords);
        if (cord) {
            let x = cord[0];
            let y = cord[1];
            let predator = new Predator(x, y)
            predatorArr.push(predator)
            matrix[y][x] = 3;
        }
    }
    move() {
        let fundCords = this.chooseCell(0);
        let cord = random(fundCords)
        if (cord) {
            let x = cord[0]
            let y = cord[1]
            matrix[this.y][this.x] = 0
            matrix[y][x] = 3;
            this.x = x;
            this.y = y;
        }
    }
    move1() {
        let fundCords = this.chooseCell(1);
        let cord = random(fundCords)
        if (cord) {
            let x = cord[0]
            let y = cord[1]
            matrix[this.y][this.x] = 1
            let grass = new Grass(this.x, this.y);
            grassArr.push(grass);
            matrix[y][x] = 3;
            this.x = x;
            this.y = y;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
            }
        }
    }
    eat() {
        let fundCords = this.chooseCell(2);
        let cord = random(fundCords)
        if (cord) {
            let x = cord[0];
            let y = cord[1];
            matrix[this.y][this.x] = 0
            matrix[y][x] = 3;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;
            if (this.energy >= 40) {
                this.energy = 40
            }
            for (let i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                }
            }
            if (this.multiply >= 25) {
                this.mul()
                this.multiply = 0;
            }
        }
        else {
            this.move1();
            this.move();
            this.energy--;
            if (this.energy <= 1) {
                this.die();
            }
        }
    }
}
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
class UFO {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 1000
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
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y + 1],
            [this.x + 1, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y + 1]
        ]
    }
    chooseCell(r, t) {
        this.newDirections();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (r <= matrix[y][x] <= t) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }
    move() {
        let x = Math.floor(random(100))
        let y = Math.floor(random(100))
        if (matrix[y][x] < 2) {
            matrix[this.y][this.x] = 0
            matrix[y][x] = 5
            this.x = x
            this.y = y
        }
    }
    die(){
        matrix[this.y][this.x]=0
        for (let i in UFO_arr) {
            if (this.x == UFO_arr[i].x && this.y == UFO_arr[i].y) {
                UFO_arr.splice(i, 1);
            }
        }
    }
    eat() {
        this.move()
        this.energy--
        if (this.energy<0) {
            this.die()
        }
        let fundCords = this.chooseCell(1, 4)
        if (fundCords) {
            for (let i in fundCords) {
                let x = fundCords[i][0]
                let y = fundCords[i][1]
                switch (matrix[y][x]) {
                    case 1:
                        for (let i in grassArr) {
                            if (x == grassArr[i].x && y == grassArr[i].y) {
                                grassArr.splice(i, 1)
                            }
                        }
                        break;
                    case 2:
                        for (let i in grassEaterArr) {
                            if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                                grassEaterArr.splice(i, 1);
                            }
                        }
                        break;
                    case 3:
                        for (let i in predatorArr) {
                            if (x == predatorArr[i].x && y == predatorArr[i].y) {
                                predatorArr.splice(i, 1);
                            }
                        }
                        break;
                    case 4:
                        for (let i in hunterArr) {
                            if (x == hunterArr[i].x && y == hunterArr[i].y) {
                                hunterArr.splice(i, 1);
                            }
                        }
                        break;
                    default:
                        break;
                }
                matrix[y][x] = 0
            }
        }
    }
}