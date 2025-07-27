let slider;
let rectangle_height = 40;
let rectangle_width = 40;
let columns; let rows;
let cellR = (rectangle_height + rectangle_width) / 2;
let grid = [];
let ellipse_size = (rectangle_height + rectangle_width) / 2
let random_red = 0; let random_green = 0; let random_blue = 0; let random_alpha = 0;
let top_left = cellR / 2;
let grid_proportions = 8 // This assumes the grid is a square


function setup() {
    createCanvas(rectangle_width * grid_proportions, rectangle_height * grid_proportions);
    fill(200) // Change this number to alter the background colour / colour of the grid

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
    slider.position(width - (width / 2 + 100), height - 50);
    slider.size(200);
}
function draw() { // To adjust colour combinations, edit this function
    translate(rectangle_height / 2, rectangle_width / 2)
    for (let ellipse_x = 0; ellipse_x < slider.value(); ellipse_x++) {
        for (let ellipse_y = 0; ellipse_y < slider.value(); ellipse_y++) {
            random_red = random(0) // Change this number to 0 to remove the red channel
            random_green = random(0) // Change this number to 0 to remove the green channel
            random_blue = random(256) // Change this number to 0 to remove the blue channel
            grid_alpha = (ellipse_x + ellipse_y + 1) / 2
            fill(random_red, random_green, random_blue, grid_alpha)
            ellipse(ellipse_x * cellR, ellipse_y * cellR, ellipse_size, ellipse_size)
        }
    }
}
function slider_menu() {
    fill(120)
    rect(0, 0, 200, 100)
}
