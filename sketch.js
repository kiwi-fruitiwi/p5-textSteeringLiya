/**
 *  @author Kiwi
 *  @date 2022.02.22
 *
 *  particles of different sizes and colors all over dark grey screen
 *      floating with edges() and random small velocities
 *  audio with neighborhood song? optional remix lol
 *      p5.amp affects velocities or accelerations
 *      🎶 possible FFT visualization on 'top' of everything else
 *  near end of song, shrink back to rainbow points
 *      → seek original text places
 *      → by cody, 2.22, 2💖22 at time=2222
 *      cody and winry's voices saying happy birthday Liya!
 */


let song
let font
let vehicles = []
let points = []

let amp


function preload() {
    font = loadFont('data/bpdots.otf')
    song = loadSound('data/popstars.mp3', null, null)
}


function setup() {
    createCanvas(600, 300)
    colorMode(HSB, 360, 100, 100, 100)
    background(0, 0, 30)

    /**
     *  Add two sets of points: happy birthday, and Liya! centered below.
     *  TODO: gain an additional parameter: size. map to all points?
     */
    points = font.textToPoints('happy birthday, ', 80, 100, 48, {
        sampleFactor: 0.01, // increase for more points
        // simplifyThreshold: 0 // increase to remove collinear points
    })

    points = points.concat(font.textToPoints('Liya!', 200, 175, 72, {
        sampleFactor: 0.06, // increase for more points
    }))


    /** populate vehicles array with their coordinates from textToPoints */
    for (let i = 0; i < points.length; i++) {
        let pt = points[i]
        let vehicle = new Vehicle(pt.x, pt.y)
        vehicles.push(vehicle)
    }

    amp = new p5.Amplitude()
}


function draw() {
    background(0, 0, 30)

    /** display all points and behaviors */
    for (let i = 0; i < vehicles.length; i++) {
        let v = vehicles[i]
        v.behaviors()
        v.update()
        v.show()
    }

    let level = amp.getLevel();
    let size = map(level, 0, 1, 5, 50);

    /* adjust the vehicle's radius */
    const grow = (pt, radius) => {
        pt.r = radius
    }

    for (let v of vehicles) {
        grow(v, size)
    }
}


function keyPressed() {
    /* begin song */
    if (key === 's') {
        song.play()
    }

    /* stop sketch */
    if (key === 'z') {
        noLoop()
        song.stop()
    }
}


/**
 *  Fixes: sound being blocked https://talonendm.github.io/2020-11-16-JStips/
 *  Errors messages (CTRL SHIFT i) Chrome Developer Tools:
 *  The AudioContext was not allowed to start. It must be resumed (or
 *  created)  after a user gesture on the page. https://goo.gl/7K7WLu
 *
 *  Possibly unrelated: maybe we need to add sound.js.map too.
 *  DevTools failed to load SourceMap: Could not load content for
 *  https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/addons/p5.sound.min.js.map
 *  : HTTP error: status code 404, net::ERR_HTTP_RESPONSE_CODE_FAILURE
 */
function touchStarted() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume().then(r => {});
    }
}