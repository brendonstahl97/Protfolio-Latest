class VectorField {
    constructor(windowWidth, windowHeight) {
        this.interval = 50;
        this.cols = Math.floor(windowWidth/this.interval);
        this.rows = Math.floor(windowHeight/this.interval);  

        this.step = 0.1;
        this.zOffset = 0;
        this.forceVectors = [];
    }


    createField() {
        var xOffset = 0;

        for (let x = 0; x < this.cols; x++) {

            var yOffset = 0;

            for (let y = 0; y < this.rows; y++) {

                var index = x + y * this.cols;
                var angle = noise(xOffset, yOffset, this.zOffset) * (TWO_PI * 4);
                var v = p5.Vector.fromAngle(angle);
                v.setMag(.01);

                this.forceVectors[index] = v;
                yOffset += this.step;

                
                // This section of code displays the vector field on the canvas
                
                // push();
                // translate(x * this.interval, y * this.interval);
                // rotate(v.heading());
                // stroke(0);
                // line(0, 0, this.interval, 0);
                // pop();

            }
            xOffset += this.step;
            this.zOffset += .0001;
        }
    }
}