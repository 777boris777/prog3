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