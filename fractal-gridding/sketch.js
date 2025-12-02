// Inspired by Fractal Gridding
// SOURCE: https://www.fractalgridding.com/ by Ecy Femi King and Dr. Rod King

function TO_DO(){
  return `
  TODO:
  + [] Compatibility across different browsers
  + [] UI that suits phones as well
  + [] Documentation for screen readers
  `
}
const stairs = (x, y) => {
  return Math.abs(x-y) === 1
}

class Level  {
  constructor(some_width, some_height=some_width){
    this.w = some_width
    this.h = some_height
  }
  array(){return [this.w, this.h]}
  lower(){return Math.min(this.w, this.h)}
  greater(){return Math.max(this.w, this.h)}
  sink(){
    try{
      if(typeof(this.w) != "number" ||
         typeof(this.h) != "number")
      {
        throw "both values have to be numbers"
      }
      let min_val = Math.min(this.w, this.h)
      this.w = min_val
      this.h = min_val
    }catch(e){
      let some_error = `Level.sink(${JSON.stringify(this)})E -> ${e}`
      throw new Error(some_error + "\n")
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
  static fromArray(array){
    try{
      if(array.length < 1){
        throw "empty array"}
      if(array.length === 1 && typeof(array[0] === "number")){
        return new Level(array[0])
      }
      if(typeof(array[0]) != "number" ||
         typeof(array[1]) != "number"){
        throw "array element has to be of type number "
      }
      return new Level(array[0], array[1])

    }catch(e){
      let some_error = `Level.fromArray(${JSON.stringify(array)})E -> ${e}`
      throw new Error(some_error + "\n")      
    }
  }
  static compare(some_level, other_level){
    return JSON.stringify(some_level.array()) === 
           JSON.stringify(other_level.array())
  }
}


// change grid size and size ratio here:
let settings = {
  canvas:  new Level(600, 600),
  dimensions: new Level(2, 1),
  outline_dimensions: new Level(1),
}

const max_level = 6
let slider_step = 3

const corners = {
  // Refactor from corners to segments or planets to cover more
  CENTRE: [settings.canvas.w/slider_step, settings.canvas.h/slider_step],
  TOP_LEFT: [0, 0],
  TOP_RIGHT: [settings.canvas.w-(settings.canvas.w/slider_step), 0 ],
  BOTTOM_RIGHT: [settings.canvas.w-(settings.canvas.w/slider_step), settings.canvas.h-(settings.canvas.h/slider_step)],
  BOTTOM_LEFT: [0, settings.canvas.h-(settings.canvas.h/slider_step)],
}

let corners_iterator = Iterator.from(Object.keys(corners))

let slider_background; let slider_outlines; let background_colour; let outline_colour;
let to_squares = false;
let current_corner = "CENTRE";
let corner_button;
function setup() {
  // first some general tests
  run_all_tests()
  console.log(TO_DO())

  // then the canvas, sliders, and colour elements
  // no return value
  let canvas = settings.canvas
  createCanvas(canvas.w, canvas.h);
  
  if(to_squares) Level.sinkAll(Object.values(settings))
  let background_clr = color(180)
  let outline_clr = color(60)
  let bold_outline_clr = color(10)
  background(background_clr)
  
  slider_step = 1
  slider_background = createSlider(0, max_level, settings.dimensions.lower(), slider_step)
  slider_background.size(width/4)

  background_colour = createColorPicker(background_clr)
  
  corner_button = createButton("MOVE", current_corner)
  corner_button.mousePressed(switchCornerButton)
  
  outline_colour = createColorPicker(bold_outline_clr)
  
   slider_outlines = createSlider(0, max_level, settings.outline_dimensions.lower(), slider_step)
  slider_outlines.size(width/4)
}

let new_canvas = new Level(
  settings.canvas.w/slider_step, 
  settings.canvas.h/slider_step,
);

function draw() {
  // no return value
  translate(0, 0)
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
  
  outline_dimensions = new Level(
    settings.outline_dimensions.w * slider_outlines.value(),
    settings.outline_dimensions.h * slider_outlines.value(),
  )
    
  translation_result = new Level(
    corners[corner_button.value()][0],
    corners[corner_button.value()][1],
  )
  translate(translation_result.w, translation_result.h)
  
  draw_grid(new_canvas, outline_dimensions)
}

function switchCornerButton(){
  try{
    let switched = corners_iterator.next()
    if(switched.done === true) throw "byeee"
    corner_button.value(switched.value)
  }catch(e){
    corners_iterator = Iterator.from(Object.keys(corners))
    let switched = corners_iterator.next()
    corner_button.value(switched.value)
  }
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