var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs')
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
console.log('server activation');
grassArr = [];
grassEaterArr = [];
predatorArr = [];
hunterArr = [];
UFO_arr = [];
matrix = [];
for (let a = 0; a < 50; a++) {
    matrix[a] = []
    for (let b = 0; b < 50; b++) {
        matrix[a][b] = 0
    }
}
let n = 0;
for (let i = 1; i < 6; i++) {
    let d;
    switch (i) {
        case 1:
            d = 100;
            break;
        case 2:
            d = 70;
            break;
        case 3:
            d = 50;
            break;
        case 4:
            d = 30;
            break;
        case 5:
            d = 1;
            break;
        default:
            break;
    }

    while (n < d) {
        let x = Math.floor(Math.random() * 50);
        let y = Math.floor(Math.random() * 50);
        if (matrix[y][x] == 0) {
            matrix[y][x] = i;
            n++;
        }

    }
    n = 0;
}
exanakner = ["Ձմեռ", "Գարուն", "Ամառ", "Աշուն"];
exanak = "Ձմեռ";
var Grass = require('./classGrass');
var GrassEater = require('./classGrassEater');
var Predator = require('./classPredator');
var Hunter = require('./classHunter');
var UFO = require('./classUFO');
function start() {
    io.sockets.emit('matrix', matrix);
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            switch (matrix[y][x]) {
                case 1:
                    let grass = new Grass(x, y);
                    grassArr.push(grass);
                    break;
                case 2:
                    let grassEater = new GrassEater(x, y);
                    grassEaterArr.push(grassEater);
                    break;
                case 3:
                    let predator = new Predator(x, y);
                    predatorArr.push(predator);
                    break;
                case 4:
                    let hunter = new Hunter(x, y);
                    hunterArr.push(hunter);
                    break;
                case 5:
                    let ufo = new UFO(x, y);
                    UFO_arr.push(ufo);
                    break;
                default:
                    break;
            }
        }
    }
}
start()
setInterval(game, 1000)
statistika = {};
time = 0
obj = {
    'm': matrix,
    's': exanak
}
function game() {
    time++
    if (time <= 30) {
        obj.s = "Գարուն";
    }
    else if (time <= 60) {
        obj.s = "Ամառ";
    }
    else if (time <= 90) {
        obj.s = "Աշուն";
    }
    else if (time <= 120) {
        obj.s = "Ձմեռ";
    }
    else {
        time = 0
    }
    for (let i in grassArr) {
        grassArr[i].mul();
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (let i in predatorArr) {
        predatorArr[i].eat();
    }
    for (let i in hunterArr) {
        hunterArr[i].eat()
    }
    for (let i in UFO_arr) {
        UFO_arr[i].eat()
    }
    refresh()
    io.sockets.emit('obj', obj);

    statistika.xot = grassArr.length;
    statistika.xotaker = grassEaterArr.length;
    statistika.gishatich = predatorArr.length;
    statistika.vorsord = hunterArr.length;
    statistika.ajlmolorakain = UFO_arr.length;
    fs.writeFile("statistics.JSON", JSON.stringify(statistika))
}
function refresh() {
    if (grassEaterArr.length == 0) {
        while (n < 70) {
            let x = Math.floor(Math.random() * 50);
            let y = Math.floor(Math.random() * 50);
            if (matrix[y][x] == 0) {
                matrix[y][x] = 2;
                n++
                let grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            }
        }
        n = 0
    }
    if (predatorArr.length == 0) {
        while (n < 50) {
            let x = Math.floor(Math.random() * 50);
            let y = Math.floor(Math.random() * 50);
            if (matrix[y][x] == 0) {
                matrix[y][x] = 3;
                n++
                let predator = new Predator(x, y);
                predatorArr.push(predator);
            }
        }
        n = 0
    }
    if (hunterArr.length == 0) {
        while (n < 30) {
            let x = Math.floor(Math.random() * 50);
            let y = Math.floor(Math.random() * 50);
            if (matrix[y][x] == 0) {
                matrix[y][x] = 4;
                n++
                let hunter = new Hunter(x, y);
                hunterArr.push(hunter);
            }
        }
        n = 0
    }
    if (UFO_arr.length == 0) {
        while (n < 1) {
            let x = Math.floor(Math.random() * 50);
            let y = Math.floor(Math.random() * 50);
            if (matrix[y][x] == 0) {
                matrix[y][x] = 5;
                n++
                let ufo = new UFO(x, y);
                UFO_arr.push(ufo);
            }
        }
        n = 0
    }
    if (grassArr.length == 0) {
        while (n < 100) {
            let x = Math.floor(Math.random() * 50);
            let y = Math.floor(Math.random() * 50);
            if (matrix[y][x] == 0) {
                matrix[y][x] = 1;
                n++
                let grass = new Grass(x, y);
                grassArr.push(grass);
            }
        }
        n = 0
    }
}
io.on('connection', function (socket) {
    console.log('connect')
    socket.on('neracru', function () {
        let r = Math.floor(Math.random() * (6 - 2)) + 2;
        switch (r) {
            case 2:
                for (let i in grassEaterArr) {
                    let x = grassEaterArr[i].x
                    let y = grassEaterArr[i].y
                    matrix[y][x] = 0
                }
                grassEaterArr = []
                break;
            case 3:
                for (let i in predatorArr) {
                    let x = predatorArr[i].x
                    let y = predatorArr[i].y
                    matrix[y][x] = 0
                }
                predatorArr = []
                break;
            case 4:
                for (let i in hunterArr) {
                    let x = hunterArr[i].x
                    let y = hunterArr[i].y
                    matrix[y][x] = 0
                }
                hunterArr = []
                break;
            default:
                break;
        }
    })
    socket.on('andzrev', function () {
        for (let i = 0; i < Math.floor(Math.random() * (25 - 15)) + 15; i++) {
            let x = Math.floor(Math.random() * 50)
            let y = Math.floor(Math.random() * 50)
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
    })
})