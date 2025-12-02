// Inspired by Fractal Gridding
// SOURCE: https://www.fractalgridding.com/ by Ecy Femi King and Dr. Rod King

function keyReleased(){
  // Left CTRL for switching from paint to erase
    if(keyCode === 17){ 
      new_brush.mode.swap()
    }
}

function TO_DO(){
  console.log(`
  TODO:
  + [] Compatibility across different browsers
  + [] UI that suits phones as well
  + [] Documentation for screen readers
  + [] Clean up unused variables
  `)
}
let new_brush = new Brush(x = 0, y = 0, weight = 10)

let settings = {
  canvas:  new Level(400, 400),
  dimensions: new Level(3,3),
  max_level: new Level(2),
}


const outlines_weight = {
  base: 1,
  orbit: 3,
  centre: 5,
  outer: 20,
}

let slider_background; let slider_brush; 
let background_colour; let outline_colour;
const to_squares = false;

const slider_step = 1;
function setup() {
  // first some general tests
  run_all_tests()
  TO_DO()
  // then the canvas, sliders, and colour elements
  // no return value
  if(to_squares) Level.sinkAll(Object.values(settings))
  
  createCanvas(settings.canvas.getW(), settings.canvas.getH());
  
  slider_background = createSlider(0, settings.max_level.greater(), 0 , slider_step)
  slider_background.size(width/4)
  
  background_colour = createColorPicker()
  
  outline_colour = createColorPicker()
  
  brush_colour = createColorPicker()
  
  slider_brush = createSlider(0, 100, new_brush.getWeight(), 1)
  slider_brush.size(width/4)
}

function draw() {
  // no return value
  new_brush.setWeight(slider_brush.value())
  strokeWeight(1)
  const colour_space = () => {
    strokeWeight(1)
    fill(background_colour.value())
    stroke(outline_colour.value());
  }
  colour_space()
  
  let dimensions  = new Level(
    settings.dimensions.getW()**slider_background.value(),
    settings.dimensions.getH()**slider_background.value(),
  )
  
  slider_brush.changed(() =>{
    new_brush.setWeight(slider_brush.value())

  })
  slider_background.changed(() =>{
    colour_space()
    background(background_colour.value())
    draw_grid(settings.canvas, dimensions)
  })
  background_colour.changed(() =>{
    colour_space()
    background(background_colour.value())
    draw_grid(settings.canvas, dimensions)
  })
  
  outline_colour.changed(() =>{
    colour_space()
    if(slider_background.value() === 0)background(background_colour.value())
    draw_grid(settings.canvas, dimensions)
  })

  
  fill(brush_colour.value())
  if(mouse_within_array(settings.canvas.array())) {
    // so far the only defined behaviour for eraser_mode are
    // fully transparent and to background colour
    new_brush.useBrush(
      draw_function = brush_preset6,
      eraser_mode = EraserMode.to_background,
      bg_clr = background_colour.value()
      )
  }
}

let new_canvas = new Level(
  settings.canvas.w/slider_step, 
  settings.canvas.h/slider_step,
);


const is_star = (x, y, w, h) => {
  return x % w === 1 && y % h === 1
          }

const draw_stars = (x, y, w, h) => {
  strokeWeight(outlines_weight.centre)
  rect(
    x * w - outlines_weight.centre / 2,
    y * h - outlines_weight.centre / 2,
    w,
    h
    )
}

const draw_background_grid = (x, y, w, h) => {
  line(0, y * h, settings.canvas.getW() + outlines_weight.outer, y * h)
  line(x * w, 0, x * w,  settings.canvas.getW() + outlines_weight.outer)
}

const draw_centre = (x, y, w, h) => {
  strokeWeight(outlines_weight.centre+1)
  // Filling the centre with a transparent colour
  let current_colour = color(background_colour.value())
  current_colour.setAlpha(0)
  fill(current_colour)
  rect(
      x - outlines_weight.centre / 2,
      y - outlines_weight.centre / 2,
      x,
      y,
    )
  fill(background_colour.value())
  }

const is_orbit = (x, y, w, h) => {
  return x % w === 0 && y % h === 0 
}

const outline_canvas = () => {
  strokeWeight(outlines_weight.outer/2)
  line(0, 0, settings.canvas.getW(), 0)
  line(0, 0, 0, settings.canvas.getH())
  strokeWeight(outlines_weight.outer)
  line(settings.canvas.getW(), 0, settings.canvas.getW(), settings.canvas.getH())
  line(0, settings.canvas.getH(), settings.canvas.getW(), settings.canvas.getH())
}


function draw_grid(canvas_size, obj_dimensions){
  // mandatory inputs are object instances of the Level class
  // no return value
  
  const rect_size = obj_dimensions.getW() === 0 || obj_dimensions.getH() === 0 ?
        new Level(0) :
        new Level(
    canvas_size.getW()/obj_dimensions.getW(),
    canvas_size.getH()/obj_dimensions.getH()
  )

  for(let i = 0; i < obj_dimensions.getW(); i++){
    for(let j = 0; j < obj_dimensions.getH(); j++){
      
      // Outlining individual stars
      if(is_star(i, j, settings.dimensions.getW(), settings.dimensions.getH())){
        
        draw_stars(i, j, rect_size.getW(), rect_size.getH())
       }
      
      if(is_orbit(i, j, settings.dimensions.getW(), settings.dimensions.getH())){
        strokeWeight(outlines_weight.orbit)

      }else{
        strokeWeight(outlines_weight.base)
      }
      
      // Draw the base of the grid
      draw_background_grid(i, j, rect_size.getW(), rect_size.getH())
      translate(-outlines_weight.centre, -outlines_weight.centre)
      draw_background_grid(i, j, rect_size.getW(), rect_size.getH())
      resetMatrix()
        }
    }
  if(slider_background.value() != 0){
  draw_centre(
    settings.canvas.getW() / settings.dimensions.getW(),
    settings.canvas.getH() / settings.dimensions.getH(),
    )
  }
  // canvas outline needs to be twice as bold on the bottom and right 
  // to balance the offset
  outline_canvas()
}

function mouseWheel(event){
  new_brush.changeWeight(
    minimum=1,
    maximum=100,
    event.delta,
    1
  )
  slider_brush.value(new_brush.getWeight())
}


