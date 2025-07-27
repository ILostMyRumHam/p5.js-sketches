let fib_array = [];
let n = 12
let opacity = 150;
function setup() {
    createCanvas(600, 600);
    translate(height / 2, width / 2)
    background(220);
    ellipseMode(CENTER);
    stroke(10);
    strokeWeight((n / 2) - 3)
    let fib1 = 0;
    let fib2 = 1;
    let fib3 = 0;
    let sum = 1;
    for (let i = 2; i <= n + 1; i++) { // For loop to calculate the fibonacci sequence up to a given number (n)
        fib3 = fib1 + fib2
        fib1 = fib2
        fib2 = fib3
        fib_array.push(fib2 * 2)
    }
    let j = 0;
    let locationx = 0;
    let locationy = 0;
    for (let i of fib_array) { // Red circles
        fill(255, 120, 120, opacity)
        ellipse(locationx, locationy, fib_array[j])
        j++
        locationx -= j
        locationy += j
    }
    j = 0;
    locationx = 0;
    locationy = 0;
    for (let i of fib_array) { // Green circles
        fill(120, 255, 120, opacity)
        ellipse(locationx, locationy, fib_array[j])
        j++
        locationy -= j;
    }
    j = 0;
    locationx = 0;
    locationy = 0;
    for (let i of fib_array) { // Blue Circles
        fill(120, 120, 255, opacity)
        ellipse(locationx, locationy, fib_array[j])
        j++
        locationx += j;
        locationy += j;
    }
    j = 1;
    locationx = 5;
    locationy = 5;
    for (let i of fib_array) { // Grey Circles
        fill((j * fib_array.length) / 2, opacity / 2)
        ellipse(locationx, locationy, fib_array[j - 1])
        j++
        if (j == fib_array.length) {
            break;
        }
    }
    fill(j * fib_array.length, opacity);
    let halfway_array_index = floor(fib_array.length / 2);
    ellipse(locationx, locationy, fib_array[halfway_array_index]); // Central ellipse
}