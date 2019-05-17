
let side = 10;

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
}

function draw() {
    
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
    
    // console.log(matrix) 
    // console.log(grassArr)
    // console.log(grassEaterArr)
    // console.log(predatorArr)
    // console.log(hunterArr)
    // console.log(UFO_arr)
}