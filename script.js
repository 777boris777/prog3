let side = 20;
let socket = io();
function setup() {
    noStroke();
    createCanvas(50 * side, 50 * side);
    background('#acacac');
}
function drawMatrix(obj) {
    matrix = obj.m
    exanak = obj.s
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            switch (matrix[y][x]) {
                case 0:
                    fill("#acacac");
                    break;
                case 1:
                    if (exanak == 'Ձմեռ') {
                        fill("floralwhite");
                    }
                    else{
                        fill("green");
                    }
                    break;
                case 2:
                    fill("yellow");
                    break;
                case 3:
                    fill("red");
                    break;
                case 4:
                    fill("chocolate");
                    break;
                case 5:
                    fill("navy");
                    break;
                default:
                    fill('blue')
                    break;
            }
            rect(x * side, y * side, side, side);
        }
    }
}
socket.on('obj', drawMatrix);
function rand() {
    socket.emit('neracru');
    console.log('button1');
}
function and() {
    socket.emit('andzrev');
    console.log('button2')
}
