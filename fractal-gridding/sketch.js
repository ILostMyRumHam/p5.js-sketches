// Inspired by Fractal Gridding
// SOURCE: https://www.fractalgridding.com/ by Ecy Femi King and Dr. Rod King



function change_dimensions(object, new_value_w, new_value_h = new_value_w) {
  // change dimensions of an object with fields w and h 
  
  // return
  let output = object 
  try{
  output.w = new_value_w
  output.h = new_value_h
  return output
  }catch(e){
    let some_error =`change_dimensions(${new_object}, ${new_value_w}, ${new_value_h})E -> error!`
    throw new Error(some_error, e)
  }
}

const canvas = {w: 400, h: 400, }
let dimensions = {w: 1, h: 1, }
let outline_dimensions= {w: 1, h:1,}

class SliderBase {
  constructor(min_val=0, max_val = 1, start=0, step=1){
    this.min_val = min_val
    this.max_val = max_val
    this.start = start
    this.step = step
  }
}
let slider = new SliderBase(0, 15, 0, 1)
let bold = new SliderBase(0, 15, 0, 1);

let slider_background; let slider_outlines; let background_colour; let outline_colour
function setup() {
  createCanvas(canvas.w, canvas.h);
  let background_clr = color(180)
  background(background_clr)
  let outline_clr = color(60)
  let bold_outline_clr = color(10)
  slider_background = createSlider(slider.min_val, slider.max_val, slider.start, slider.step)

  background_colour = createColorPicker(background_clr)
  outline_colour = createColorPicker(bold_outline_clr)
  
  slider_outlines = createSlider(bold.min_val, bold.max_val, bold.start, bold.step)
  
}

let new_canvas = {w: 200, h: 200};
function draw() {
  background(background_colour.value())
  fill(background_colour.value())
  stroke(outline_colour.value());
  
  dimensions = change_dimensions(dimensions, slider_background.value())
  draw_grid(canvas, dimensions)
  
  
  translate(new_canvas.w, new_canvas.h)
  fill(background_colour.value())
  outline_dimensions = change_dimensions(outline_dimensions, slider_outlines.value())
  draw_grid(new_canvas, outline_dimensions)
  translate(0, 0)
}

const lattice = (x, y) => {return x === y-1}

function draw_grid(canvas_size, obj_dimensions, make_lattice=false){
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