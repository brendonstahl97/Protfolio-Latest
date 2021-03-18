let canvas;
let img;
let current;

const radius = 25;
const spawnOffset = radius;

let pads = [];

let respawns = {};

function preload() {
    img = loadImage('./Assets/img/Pad.png');
};

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style("z-index", "-1");
    canvas.position(0,0);
    canvas.style("position", "fixed");
    background(146, 224, 251);
    noStroke();

    current = new VectorField(windowWidth, windowHeight);
    current.createField();

    for (let i = 0; i < 20; i++) {
        lily = new Pad(createVector(random(0, width), random(0, height)), radius * 2);
        pads.push(lily);
    };


    respawns = {
        left: width + radius + spawnOffset,
        right: 0 - radius - spawnOffset,
        top: height + radius + spawnOffset,
        bottom: 0 - radius - spawnOffset,
    };
};

function draw() {
    background(146, 224, 251);
    current.createField();

    pads.forEach(pad => {
        pad.run();
    });
};

function windowResized() {
    canvas = resizeCanvas(windowWidth, windowHeight);
    respawns = {
        left: windowWidth + this.r,
        right: 0 - this.r,
        top: windowHeight + this.r,
        bottom: 0 - this.r,
    };
};

function mousePressed() {
    pads.forEach(pad => {
        pad.getMouseForce();
    });
};

