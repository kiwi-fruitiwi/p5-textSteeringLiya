/**
 *  @author Kiwi
 *  @date 2022.02.22
 *
 *  particles of different sizes and colors all over dark grey screen
 *      floating with edges() and random small velocities
 *  audio with neighborhood song? optional remix lol
 *      p5.amp affects velocities or accelerations
 *  near end of song, shrink back to rainbow points
 *      → seek original text places
 *      → by cody, 2.22, 2💖22 at time=2222
 *      cody and winry's voices saying happy birthday liya!
 */

let font
let vehicles = []
let points = []

function preload() {
    font = loadFont('data/bpdots.otf');
}

function setup() {
    createCanvas(600, 300)
    colorMode(HSB, 360, 100, 100, 100)
    background(0, 0, 30)

    points = font.textToPoints('happy birthday, ', 80, 100, 48, {
        sampleFactor: 0.01, // increase for more points
        // simplifyThreshold: 0 // increase to remove collinear points
    })

    points = points.concat(font.textToPoints('Liya!', 200, 175, 72, {
        sampleFactor: 0.06, // increase for more points
        // simplifyThreshold: 0 // increase to remove collinear points
    }))

    for (let i = 0; i < points.length; i++) {
        let pt = points[i]
        let vehicle = new Vehicle(pt.x, pt.y)
        vehicles.push(vehicle)
    }

    stroke(0, 50, 100, 100)
    strokeWeight(8)
}

function draw() {
    background(0, 0, 30)

    for (let i = 0; i < vehicles.length; i++) {
        let v = vehicles[i]
        v.behaviors()
        v.update()
        v.show()
    }
}