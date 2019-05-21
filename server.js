var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
console.log('server activatet');
grassArr = [];
grassEaterArr = [];
predatorArr = [];
hunterArr = [];
UFO_arr = [];
matrix = [];
for (let a = 0; a < 100; a++) {
    matrix[a] = []
    for (let b = 0; b < 100; b++) {
        matrix[a][b] = 0
    }
}
let n = 0;
for (let i = 1; i < 6; i++) {
    let d;
    switch (i) {
        case 1:
            d = 1000;
            break;
        case 2:
            d = 200;
            break;
        case 3:
            d = 300;
            break;
        case 4:
            d = 50;
            break;
        case 5:
            d = 5;
            break;
        default:
            break;
    }

    while (n < d) {
        let x = Math.floor(Math.random() * 100);
        let y = Math.floor(Math.random() * 100);
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
    console.log('connect')
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
setInterval(game, 10)
time = 0
obj = {
    m: matrix,
    s: exanak
}
function game() {
    time++
    if (time <= 30) {
        exanak = exanakner[1]
    }
    else if (time <= 60) {
        exanak = exanakner[2]
    }
    else if (time <= 90) {
        exanak = exanakner[3]
    }
    else if (time <= 120) {
        exanak = exanakner[0]
    }
    else {
        time = 0
    }
    console.log(time)
    console.log(exanak)
    for (let i in grassArr) {
        if (exanak == exanakner[0]) {
            grassArr[i].mul(30);
        }
        else if (exanak == exanakner[1] || exanak == exanakner[2] || exanak == exanakner[3]) {
            grassArr[i].mul(10);
        }

    }
    for (let i in grassEaterArr) {
        if (exanak == exanakner[1] || exanak == exanakner[3]) {
            grassEaterArr[i].eat(10);
        }
        else if (exanak == exanakner[2]) {
            grassEaterArr[i].eat(15);
        }
        else if (exanak == exanakner[0]) {
            grassEaterArr[i].eat(20);
        }
    }
    for (let i in predatorArr) {
        if (exanak == exanakner[1] || exanak == exanakner[3]) {
            predatorArr[i].eat(10);
        }
        else if (exanak == exanakner[2]) {
            predatorArr[i].eat(10);
        }
        else if (exanak == exanakner[0]) {
            predatorArr[i].eat(15);
        }
    }
    for (let i in hunterArr) {
        if (exanak == exanakner[1] || exanak == exanakner[3]) {
            hunterArr[i].eat(15)
        }
        else if (exanak == exanakner[2]) {
            hunterArr[i].eat(10)
        }
        else if (exanak == exanakner[0]) {
            hunterArr[i].eat(30)
        }
    }
    for (let i in UFO_arr) {
        UFO_arr[i].eat()
    }
    refresh()
    io.sockets.emit('obj', obj);
}
function refresh() {
    if (grassEaterArr.length <= 0) {
        while (n < 20) {
            let x = Math.floor(Math.random() * 100);
            let y = Math.floor(Math.random() * 100);
            if (matrix[y][x] == 0) {
                matrix[y][x] = 2;
                n++
                let grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            }
        }
        n = 0
    }
    if (predatorArr.length <= 0) {
        while (n < 20) {
            let x = Math.floor(Math.random() * 100);
            let y = Math.floor(Math.random() * 100);
            if (matrix[y][x] == 0) {
                matrix[y][x] = 3;
                n++
                let predator = new Predator(x, y);
                predatorArr.push(predator);
            }
        }
        n = 0
    }
    if (hunterArr.length <= 0) {
        while (n < 50) {
            let x = Math.floor(Math.random() * 100);
            let y = Math.floor(Math.random() * 100);
            if (matrix[y][x] == 0) {
                matrix[y][x] = 4;
                n++
                let hunter = new Hunter(x, y);
                hunterArr.push(hunter);
            }
        }
        n = 0
    }
    if (UFO_arr.length <= 0) {
        while (n < 5) {
            let x = Math.floor(Math.random() * 100);
            let y = Math.floor(Math.random() * 100);
            if (matrix[y][x] == 0) {
                matrix[y][x] = 5;
                n++
                let ufo = new UFO(x, y);
                UFO_arr.push(ufo);
            }
        }
        n = 0
    }
    if (grassArr.length <= 0) {
        while (n < 1000) {
            let x = Math.floor(Math.random() * 100);
            let y = Math.floor(Math.random() * 100);
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