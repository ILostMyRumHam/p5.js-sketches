// This code generates a 3x3 colour palette of a grid filled with random colours
// Clicking replaces a target colour with a different random colour
// Double-clicking replaces a target colour with an average of all-surrounding colours
// Running the programme again generates a new set of 9 colours
let columns; let rows;
let grid_columns; let grid_rows;
let rectangle_side = 160;
let ellipse_height = 160; // By changing these values you can adjust how many ellipses are generated
let ellipse_width = 160; // Try changing ellipse_height and width and rectangle size to 40
let random_red = 0; let random_green = 0; let random_blue = 0; let random_alpha = 0;
let opacity = 255; // 255 equals 0% transparency. 0 equals 100% transparency.
let change_background_and_circle = true
let overwrite_cell = false  // overwrites the previous change if set on true
let enable_flashing_colours = true // controls the mouseDragged() function

function setup() {
  createCanvas(480, 480); // You can adjust the width and height of the canvas
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
      fill(random_red, random_green, random_blue, opacity);
      rect(ellipse_width / 2 + (i * ellipse_width), ellipse_height / 2 + (j * ellipse_height), ellipse_width, ellipse_height); // Try changing the first highlighted "ellipse" to "rect"
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
    fill(random_red, random_green, random_blue, opacity);
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
    fill(random_red, random_green, random_blue, opacity);
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

function doubleClicked() { // Changes the colour of a circle by averaging the colour of the circle and all surrounding grid spaces
  let avg_red = 0; let avg_green = 0; let avg_blue = 0; let avg_alpha = 0;
  let grid_x = mouseX; let grid_y = mouseY;
  let red_hue_modiefer = random(0, 28) * ((columns + rows) / 2)
  let green_hue_modiefer = random(0, 28) * ((columns + rows) / 2)
  let blue_hue_modiefer = random(0, 28) * ((columns + rows) / 2)
  let ellipse_location_x = floor(grid_x / ellipse_width); let ellipse_location_y = floor(grid_y / ellipse_height);
  let x = grid_x - ellipse_width; let y = grid_y - ellipse_height;//Top left corner
  let x2 = grid_x + ellipse_width; let y2 = grid_y - ellipse_height;//Top right corner
  let x3 = grid_x - ellipse_width; let y3 = grid_y + ellipse_height;//Bottom left corner
  let x4 = grid_x + ellipse_width; let y4 = grid_y + ellipse_height;//Bottom right corner
  let x5 = grid_x; let y5 = grid_y + ellipse_height;//Bottom 
  let x6 = grid_x; let y6 = grid_y - ellipse_height;//Top 
  let x7 = grid_x + ellipse_width; let y7 = grid_y; // Right
  let x8 = grid_x - ellipse_width; let y8 = grid_y; // Left
  avg_red = floor((get(grid_x, grid_y)[0] + get(x, y)[0] + get(x2, y2)[0] + get(x3, y3)[0] + get(x4, y4)[0] + get(x5, y5)[0] + get(x6, y6)[0] + get(x7, 7)[0] + get(x8, y8)[0]) / 9) + red_hue_modiefer;
  avg_green = floor((get(grid_x, grid_y)[1] + get(x, y)[1] + get(x2, y2)[1] + get(x3, y3)[1] + get(x4, y4)[1] + get(x5, y5)[1] + get(x6, y6)[1] + get(x7, 7)[1] + get(x8, y8)[1]) / 9) + green_hue_modiefer;
  avg_blue = floor((get(grid_x, grid_y)[2] + get(x, y)[2] + get(x2, y2)[2] + get(x3, y3)[2] + get(x4, y4)[2] + get(x5, y5)[2] + get(x6, y6)[2] + get(x7, 7)[2] + get(x8, y8)[2]) / 9) + blue_hue_modiefer;
  avg_alpha = floor((get(grid_x, grid_y)[3] + get(x, y)[3] + get(x2, y2)[3] + get(x3, y3)[3] + get(x4, y4)[3] + get(x5, y5)[3] + get(x6, y6)[3] + get(x7, 7)[3] + get(x8, y8)[3]) / 9);
  random_alpha = floor(random(0, 256));
  noStroke();
  fill(0, 0, 0);
  rect((ellipse_width / 2) + (ellipse_location_x * ellipse_width), (ellipse_height / 2) + (ellipse_location_y * ellipse_height), rectangle_side, rectangle_side)
  fill(avg_red, avg_green, avg_blue, opacity);
  ellipse((ellipse_width / 2) + (ellipse_location_x * ellipse_width), (ellipse_height / 2) + (ellipse_location_y * ellipse_height), ellipse_width, ellipse_height)
}