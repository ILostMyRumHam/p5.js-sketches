/* 
flashing colours
*/
const seconds = 2
const set_frame_rate = 40
const canvas = {x: 500, y : 500}
const base_colour = {r: 190, g: 0, b: 0}
const make_gif = false
const input_text = "Hello p5.js"

const EnumCorner = {
  TOP_LEFT: 1,
  TOP_RIGHT: 2,
  BOTTOM_LEFT: 3,
  BOTTOM_RIGHT: 4,
}
// There are several ways to declare and format functions in p5.js

// First there are the built-in functions that come with p5.js

// They are explained in more detail here: https://p5js.org/reference/
function setup() {
  frameRate(set_frame_rate)
  createCanvas(canvas.x, canvas.y);
  background(220, 80, 170, 1)
  noStroke()
  
  textSize(50)
  textAlign(CENTER)
  describe(" a pulsing light from the top-left side of the canvas")
}

// Functions can be declared using the "function" keyword

// (number, number, number) -> [number].length === 2
function check_corner(enum_of_EnumCorner, canvas_width, canvas_height){
  try{
  switch(enum_of_EnumCorner){
    case EnumCorner.TOP_LEFT: return [0, 0]
    case EnumCorner.TOP_RIGHT: return [canvas_width, 0]
    case EnumCorner.BOTTOM_LEFT: return [0, canvas_height]
    case EnumCorner.BOTTOM_RIGHT: return [canvas_width, canvas_height]
    default: throw("check_corner()E -> EnumError")
      }
  }
  catch(e){
    throw new Error(e)
  }
}
// Or using so-called "arrow" syntax (referring to "=>")

// number -> [object].length === y
const grid_nums = (y) => {
  let a=[];
  for(let i = 0; i < Math.abs(y); i++)
  {const obj = {x: i * y, y: i * y};
    a.push(obj)}
  return a}

// Functions might be just one expression
const negate = (some_number) => some_number*-1;

// We can use built-in JavaScript functions inside of user-defined functions

// This already happened earlier with Math.abs()

// object -> object
const randomise_object = (obj) => {
  let z = obj; 
  for(let i of Object.keys(z))
    {z[i] = Math.random() * z[i]}
  return z}


// We can set default values for certain parameters in the function signature

// (number, []number, []number) -> bool
const check_colour_bounds = (number, lower=0, upper=255) => {
  return lower < number && number < upper
}


let grid_compartment = 20
let grid_half  = grid_nums(grid_compartment)
let grid_other_half = grid_nums(grid_compartment)
let grid = grid_half.concat(grid_other_half)

let colour_alpha = 1
let background_alpha = 1

let colour_alpha_counter = 1; let background_alpha_counter = -1;
let corner = EnumCorner.TOP_LEFT


function draw() {
  let corner_coordinates = check_corner(corner, width, height)
  translate(corner_coordinates[0], corner_coordinates[1])
  push()
  if (frameCount >= frameRate() * seconds) return
  fill(base_colour.r, base_colour.g, base_colour.b-background_alpha, colour_alpha)

  let new_grid = grid_nums(grid_compartment)
  new_grid.forEach(randomise_object)
  
  for(let i of new_grid){
    rect(20, 0, 5)
    ellipse(0, 0, 5,5)
    ellipse(noise(height), 0, 5, 5)
    triangle(noise(height), noise(width), i.x, i.y, -40, -150)
  }
  // (number, bool) -> number
  const counter_switch = (counter, condition) => {
    let res = condition ? 
    counter: 
    counter *-1;
    return res
    }
  colour_alpha_counter = counter_switch(
    colour_alpha_counter, 
    check_colour_bounds(colour_alpha, 0, 50)
  )
  colour_alpha += colour_alpha_counter

  background_alpha_counter = counter_switch(
    background_alpha_counter, 
    check_colour_bounds(background_alpha, 0, 255)
  )
  background_alpha -= background_alpha_counter

  text(input_text, width/2, height/2)
  pop()
}

function keyPressed() {
  if (key === 's' && make_gif===true) {
    saveGif('mySketch', 3);
  }
}
