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
 *
 *  Liya can't read. so maybe we should have "2" instead of hb o.O
 *  can we figure out how to make her shirt programmatically?
 *
 *  cut theme song to original length
 *  beat map into array of millisecond values
 *      when we exceed one, adjust dot size and move to next
 *      🌟 text conversion from one set of words to another
 *      explosion by setting home point with random
 *      generate new random points mid-animation → arrive at new word
 *          "happy twosday!"
 *          "and birthday!"
 *          "second binary digit!"
 *          "Liya!" +heart with manual points, floating two balloons
 * [optional] gravitation on click
 */


let song
let font
let vehicles = []
let points = []

let amp
let arrival // flag for whether 'going home' is turned on


function preload() {
    font = loadFont('data/bpdots.otf')
    // font = loadFont('data/consola.ttf')
    song = loadSound('data/danielTiger.mp3', null, null)
}


function setup() {
    createCanvas(600, 300)
    colorMode(HSB, 360, 100, 100, 100)
    textAlign(CENTER, CENTER);
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
    arrival = false
}


function draw() {
    background(236, 37, 25)
    /** display all points and behaviors */
    for (let i = 0; i < vehicles.length; i++) {
        let v = vehicles[i]
        v.fleeFromMouse()
        v.update()
        v.wrap()
        v.show()

        if (arrival)
            v.returnToTextOrigin()
    }

    let level = amp.getLevel();
    let size = map(level, 0, 1, 2, 120);

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

    /* arrival! +recolor */
    if (key === 'x') {
        arrival = true

        for (let index in vehicles) {
            vehicles[index].hue = map(index, 0, vehicles.length, 0, 330)
            vehicles[index].r = 2
            vehicles[index].showText = false
        }
    }

    /* recolor in ascending rainbow :p */
    if (key === 'c') {
        for (let index in vehicles) {
            vehicles[index].hue = index
        }
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