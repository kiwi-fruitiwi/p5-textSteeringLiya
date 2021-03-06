/**
 * this is the peakDetect example from p5.js, which oddly doesn't seem to
 * work on Nowi.
 */

var cnv, soundFile, fft, peakDetect;
var ellipseWidth = 10;

function preload() {
    soundFile = loadSound('data/popstars.mp3');
}

function setup() {
    background(0);
    noStroke();
    fill(255);
    textAlign(CENTER);

    // p5.PeakDetect requires a p5.FFT
    fft = new p5.FFT();
    peakDetect = new p5.PeakDetect();
}

function draw() {
    background(0);
    text('click to play/pause', width/2, height/2);

    // peakDetect accepts an fft post-analysis
    fft.analyze();
    peakDetect.update(fft);

    peakDetect.onPeak(triggerBeat)
    ellipseWidth *= 0.95;

    ellipse(width/2, height/2, ellipseWidth, ellipseWidth);
}

function triggerBeat() {
    ellipseWidth = 50
}

// toggle play/stop when canvas is clicked
function mouseClicked() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        if (soundFile.isPlaying() ) {
            soundFile.stop();
        } else {
            soundFile.play();
        }
    }
}