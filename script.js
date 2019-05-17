socket = io();
let side = 10;
var socket = io();
function setup() {
    frameRate(5);
    createCanvas(100 * side, 100 * side);
    background('#acacac');
}
function drawMatrix(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            switch (matrix[y][x]) {
                case 0:
                    fill("#acacac");
                    break;
                case 1:
                    fill("green");
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
                    break;
            }
            rect(x * side, y * side, side, side);
        }
    }
}
socket.on('matrix', drawMatrix)
