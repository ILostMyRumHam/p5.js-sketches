
class BrushMode {
  constructor(paint = true, eraser = false){
    this.paint = paint
    this.eraser = eraser
  }
  get_paint(){return this.paint}
  get_eraser(){return this.eraser}
  swap(){this.paint = !this.paint; this.eraser = !this.eraser}

  set_paint(new_value){
    if (typeof(new_value) === "boolean"){
      this.paint = new_value
    }
  }
  set_eraser(new_value){
    if (typeof(new_value) === "boolean"){
      this.eraser = new_value
    }
  }
  str_repr(){
    if (this.paint === true){
      return "paint"
    }else if (this.eraser === true){
      return "eraser"
    }else{
      return "inactive"
    }
  }
}

class Brush {
  constructor(x, y, weight = 1){
    this.x = x
    this.y = y 
    this.weight = weight
    this.position = [this.x, this.y]
    this.name = "Brush"
    this.mode = new BrushMode()
  }
  static from_pos(arr, weight=1){
    try{
      if (arr.length === 2){
        let brush = new Brush(arr[0],arr[1],weight)
        return brush
      }else{
        throw("Incorrect array length")
      }
    }catch{
      console.log("Error: Brush not initialised due to incorrect array length.")
      throw new Error("Unexpected input array.")
    }
  }
  static from_array(arr){
    try{
      if (arr.length === 3){
      let brush = new Brush(arr[0],arr[1],arr[2])
      return brush
        }else{
          throw new Error()
        }
    }catch{
     console.log("Error: Brush not initialised due to incorrect array length.")
     throw new Error("Unexpected input array.")
    }    
  }
  static from_Vec2(vector2_object, weight = 1){
    if(typeof(vector2_object) === "object"){
      try{
        let is_vector = vector2_object.toString().split(" ")[0]
        if (is_vector === "p5.Vector"){
          let brush = new Brush(vector2_object.x, vector2_object.y, weight)
          brush.position = vector2_object
          return brush
          }else{
            throw("Unexpected input object")
          }
        }catch{
        throw new Error("Unexpected input object. The from_Vec2 method expects a two-dimensional p5.Vector as an input.")
        }
    }
  }
  object_name(){return this.name}
  set_object_name(new_name){this.name = new_name}

  change_weight(minimum, maximum){
  // Follow mouse movement
  this.x += (mouseX - this.x) * 0.05;
  this.y += (mouseY - this.y) * 0.05;

  // Map mouse position to weight
  this.weight = map((mouseX+mouseY)/2, 0, (width+height)/2, minimum, maximum);
  this.weight = constrain(this.weight, minimum, maximum);

  return this.weight
  }
  str_repr(){
   return `
  X: ${this.x}
  Y: ${this.y}
  Weight: ${this.weight}
  Position: [${this.position}]
  Object name: ${this.object_name()}
  Mode: ${this.mode.str_repr()}
`
  }
}


function brush_tests(){
  console.log("brushes/Brush.js::brush_tests()")
  let brush1 = new Brush(x = 200, y = 100, weight = 20)
  
  let brush2 = Brush.from_pos([10, 20])
  brush2.set_object_name("New Brush")
  brush2.mode.swap()
  
  let brush3 = Brush.from_array([30, 50])
  brush3.set_object_name("Ink")
  brush3.mode.set_paint(false)

  let brush4 = Brush.from_Vec2(new p5.Vector(120,40))
  brush4.set_object_name("Vector")
    
  const arr = [brush1, brush2, brush3, brush4]
  for (let i of arr){
    console.log(i.str_repr())
  }

}

function to_do(){
  console.log("brushes/Brush.js::to_do()")
   console.log( `
  TO DO:
  - Brush feathering
  - Handling erase/draw within the data structure
  - Display brush weight clearer
  - Make up for lost frames in sudden mouse movements
  - Static constructor from a vector object
`)
}