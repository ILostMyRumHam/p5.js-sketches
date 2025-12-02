// Inspired by Fractal Gridding
// SOURCE: https://www.fractalgridding.com/ by Ecy Femi King and Dr. Rod King


function change_dimensions(new_value_w, new_value_h) {  
  // I don't know why I didn't write a class with a constructor instead -> ?
  
  // also confusingly named since it does not edit any object, it creates a new one
  // return object with fields w and h
  try{
  const output = {
    w: new_value_w,
    h: new_value_h,
  };
  return output
  }catch(e){
    let some_error =`change_dimensions(${new_object}, ${new_value_w}, ${new_value_h})E -> error!`
    throw new Error(some_error, e)
  }
}

// change grid size and size ratio here:
const canvas = {w: 600, h: 600, }
let dimensions = {w: 2, h: 2, }
let outline_dimensions= {w: 1, h:2,}

class SliderBase {
  // probably unnecessary as slider information can just be an array of 4 numbers
  // a whole class for two sliders seems unnecessary
  constructor(min_val=0, max_val = 1, start=0, step=1){
    this.min_val = min_val
    this.max_val = max_val
    this.start = start
    this.step = step
  }
}

// move inside setup()
let slider = new SliderBase(0, 10, 1, 1)
let bold = new SliderBase(0, 10, 1, 1);

let slider_background; let slider_outlines; let background_colour; let outline_colour
function setup() {
  // create canvas, sliders, and colour elements
  // no return value
  createCanvas(canvas.w, canvas.h);
  let background_clr = color(180)
  background(background_clr)
  let outline_clr = color(60)
  let bold_outline_clr = color(10)
  slider_background = createSlider(slider.min_val, slider.max_val, slider.start, slider.step)
  slider_background.size(width/3)

  background_colour = createColorPicker(background_clr)
  outline_colour = createColorPicker(bold_outline_clr)
  
  slider_outlines = createSlider(bold.min_val, bold.max_val, bold.start, bold.step)
  slider_outlines.size(width/3)
}

let new_canvas = change_dimensions(canvas.w/2, canvas.h/2);
function draw() {
  // no return value
  strokeWeight(1)
  background(background_colour.value())
  fill(background_colour.value())
  stroke(outline_colour.value());
  
  let new_grid = change_dimensions(dimensions.w*slider_background.value(), dimensions.h*slider_background.value())
  draw_grid(canvas, new_grid)
  
  strokeWeight(3)
  translate(new_canvas.w, new_canvas.h)
  fill(background_colour.value())
  new_grid = change_dimensions(outline_dimensions.w*slider_outlines.value(), outline_dimensions.h*slider_outlines.value())
  draw_grid(new_canvas, new_grid)
  translate(0, 0)
}

const lattice = (x, y) => {return x === y-1}

function draw_grid(canvas_size, obj_dimensions, make_lattice=false){
  // mandatory inputs are object instances with fields w and h that are numbers
  
  // no return value
  const rect_size = {
    w: canvas_size.w/obj_dimensions.w,
    h: canvas_size.w/obj_dimensions.h,
  }
  for(let i = 0; i < obj_dimensions.w; i++){
    for(let j = 0; j < obj_dimensions.h; j++){
      if(lattice(i, j) && make_lattice) break
      rect(i * rect_size.w, j*rect_size.h, rect_size.w, rect_size.h)
    }
  }
}