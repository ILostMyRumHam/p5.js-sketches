// Generate a gradient palette. Reset by double-clicking the screen anywhere

let slider; let slider_red; let slider_green; let slider_blue;
let rectangle_height = 40; let rectangle_width = 40;
let columns; let rows;
let cellR = (rectangle_height + rectangle_width) / 2;
let grid = [];
let ellipse_size = (rectangle_height + rectangle_width) / 2
let random_red = 0; let random_green = 0; let random_blue = 0; let grid_alpha = 0;
let top_left = cellR / 2;
let grid_proportions = 8; // This assumes the grid is a square
let background_colour = 120; // Change this number to alter the background colour / colour of the grid
let generate_rectangles = false; // Change this value to true to generate rectangles instead

function setup() {
    createCanvas(rectangle_width * grid_proportions, rectangle_height * grid_proportions);
    fill(background_colour)

    columns = width / cellR;
    rows = height / cellR;
    for (let i = 0; i < columns; i++) {
        grid[i] = []
        for (let j = 0; j < rows; j++) {
            grid[i][j] = ""
            rect(i * cellR, j * cellR, rectangle_width, rectangle_height);
        }
    }
    slider = createSlider(0, grid.length, 0, 1);
    slider.position(0, rectangle_height - 20);
    slider.size(rectangle_width * 2);

    slider_red = createSlider(0, 255, 0, 1);
    slider_red.position(0, rectangle_height * 2 - 20);
    slider_red.size(rectangle_width * 2);

    slider_green = createSlider(0, 255, 0, 1);
    slider_green.position(0, rectangle_height * 3 - 20);
    slider_green.size(rectangle_width * 2);

    slider_blue = createSlider(0, 255, 0, 1);
    slider_blue.position(0, rectangle_height * 4 - 20);
    slider_blue.size(rectangle_width * 2);
}
function draw() { // To adjust colour combinations, edit this function
    if (slider.value() === 0) {
        slider_menu()
    } else if (generate_rectangles === true) {
        translate(0, 0);
        for (let ellipse_x = 0; ellipse_x < slider.value(); ellipse_x++) {
            for (let ellipse_y = 0; ellipse_y < slider.value(); ellipse_y++) {
                random_red = slider_red.value() // Change this number to 0 to remove the red channel
                random_green = slider_green.value() // Change this number to 0 to remove the green channel
                random_blue = slider_blue.value() // Change this number to 0 to remove the blue channel
                grid_alpha = (ellipse_x + ellipse_y + 2) / 2
                fill(random_red, random_green, random_blue, grid_alpha)
                rect(ellipse_x * cellR, ellipse_y * cellR, ellipse_size, ellipse_size)
            }
        }
    } else {
        resetMatrix();
        translate(20, 20);

        for (let ellipse_x = 0; ellipse_x < slider.value(); ellipse_x++) {
            for (let ellipse_y = 0; ellipse_y < slider.value(); ellipse_y++) {
                random_red = slider_red.value() // Change this number to 0 to remove the red channel
                random_green = slider_green.value() // Change this number to 0 to remove the green channel
                random_blue = slider_blue.value() // Change this number to 0 to remove the blue channel
                grid_alpha = (ellipse_x + ellipse_y + 2) / 2
                fill(random_red, random_green, random_blue, grid_alpha)
                ellipse(ellipse_x * cellR, ellipse_y * cellR, ellipse_size, ellipse_size)
            }
        }
    }
    slider_menu()
}

function slider_menu() {
    resetMatrix();
    textAlign(CENTER)
    fill(255);
    stroke(0);
    strokeWeight(1);
    text("Gradient", rectangle_width, rectangle_height - 20);
    text("Red", rectangle_width, rectangle_height * 2 - 20);
    text("Green", rectangle_width, rectangle_height * 3 - 20);
    text("Blue", rectangle_width, rectangle_height * 4 - 20);

    noStroke()
    strokeWeight(0)
}

function doubleClicked() {
    clear();
    slider.value(0)
    slider_red.value(0)
    slider_green.value(0)
    slider_blue.value(0)
    fill(background_colour)
    stroke(0)
    strokeWeight(1)
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            rect(i * cellR, j * cellR, rectangle_width, rectangle_height);
        }
    }
}
