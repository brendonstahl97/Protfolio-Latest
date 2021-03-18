class Pad {
    constructor(locationVect, r) {
        //radius of pad
        this.r = r;

        // physics info for pad
        // this.pos = locationVect.copy();
        this.pos = createVector(locationVect.x + this.r, locationVect.y + this.r);

        this.velocity = createVector(random(-0.5, .5), random(-1.2, 0));
        this.acceleration = createVector(.1, 0);

        this.maxVel = 1;
        this.forceMultiplier = 0.011;
        this.mouseMultiplier = 1000;
    };

    update() {
        this.velocity.add(this.acceleration);
        if(this.velocity.mag() > this.maxVel) {
            this.velocity = this.velocity.setMag(this.velocity.mag() * .5);
        }
        // this.velocity.limit(this.maxVel);
        this.pos.add(this.velocity);
        this.acceleration.limit(1);
        if (this.isOffScreen()) {
            this.fixOffScreen();
        }
    };

    getForce(forceArray) {
        const x = Math.floor(this.pos.x / current.interval);
        const y = Math.floor(this.pos.y / current.interval);
        const index = x + y * current.cols;
        const force = forceArray[index];
        this.applyForce(force);
    };

    getMouseForce() {
        const mousePos = createVector(mouseX, mouseY);
        const force = mousePos.sub(this.pos).mult(-1);

        const prevAcc = this.acceleration;
        this.applyForce(force, true);
        this.acceleration = prevAcc;
    }

    applyForce(force, isMouse) {
        if (force != null) {
            let newForce;
            if (isMouse) {
                newForce = force.setMag((1 / force.mag()) * this.mouseMultiplier);
            } else {
                newForce = force.setMag(this.forceMultiplier);
            }
            this.acceleration.add(newForce);
        };
    };

    display() {
        image(img, this.pos.x - this.r, this.pos.y - this.r, this.r * 2, this.r * 2);
    };

    run() {
        this.getForce(current.forceVectors);
        this.update();
        this.display();
    };

    isOffScreen() {
        if (this.pos.x < 0 - this.r - spawnOffset || this.pos.x > width + this.r + spawnOffset || this.pos.y < 0 - this.r - spawnOffset || this.pos.y > height + this.r + spawnOffset) {
            return true;
        } else {
            return false;
        }
    }

    findOffScreen() {
        if (this.pos.x < 0 - this.r - spawnOffset) {
            // console.log('l');
            return 'left';
        };
        if (this.pos.x > width + this.r + spawnOffset) {
            // console.log('r');
            return 'right';
        };
        if (this.pos.y < 0 - this.r - spawnOffset) {
            // console.log('t');
            return 'top';
        };
        if (this.pos.y > height + this.r + spawnOffset) {
            // console.log('b');
            return 'bottom';
        };
    };

    fixOffScreen() {
        switch (this.findOffScreen()) {
            case 'left':
                this.pos = createVector(respawns.left, this.pos.y);
                break;

            case 'right':
                this.pos = createVector(respawns.right, this.pos.y);
                break;

            case 'top':
                this.pos = createVector(this.pos.x, respawns.top);
                break;

            case 'bottom':
                this.pos = createVector(this.pos.x, respawns.bottom);
                break;

            default:
                break;
        };
    };
};