module.exports = class UFO {
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
        let x = Math.floor(Math.random()*100)
        let y = Math.floor(Math.random()*100)
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