// This code generates a 4x8 colour palette of a grid filled with random colours
// Clicking replaces a target colour with a different random colour
// Running the programme again generates a new set of 32 colours
let columns; let rows;
let grid_columns; let grid_rows;
let rectangle_side = 80;
let ellipse_height = 80; // By changing these values you can adjust how many ellipses are generated
let ellipse_width = 80; // Try changing ellipse_height and width; and rectangle size to 40
let random_red = 0; let random_green = 0; let random_blue = 0;
let opacity = 255; // 255 equals 0% transparency. 0 equals 100% transparency.
let change_background_and_circle = true
let overwrite_cell = false  // overwrites the previous change if set on true
let enable_flashing_colours = true // controls the mouseDragged() function

function setup() {
    createCanvas(320, 640); // You can adjust the width and height of the canvas
    background(180); // You can adjust the background colour by changing this number
    columns = height / ellipse_height;
    rows = width / ellipse_width;
    grid_columns = width / rectangle_side;
    grid_rows = height / rectangle_side;
    ellipseMode(CENTER)
    rectMode(CENTER)
    for (let i = 0; i < columns; i++) {// This nested for loop generates the colour content of each square of the grid
        for (let j = 0; j < rows * 2; j++) {
            random_red = random(0, 256); // Changing the second number to zero removes the red channel
            random_green = random(0, 256);// Changing the second number to zero removes the green channel
            random_blue = random(0, 256);// Changing the second number to zero removes the blue channel
            random_alpha = random(0, 256);// Changing the second number to zero removes the alpha channel

            noStroke(); // Try changing "noStroke()" to "stroke(10)"
            fill(random_red, random_green, random_blue, random_alpha);
            ellipse(ellipse_width / 2 + (i * ellipse_width), ellipse_height / 2 + (j * ellipse_height), ellipse_width, ellipse_height); // Try changing the first highlighted "ellipse" to "rect"
        }
    }
    for (let k = 0; k < grid_columns; k++) { // This nested for loop generates the grid 
        for (let l = 0; l < grid_rows; l++) {
            fill(255, 255, 255, 0) // The alpha_channel is set to zero so the squares are fully transparent
            stroke(0);// the outline 
            rect(rectangle_side / 2 + (k * rectangle_side), rectangle_side / 2 + (l * rectangle_side), rectangle_side, rectangle_side);
        }
    }
}

function mouseReleased() { // Changes the colour of a given circle based on mouse location
    if (overwrite_cell === true) {
        let grid_x = mouseX; let grid_y = mouseY;
        let x = floor(grid_x / ellipse_width); let y = floor(grid_y / ellipse_height);
        random_red = random(0, 256); random_green = random(0, 256);
        random_blue = random(0, 256); random_alpha = random(0, 256);
        stroke(0);
        fill(random_red, random_green, random_blue, random_alpha);
        rect((rectangle_side / 2) + (x * rectangle_side), (rectangle_side / 2) + (y * rectangle_side), rectangle_side, rectangle_side)
    }
    else if (change_background_and_circle === true) {
        let grid_x = mouseX; let grid_y = mouseY;
        let x = floor(grid_x / rectangle_side); let y = floor(grid_y / rectangle_side);
        random_red = random(0, 256); random_green = random(0, 256);
        random_blue = random(0, 256); random_alpha = random(0, 256);
        stroke(0);
        fill(random_red, random_green, random_blue, random_alpha);
        rect((rectangle_side / 2) + (x * rectangle_side), (rectangle_side / 2) + (y * rectangle_side), rectangle_side, rectangle_side)
        random_red = random(0, 256); random_green = random(0, 256);
        random_blue = random(0, 256); random_alpha = random(0, 256);
        noStroke();
        fill(random_red, random_green, random_blue, opacity);
        ellipse((ellipse_width / 2) + (x * ellipse_width), (ellipse_height / 2) + (y * ellipse_height), ellipse_width, ellipse_height)

    } else {
        let grid_x = mouseX; let grid_y = mouseY;
        let x = floor(grid_x / ellipse_width); let y = floor(grid_y / ellipse_height);
        random_red = random(0, 256); random_green = random(0, 256);
        random_blue = random(0, 256); random_alpha = random(0, 256);
        noStroke();
        fill(random_red, random_green, random_blue, opacity);
        ellipse((ellipse_width / 2) + (x * ellipse_width), (ellipse_height / 2) + (y * ellipse_height), ellipse_width, ellipse_height)
    }
}

function mouseDragged() { // Changes the colour of a given background rectangle while dragging the mouse
    if (enable_flashing_colours === false) {
        return
    }
    else if (overwrite_cell === true) {
        let grid_x = mouseX; let grid_y = mouseY;
        let x = floor(grid_x / rectangle_side); let y = floor(grid_y / rectangle_side);
        random_red = random(0, 256); random_green = random(0, 256);
        random_blue = random(0, 256); random_alpha = random(0, 256);
        stroke(0);
        fill(random_red, random_green, random_blue, random_alpha);
        rect((rectangle_side / 2) + (x * rectangle_side), (rectangle_side / 2) + (y * rectangle_side), rectangle_side, rectangle_side)
    }
    else if (change_background_and_circle === true) {
        let grid_x = mouseX; let grid_y = mouseY;
        let x = floor(grid_x / rectangle_side); let y = floor(grid_y / rectangle_side);
        random_red = random(0, 256); random_green = random(0, 256);
        random_blue = random(0, 256); random_alpha = random(0, 256);
        stroke(0);
        fill(random_red, random_green, random_blue, random_alpha);
        rect((rectangle_side / 2) + (x * rectangle_side), (rectangle_side / 2) + (y * rectangle_side), rectangle_side, rectangle_side)
        random_red = random(0, 256); random_green = random(0, 256);
        random_blue = random(0, 256); random_alpha = random(0, 256);
        noStroke();
        fill(random_red, random_green, random_blue, opacity);
        ellipse((ellipse_width / 2) + (x * ellipse_width), (ellipse_height / 2) + (y * ellipse_height), ellipse_width, ellipse_height)

    } else {
        let grid_x = mouseX; let grid_y = mouseY;
        let x = floor(grid_x / ellipse_width); let y = floor(grid_y / ellipse_height);
        random_red = random(0, 256); random_green = random(0, 256);
        random_blue = random(0, 256); random_alpha = random(0, 256);
        noStroke();
        fill(random_red, random_green, random_blue, opacity);
        ellipse((ellipse_width / 2) + (x * ellipse_width), (ellipse_height / 2) + (y * ellipse_height), ellipse_width, ellipse_height)
    }
}