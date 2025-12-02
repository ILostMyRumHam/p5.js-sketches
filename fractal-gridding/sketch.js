// inspired by: https://www.fractalgridding.com/
// todo: function documentation
const InterfaceLevels = {
  /* For interaction with the Level class defined below
  */
  lower: (x, y) => {return Math.min(x, y)},
  sink: function(level){
    try{
      if(typeof(level.w) != "number" ||
         typeof(level.h) != "number")
      {
        throw("both values have to be numbers")
      }
      level.w = InterfaceLevels.lower(level.w, level.h)
      level.h = InterfaceLevels.lower(level.w, level.h)
      return level
    }catch(e){
      let some_error = `InterfaceLevels.sink(${JSON.stringify(level)})E ->`
      throw new Error(some_error + "\n" + e)
    }
   },
  lattice: (x, y) => {return x === y-1},
  average: (x, y) =>{return (x+y)/2}
}

class Level  {
  constructor(some_width, some_height=some_width){
    this.w = some_width
    this.h = some_height
  }
  sink(){return InterfaceLevels.sink(this)}
  toString(){return String(this.w) + String(this.h)}
  lower(){return InterfaceLevels.lower(this.w, this.h)}
  average(){return InterfaceLevels.average(this.w, this.h)}
  to_average(){let avg =this.average(); this.w = avg; this.h = avg}
}


// change grid size and size ratio here:
const settings = {
  canvas:  new Level(400, 400),
  dimensions: new Level(5, 3),
  outline_dimensions: new Level(1,1),
  sinkAll: function(){
    for(let i =0; i < Object.values(this).length-1; i++){
        InterfaceLevels.sink(Object.values(this)[i])
    }
  },
}

let slider_background; let slider_outlines; let background_colour; let outline_colour
let to_squares = true
function setup() {
  // first some general tests
  run_all_tests()
  // then the canvas, sliders, and colour elements
  // no return value
  let canvas = settings.canvas
  createCanvas(canvas.w, canvas.h);
  
  if(to_squares) settings.sinkAll()
  let background_clr = color(180)
  let outline_clr = color(60)
  let bold_outline_clr = color(10)
  background(background_clr)
  slider_background = createSlider(1, 6, 1, 1)
  slider_background.size(width/3)

  background_colour = createColorPicker(background_clr)
  outline_colour = createColorPicker(bold_outline_clr)
  
  slider_outlines = createSlider(1, 6, 1, 1)
  slider_outlines.size(width/3)
}

let new_canvas = new Level(
  settings.canvas.w/2, 
  settings.canvas.h/2
);

function draw() {
  // no return value
  let dimensions = settings.dimensions
  let outline_dimensions = settings.outline_dimensions
  strokeWeight(1)
  background(background_colour.value())
  fill(background_colour.value())
  stroke(outline_colour.value());
  
  let new_grid = new Level(
    dimensions.w*slider_background.value(),
    dimensions.h*slider_background.value()
  )
  draw_grid(settings.canvas, new_grid)
  
  strokeWeight(3)
  translate(new_canvas.w, new_canvas.h)
  fill(background_colour.value())
  
  new_grid = new Level(
    outline_dimensions.w*slider_outlines.value(),
    outline_dimensions.h*slider_outlines.value()
  )
  draw_grid(new_canvas, new_grid)
  translate(0, 0)
}



function draw_grid(canvas_size, obj_dimensions, make_lattice=false){
  // mandatory inputs are object instances with fields w and h that are numbers
  // no return value

  const lattice = InterfaceLevels.lattice
  const rect_size = new Level(
    canvas_size.w/obj_dimensions.w,
    canvas_size.w/obj_dimensions.h
  )

  for(let i = 0; i < obj_dimensions.w; i++){
    for(let j = 0; j < obj_dimensions.h; j++){
      if(lattice(i, j) && make_lattice) break
      rect(i * rect_size.w, j*rect_size.h, rect_size.w, rect_size.h)
    }
  }
}