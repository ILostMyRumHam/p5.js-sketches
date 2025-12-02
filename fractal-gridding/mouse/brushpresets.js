// see classes/brush.js::Brush:use_brush
function load_presets(){
  const preset_array = [
    brush_preset0,
    brush_preset1,
    brush_preset2,
    brush_preset3,
    brush_preset4,
    brush_preset5,
    brush_preset6,
  ]
  return preset_array
}
const brush_preset0 = (some_brush) => {
  rectMode(CENTER)
  square(some_brush.getX(), some_brush.getY(), some_brush.getWeight(),some_brush.getWeight()/5);
  rectMode(CORNER)
}
//https://p5js.org/reference/p5/beginShape/
const brush_preset1 = (some_brush) => {
  beginShape()
  vertex(some_brush.getX() + some_brush.getWeight(), some_brush.getY() + some_brush.getWeight());
  vertex(some_brush.getX() - some_brush.getWeight(), some_brush.getY() + some_brush.getWeight());
  vertex(some_brush.getX() + some_brush.getWeight(), some_brush.getY() - some_brush.getWeight());
  vertex(some_brush.getX() - some_brush.getWeight(), some_brush.getY() - some_brush.getWeight());
  endShape(CLOSE)
}
//https://p5js.org/reference/p5/endShape/

const brush_preset2 = (some_brush) => {
  beginShape()
  vertex(some_brush.getX() + some_brush.getWeight(), some_brush.getY() + some_brush.getWeight());
  vertex(some_brush.getX() - some_brush.getWeight(), some_brush.getY() + some_brush.getWeight());
  vertex(some_brush.getX() + some_brush.getWeight(), some_brush.getY() - some_brush.getWeight());
  endShape(CLOSE)

}

const brush_preset3 = (some_brush) => {
  beginShape()
  vertex(some_brush.getX() - some_brush.getWeight(), some_brush.getY() - some_brush.getWeight());
  vertex(some_brush.getX() - some_brush.getWeight(), some_brush.getY() + some_brush.getWeight());
  vertex(some_brush.getX() + some_brush.getWeight(), some_brush.getY() - some_brush.getWeight());
  endShape(CLOSE)

}

const brush_preset4 = (some_brush) => {
  beginShape()
  vertex(some_brush.getX() + some_brush.getWeight(), some_brush.getY() + some_brush.getWeight());
  vertex(some_brush.getX() + some_brush.getWeight(), some_brush.getY() - some_brush.getWeight());
  vertex(some_brush.getX() - some_brush.getWeight(), some_brush.getY() - some_brush.getWeight());
  endShape(CLOSE)

}

const brush_preset5 = (some_brush) => {
  ellipseMode(CENTER)
  ellipse(some_brush.getX(), some_brush.getY(), some_brush.getWeight());
  ellipseMode(CORNER)
}

const brush_preset6 = (some_brush) => {
  ellipseMode(CENTER)
  ellipse(some_brush.getX(), some_brush.getY(), some_brush.getWeight(), some_brush.getWeight()*1.5)
  ellipseMode(CORNER)
}
