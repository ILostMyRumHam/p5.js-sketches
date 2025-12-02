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
  `)
}
let new_brush = new Brush(x = 0, y = 0, weight = 10)

let settings = {
  canvas:  new Level(400, 400),
  dimensions: new Level(3,3),
}

let slider_background; let slider_brush; 
let background_colour; let outline_colour;
const to_squares = false;
const max_level = 2;
const slider_step = 1;
const outline_weight = 5


function setup() {
  // first some general tests
  run_all_tests()
  TO_DO()
  // then the canvas, sliders, and colour elements
  // no return value
  if(to_squares) Level.sinkAll(Object.values(settings))
  createCanvas(settings.canvas.getW(), settings.canvas.getH());
  slider_background = createSlider(0, max_level, 0 , slider_step)
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
  resetMatrix()
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
    if(!mouse_within()) new_brush.setWeight(slider_brush.value())

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
      draw_function = new_brush_shape,
      eraser_mode = EraserMode.to_background,
      bg_clr = background_colour.value()
      )
  }
}

const new_brush_shape = () =>{
ellipse(
        new_brush.getX(),
        new_brush.getY(),
        new_brush.getWeight(),
        new_brush.getWeight()*1.5,
        )
}

let new_canvas = new Level(
  settings.canvas.w/slider_step, 
  settings.canvas.h/slider_step,
);

const stairs = (x, y) => {
  return Math.abs(x-y) === 1
}

const stars = (x, y, z) => {
    return x % z === 1 && y % z === 1 
}

function draw_grid(canvas_size, obj_dimensions, make_stairs=false){
  // mandatory inputs are object instances with fields w and h that are numbers
  // no return value

  const rect_size = obj_dimensions.getW() === 0 && obj_dimensions.getH() === 0 ?
        new Level(0) :
        new Level(
    canvas_size.w/obj_dimensions.getW(),
    canvas_size.h/obj_dimensions.getH()
  )

  for(let i = 0; i < obj_dimensions.getW(); i++){
    for(let j = 0; j < obj_dimensions.getH(); j++){
      if(i % settings.dimensions.getW() === 0 && j % settings.dimensions.getH() === 0){
        strokeWeight(outline_weight)
          rect(
            i * rect_size.getW(),
            j*rect_size.getH(),
            rect_size.getW()*settings.dimensions.getW(),
            rect_size.getH()*settings.dimensions.getH(),
            )
      }
      strokeWeight(1)
      line(0, j*rect_size.getH(), settings.canvas.getW(), j*rect_size.getH())
      line(i*rect_size.getW(), 0, i*rect_size.getW(), settings.canvas.getH())

      if(stars(i, j, settings.dimensions.average())){
        strokeWeight(outline_weight)
        rect(
            i * rect_size.getW(),
            j*rect_size.getH(),
            rect_size.getW(),
            rect_size.getH()
            )

      }

    }
  }

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

