// Inspired by Fractal Gridding
// SOURCE: https://www.fractalgridding.com/ by Ecy Femi King and Dr. Rod King

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
  + [] UI for switching brush presets
  `)
}
const new_brush = new Brush(x = 0, y = 0, weight = 10)
const brush_presets = load_presets()

const settings = {
  canvas:  new Level(600, 400),
  dimensions: new Level(3,3),
}


let slider_background; let slider_brush; 
let background_colour; let outline_colour; let brush_colour
const to_squares = false;
const is_stair_grid = false

const max_level = 2;
const slider_step = 1;

const outlines_weight = {
  base: 1,
  segments: 3,
  centre: 5,
  outer: 20,
}

async function setup() {
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
  
  await brush_presets
  slider_brush = createSlider(0, 100, new_brush.getWeight(), 1)
  slider_brush.size(width/4)
}

function draw() {
  // no return value
  new_brush.setWeight(slider_brush.value())
  strokeWeight(outlines_weight.base)
  const colour_space = () => {
    strokeWeight(outlines_weight.base)
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
    draw_grid(settings.canvas, dimensions, is_stair_grid)
  })
  background_colour.changed(() =>{
    colour_space()
    background(background_colour.value())
    draw_grid(settings.canvas, dimensions, is_stair_grid)
  })
  
  outline_colour.changed(() =>{
    colour_space()
    if(slider_background.value() === 0)background(background_colour.value())
    draw_grid(settings.canvas, dimensions, is_stair_grid)
  })

  
  fill(brush_colour.value())
  
  if(mouse_within_array(settings.canvas.array())) {
    // so far the only defined behaviour for eraser_mode are
    // fully transparent and to background colour
    new_brush.useBrush(
      draw_function = brush_preset0,
      eraser_mode = EraserMode.to_background,
      bg_clr = background_colour.value()
      )
  }
}

const new_canvas = new Level(
  settings.canvas.getW()/slider_step, 
  settings.canvas.getH()/slider_step,
);


// This mess really shouldn't be one function
function draw_grid(canvas_size, obj_dimensions, make_stairs=false){
  // mandatory inputs are object instances of the Level class
  // no return value

  const rect_size = obj_dimensions.getW() === 0 || obj_dimensions.getH() === 0 ?
        new Level(0) :
        new Level(
    canvas_size.w/obj_dimensions.getW(),
    canvas_size.h/obj_dimensions.getH()
  )

  for(let i = 0; i < obj_dimensions.getW(); i++){
    for(let j = 0; j < obj_dimensions.getH(); j++){
      if(Math.abs(i - j) === 1 && make_stairs === true) break

      strokeWeight(outlines_weight.base)

      // Outlining individual stars
      if(i % settings.dimensions.getW() === 1 &&
          j % settings.dimensions.getH() === 1
          )
        {
        strokeWeight(outlines_weight.centre)
        rect(
            i * rect_size.getW(),
            j*rect_size.getH(),
            rect_size.getW(),
            rect_size.getH()
            )
        strokeWeight(outlines_weight.base)
        }
      else if(i % settings.dimensions.getW() === 0 && j % settings.dimensions.getH() === 0){
        if(i === settings.dimensions.getW() &&
           j === settings.dimensions.getH()
          )
        {
          strokeWeight(outlines_weight.base)
        }
        else 
        {
          strokeWeight(outlines_weight.segments)
        }
      }
      line(0, j*rect_size.getH(), settings.canvas.getW(), j*rect_size.getH())
      line(i*rect_size.getW(), 0, i*rect_size.getW(), settings.canvas.getH())
    }
  }
    // Filling the centre with a transparent colour
  let current_colour = color(background_colour.value())
  current_colour.setAlpha(0)
  fill(current_colour)
  
  if(slider_background.value() != 0){
    strokeWeight(outlines_weight.centre)

    rect(
        settings.canvas.getW()/settings.dimensions.getW(),
        settings.canvas.getH()/settings.dimensions.getH(),
        settings.canvas.getW()/settings.dimensions.getW(),
        settings.canvas.getH()/settings.dimensions.getH(),
        )
  }
  strokeWeight(outlines_weight.outer)
  rect(
      0,
      0,
      settings.canvas.getW(),
      settings.canvas.getH(),
    )

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

