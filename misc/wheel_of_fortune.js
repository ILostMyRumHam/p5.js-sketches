// Hold and release a mouse button to spin the wheel
const Maps = new Map([
  [1, "Result 1"],
  [2, "Result 2"],
  [3, "Result 3"],
  [4, "Result 4"],
  [5, "Result 5"],
  [6, "Result 6"],
  [7, "Result 7"],
  [8, "Result 8"],
  [9, "Result 9"],
  [10, "Result 10"],
  [11, "Result 11"],
  [12, "Result 12"],
  [13, "Result 13"],
  [14, "Result 14"]
]);
let maps_by_colour = new Map();
let rotation_speed = 0;
let colour_slice = 0;
let duration = 10;
let final_colour = 0;
let hue_final = 0;
let wheel_spun = false;

function setup() {
  createCanvas(800, 800);

  angleMode(DEGREES);

  // Set text color, size, and alignment
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);

  // Set the color mode to hue-saturation-brightness (HSB)
  colorMode(HSB);
  background(0);
  // Create screen reader accessible description
  describe('Pseudo-random roulette');
}
function draw_roulette() {
  let i = 1;
  let current_map = ""
  for (let angle = 0; angle <= 336; angle += 24) {
    // Save current coordinate system
    push();

    // Translate to center of canvas and rotate by angle
    translate(0, 0);
    rotate(angle);

    // Set color based on angle and draw arc representing each circle slice
    colour_slice = angle;
    stroke(angle, 100, 100);
    fill(angle, 100, 30);
    strokeWeight(5);
    //line(0, 0, 250, 0);
    arc(0, 0, 600, 600, 0, PI * 7.6);
    if (i <= 14) {
      current_map = Maps.get(i);
      stroke(0);
      fill(angle, 40, 100);
      strokeWeight(2);
      text(current_map, 220, 15);
      maps_by_colour.set(colour_slice, current_map)
      i += 1;
      // Restore coordinate system
      pop()
    } else {
      stroke(0);
      fill(angle, 40, 100);
      strokeWeight(2);
      text("Reroll", 220, 15);
      // Restore coordinate system
      pop()
    }
  }
}

function draw() {
  background(10);
  static_lines();
  if (mouseIsPressed === true) {
    translate(width / 2, height / 2);
    rotate(frameCount);
    draw_roulette();
  } else if (wheel_spun === false) {
    translate(width / 2, height / 2);
    rotate(frameCount / 20);
    draw_roulette();
    get_map_name();
  } else {
    translate(width / 2, height / 2);
    rotate(duration + rotation_speed);
    draw_roulette();
    if (duration >= 0 && duration <= 100) {
      duration -= 1
    } else if (duration >= 100) {
      duration /= 1.1
    } else {
      get_map_name();
    }
  }
}

function static_lines() {
  translate(0, 0)
  stroke(hue_final, 50, 100);
  strokeWeight(5);
  line(width, height, width - 180, height - 180);
  line(width - 180, height - 180, width - 75, height - 150);
  line(width - 180, height - 180, width - 150, height - 75);
}

function mouseReleased() { // Spin the wheel.
  rotation_speed = floor(random(0, 500));
  duration = floor(random(200, 4500));
  wheel_spun = true;
}
function get_map_name() { // Find hue from the RGB value returned by get
  if (wheel_spun === false) {
    stroke(10);
    fill(0, 50, 100);
    strokeWeight(10);
    resetMatrix();
    text("Hold and release to spin the wheel", width - 250, height - 30);
  } else {
    translate(0, 0);
    final_colour = get(width - 190, height - 190) // Returns RGB, the colour mode is HSB
    let max_rg_b = Math.max(final_colour[0], final_colour[1], final_colour[2]);
    let min_rg_b = Math.min(final_colour[0], final_colour[1], final_colour[2]);

    // all greyscale colors have hue of 0deg
    if (max_rg_b - min_rg_b == 0) {
      hue_final = 0;
    }

    else if (max_rg_b == final_colour[0]) {
      // if red is the predominant color
      hue_final = (final_colour[1] - final_colour[2]) / (max_rg_b - min_rg_b);
    }
    else if (max_rg_b == final_colour[1]) {
      // if green is the predominant color
      hue_final = 2 + (final_colour[2] - final_colour[0]) / (max_rg_b - min_rg_b);
    }
    else if (max_rg_b == final_colour[2]) {
      // if blue is the predominant color
      hue_final = 4 + (final_colour[0] - final_colour[1]) / (max_rg_b - min_rg_b);
    }

    hue_final = hue_final * 60;

    // make sure h is a positive angle on the color wheel between 0 and 360
    hue_final %= 360;
    if (hue_final < 0) {
      hue_final += 360;
    }
    stroke(10);
    fill(hue_final, 50, 100);
    strokeWeight(10);
    hue_final = Math.round(hue_final);
    final_map = maps_by_colour.get(hue_final)
    resetMatrix()
    if (final_map === undefined) {
      text("Lucky you: Time to reroll", width - 250, height - 30);
    } else {
      final_map = "The result is: " + final_map
      text(final_map, width - 250, height - 30);
    }
  }
}