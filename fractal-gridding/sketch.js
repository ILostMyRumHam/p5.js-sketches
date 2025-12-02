// Inspired by Fractal Gridding
// SOURCE: https://www.fractalgridding.com/ by Ecy Femi King and Dr. Rod King

const stairs = (x, y) => {
  return Math.abs(x-y) === 1
}


class Level  {
  
  /*TODO: class docs
  
  I might move this class to a separate file soon 
  */
  constructor(some_width, some_height=some_width){
    this.w = some_width
    this.h = some_height
  }
  array(){return [this.w, this.h]}
  lower(){return Math.min(this.w, this.h)}
  higher(){return Math.max(this.w, this.h)}
  sink(){
    try{
      if(typeof(this.w) != "number" ||
         typeof(this.h) != "number")
      {
        throw("both values have to be numbers")
      }
      let min_val = Math.min(this.w, this.h)
      this.w = min_val
      this.h = min_val
    }catch(e){
      let some_error = `Level.sink(${JSON.stringify(this)})E -> ${e}`
      throw new Error(some_error + "\n" + e)
    }
   }
  average() {
    let avg = (this.w+this.h)/2
    this.w = avg
    this.h = avg
  }
  toString(){
    return `Level: (${this.w} ${this.h})`
  }
  static lattice(some_lowest_level, other_lowest_level) {
    return stairs(some_lowest_level, other_lowest_level)}
  static sinkAll(iterable_of_levels){
    for(let i of iterable_of_levels){
        i.sink()
    }
  }
  static lowestLevel(iterable_of_levels){
    let lowest = iterable_of_levels[0]
    for(let i of iterable_of_levels){
      lowest = lowest.lower() < i.lower() ?
                lowest :
                i
      }
    return lowest
    }
}


// change grid size and size ratio here:
let settings = {
  canvas:  new Level(400, 400),
  dimensions: new Level(1),
  outline_dimensions: new Level(2, 1),
}

const max_level = 5
const slider_step = 1
const to_squares = false

let slider_background; let slider_outlines; let background_colour; let outline_colour
function setup() {
  // first some general tests
  run_all_tests()
  // then the canvas, sliders, and colour elements
  // no return value

  let canvas = settings.canvas
  createCanvas(canvas.w, canvas.h);
  
  if(to_squares) Level.sinkAll(Object.values(settings))
  let background_clr = color(180)
  let outline_clr = color(60)
  let bold_outline_clr = color(10)
  background(background_clr)
  slider_background = createSlider(0, max_level, settings.dimensions.lower(), slider_step)
  slider_background.size(width/3)

  background_colour = createColorPicker(background_clr)
  outline_colour = createColorPicker(bold_outline_clr)
  
   slider_outlines = createSlider(0, max_level, settings.outline_dimensions.lower(), slider_step)
  slider_outlines.size(width/3)
}

let new_canvas = new Level(
  settings.canvas.w/2, 
  settings.canvas.h/2
);

function draw() {
  // no return value
  frameRate(24)
  let outline_dimensions = settings.outline_dimensions
  strokeWeight(1)
  background(background_colour.value())
  fill(background_colour.value())
  stroke(outline_colour.value());
  let dimensions  = new Level(
    settings.dimensions.w * slider_background.value(),
    settings.dimensions.h * slider_background.value(),
  )
  draw_grid(settings.canvas, dimensions)
  
  strokeWeight(3)
  translate(new_canvas.w, new_canvas.h)
  
  outline_dimensions = new Level(
    settings.outline_dimensions.w * slider_outlines.value(),
    settings.outline_dimensions.h * slider_outlines.value(),
  )
  
  draw_grid(new_canvas, outline_dimensions)
  translate(0, 0)

}



function draw_grid(canvas_size, obj_dimensions, make_stairs=false){
  // mandatory inputs are object instances with fields w and h that are numbers
  // no return value

  const rect_size = new Level(
    canvas_size.w/obj_dimensions.w,
    canvas_size.h/obj_dimensions.h
  )

  for(let i = 0; i < obj_dimensions.w; i++){
    for(let j = 0; j < obj_dimensions.h; j++){
      if(stairs(i, j) && make_stairs) break
      rect(i * rect_size.w, j*rect_size.h, rect_size.w, rect_size.h)
    }
  }
}