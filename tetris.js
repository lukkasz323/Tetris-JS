'use strict';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d'); 
const blockSize = 32; 
const shape = {
    i: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}],
    o: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
    t: [{x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
    s: [{x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
    z: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}],
    j: [{x: 0, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
    l: [{x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}]
}
const tetromino = {
    blocks: null,
    color: null
};
let abandoned = []
let interval = 100;
let doneMoving = false;

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = tetromino.color;
    for (const i in tetromino.blocks) {
        const x = tetromino.blocks[i].x * blockSize;
        const y = tetromino.blocks[i].y * blockSize;
        context.fillRect(x, y, blockSize, blockSize);
    }
}

function randomShape() {
    return Math.floor(Math.random() * 7);
}

function newTetromino() {
    const random = randomShape()
    switch (random) {
        case 0:
            tetromino.blocks = shape.i;
            tetromino.color = 'cyan';
            break;
        case 1:
            tetromino.blocks = shape.o;
            tetromino.color = 'yellow';
            break;
        case 2:
            tetromino.blocks = shape.t;
            tetromino.color = 'purple';
            break;
        case 3:
            tetromino.blocks = shape.s;
            tetromino.color = 'green';
            break;
        case 4:
            tetromino.blocks = shape.z;
            tetromino.color = 'red';
            break;
        case 5:
            tetromino.blocks = shape.j;
            tetromino.color = 'blue';
            break;
        case 6:
            tetromino.blocks = shape.l;
            tetromino.color = 'orange';
    }
}

function move() {
    function isSpace() {
        let answer;
        for (const i in tetromino.blocks) {
            if (tetromino.blocks[i].y < 19) {
                answer = true;
            }
            else {
                answer = false;
            }
        }
        return answer;
    }

    if (!isSpace()) {
        doneMoving = true;
        
        return;
    }

    for (const i in tetromino.blocks) {
        tetromino.blocks[i].y += 1;
    }
}

function abandonTetromino() {
    abandoned.push(tetromino.blocks)
}

newTetromino();
update();
setInterval(() => {
    console.log(doneMoving);
    update();
    if (!doneMoving) {
        move();
    }
    else {
        doneMoving = false;
        abandonTetromino();
        newTetromino();
        
    }
}, interval);