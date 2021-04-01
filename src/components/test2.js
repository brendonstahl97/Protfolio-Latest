import React, { useEffect } from 'react';
import p5 from 'p5';

//image of lily pad
// import img from '../../public/Assets/img/Pad.png';


const Test2 = (props) => {
    let myRef = React.createRef();
    const Sketch = (p5) => {

        //Variables for Sketch
        let canvas;
        let current;
        let img;

        let showField = false;

        const radius = 25;
        const spawnOffset = radius;

        const numPads = 50;

        let prevScroll;

        let pads = [];

        let respawns = {};

        // function to check if user has scrolled down this frame
        const didScrollDown = () => {
            if (window.scrollY - prevScroll > 0) {
                return true;
            };
            return false;
        };

        // Funnction to determine the vector of the scroll force
        const scrollForce = () => {
            pads.forEach(pad => {
                let force;
                if (pad.pos.x >= p5.width / 2) {
                    force = p5.createVector(1, 1.5);
                } else {

                    force = p5.createVector(-1, 1.5);
                }
                pad.applyForce(force, true);
            });
        };

        p5.preload = () => {
            if(props.img) {
                img = p5.loadImage(props.img);
            }
        };

        p5.setup = () => {
            canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
            canvas.style("position", "fixed");
            canvas.style("z-index", -1);
            canvas.style("top", "0");
            canvas.style("left", "0");
            p5.background('#92e0fb');
            p5.noStroke();

            current = new VectorField(p5.windowWidth, p5.windowHeight, p5);
            current.createField();

            for (let i = 0; i < numPads; i++) {
                const lily = new Pad(p5.createVector(p5.random(0, p5.width), p5.random(0, p5.height)), radius * 2, p5);
                pads.push(lily);
            };

            respawns = {
                left: p5.width + radius + spawnOffset,
                right: 0 - radius - spawnOffset,
                top: p5.height + radius + spawnOffset,
                bottom: 0 - radius - spawnOffset,
            };
        };

        p5.draw = () => {

            p5.background('#92e0fb');
            current.createField();

            pads.forEach(pad => {
                pad.run();
            });

            if (didScrollDown()) {
                scrollForce();
            };

            if (prevScroll !== window.scrollY) {
                prevScroll = window.scrollY;
            };
        };

        // Code runs when the window is resized
        p5.windowResized = (p5) => {
            canvas = p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
            // scrollForcePos = p5.createVector(p5.width/2, 0);
            respawns = {
                left: p5.width + radius + spawnOffset,
                right: 0 - radius - spawnOffset,
                top: p5.height + radius + spawnOffset,
                bottom: 0 - radius - spawnOffset
            };

            // location.reload();
        };

        //Classes

        class Pad {
            constructor(locationVect, r) {
                //radius of pad
                this.r = r;

                // physics info for pad
                this.pos = p5.createVector(locationVect.x + this.r, locationVect.y + this.r);
                this.velocity = p5.createVector(p5.random(-0.5, .5), p5.random(-1.2, 0));
                this.acceleration = p5.createVector(0, 0);

                this.maxVel = 1;
                this.forceMultiplier = 0.005;
                this.scrollMultiplier = p5.random(1.5, 3);
            };

            update() {
                this.velocity.add(this.acceleration);
                if (this.velocity.mag() > this.maxVel) {
                    this.velocity = this.velocity.setMag(this.velocity.mag() * .5);
                }
                // this.velocity.limit(this.maxVel);
                this.pos.add(this.velocity);
                this.acceleration.limit(1);
                if (this.isOffScreen()) {
                    this.fixOffScreen();
                };
            };

            getForce(forceArray) {
                const x = Math.floor(this.pos.x / current.interval);
                const y = Math.floor(this.pos.y / current.interval);
                const index = x + y * current.cols;
                const force = forceArray[index];
                this.applyForce(force, false);
            };

            applyForce(force, isScrollForce) {
                if (force != null) {
                    let newForce;
                    if (isScrollForce) {
                        newForce = force.setMag(this.scrollMultiplier);
                    } else {
                        newForce = force.setMag(this.forceMultiplier);
                    }
                    this.acceleration.add(newForce);
                };
            };

            display() {
                p5.image(img , this.pos.x - this.r, this.pos.y - this.r, this.r * 2, this.r * 2);
            };

            run() {
                this.getForce(current.forceVectors);
                this.update();
                this.display();
            };

            isOffScreen() {
                if (this.pos.x < 0 - this.r - spawnOffset || this.pos.x > p5.width + this.r + spawnOffset || this.pos.y < 0 - this.r - spawnOffset || this.pos.y > p5.height + this.r + spawnOffset) {
                    return true;
                } else {
                    return false;
                };
            };

            findOffScreen() {
                if (this.pos.x < 0 - this.r - spawnOffset) {
                    // console.log('l');
                    return 'left';
                };
                if (this.pos.x > p5.width + this.r + spawnOffset) {
                    // console.log('r');
                    return 'right';
                };
                if (this.pos.y < 0 - this.r - spawnOffset) {
                    // console.log('t');
                    return 'top';
                };
                if (this.pos.y > p5.height + this.r + spawnOffset) {
                    // console.log('b');
                    return 'bottom';
                };
            };

            fixOffScreen() {
                switch (this.findOffScreen()) {
                    case 'left':
                        this.pos = p5.createVector(respawns.left, this.pos.y);
                        break;

                    case 'right':
                        this.pos = p5.createVector(respawns.right, this.pos.y);
                        break;

                    case 'top':
                        this.pos = p5.createVector(this.pos.x, respawns.top);
                        break;

                    case 'bottom':
                        this.pos = p5.createVector(this.pos.x, respawns.bottom);
                        break;

                    default:
                        break;
                };
            };
        };


        class VectorField {
            constructor(windowWidth, windowHeight) {
                this.interval = 50;
                this.cols = Math.floor(windowWidth / this.interval);
                this.rows = Math.floor(windowHeight / this.interval);

                this.step = 0.01;
                this.zOffset = 0;
                this.forceVectors = [];
            };


            createField() {
                let xOffset = 0;

                for (let x = 0; x < this.cols; x++) {

                    let yOffset = 0;

                    for (let y = 0; y < this.rows; y++) {

                        const index = x + y * this.cols;
                        const angle = p5.noise(xOffset, yOffset, this.zOffset) * (p5.TWO_PI * 4);
                        const v = p5.createVector(p5.cos(angle), p5.sin(angle), 0);
                        v.setMag(.01);

                        this.forceVectors[index] = v;
                        yOffset += this.step;

                        p5.stroke(0, 50);

                        // This section of code displays the vector field on the canvas

                        if(showField) {
                            p5.push();
                            p5.translate(x * this.interval, y * this.interval);
                            p5.rotate(v.heading());
                            p5.line(0, 0, this.interval, 0);
                            p5.pop();
                        }

                    };
                    xOffset += this.step;
                    this.zOffset += .0001;
                };
            };
        };
    };

    useEffect(() => {
        let myP5 = new p5(Sketch, myRef.current)
    }, []);

    return (
        <div ref={myRef}>

        </div>
    );
};



export default Test2;