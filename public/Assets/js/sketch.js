let canvas;
let img;
let current;

let scrollForcePos;

const radius = 25;
const spawnOffset = radius;

let prevScroll;

let pads = [];

let respawns = {};

function preload() {
    img = loadImage('Pad.png');
};

function setup() {
    canvas = createCanvas(windowWidth, windowHeight + 300);
    // canvas.style("z-index", "1");
    // canvas.style('display', 'block');
    canvas.position(0,0);
    background(0, 100, 200);
    noStroke();

    scrollForcePos = createVector(width/2, 0);

    current = new VectorField(windowWidth, windowHeight);
    current.createField();

    for (let i = 0; i < 50; i++) {
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
    background(0, 100, 200);
    current.createField();

    pads.forEach(pad => {
        pad.run();
    });

    if (didScrollDown()) {
        scrollForce();
    };

    if (prevScroll != window.scrollY) {
        prevScroll = window.scrollY;
    }
};


// TODO fix resize respawn error/
function windowResized() {
    canvas = resizeCanvas(windowWidth, windowHeight);
    scrollForcePos = createVector(width/2, 0);
    respawns = {
        left: width + this.r,
        right: 0 - this.r,
        top: height + this.r,
        bottom: 0 - this.r,
    };

    // location.reload();
};

const didScrollDown = () => {
    if (window.scrollY - prevScroll > 0) {
        return true;
    };
    return false;
};

const scrollForce = () => {
    pads.forEach(pad => {
        let force;
        if(pad.pos.x >= width/2) {
            force = createVector(1, 1.5);
        } else {

            force = createVector(-1, 1.5);
        }
        pad.applyForce(force, true);
    });
};

