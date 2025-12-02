const EraserMode = Object.freeze({
  fully_transparent: "ft",
  to_background: "bg",
});

class BrushMode {
  constructor(paint = true, eraser = false){
    this.paint = paint
    this.eraser = eraser
  }
  getPaint(){return this.paint}
  getEraser(){return this.eraser}
  swap(){this.paint = !this.paint; this.eraser = !this.eraser}

  setPaint(new_value){
    if (typeof(new_value) === "boolean"){
      this.paint = new_value
    }
  }
  setEraser(new_value){
    if (typeof(new_value) === "boolean"){
      this.eraser = new_value
    }
  }
  toString(){
    if (this.paint === true){
      return "paint"
    }else if (this.eraser === true){
      return "erase"
    }else{
      return "inactive"
    }
  }
  is(value){
    return this.toString() === value
    }
}

class Brush {
  constructor(x, y, weight = 1){
    this.x = x
    this.y = y 
    this.weight = weight
    this.position = [this.x, this.y]
    this.name = "Some brush"
    this.mode = new BrushMode()
  }
  // Constructor variants
  static fromArray(array){
    try{
      if(array.every((value) => typeof value === "number") === false) throw "array value NaN"

      if(array.length === 1){
        return new Brush(array[0], array[0])
      }else if(array.length === 2){
        return new Brush(array[0], array[1])
      }else{
        return new Brush(array[0], array[1], array[2])

      }
    }catch(e){
      let some_error = `Brush.from_array(${array})E -> ${e}`
      throw new Error(some_error)
    }    
  }
  // p5.jsonly
  static fromVec2(v, weight = 1){
      try{
        if(v instanceof p5.Vector){
          let brush = new Brush(v.x, v.y, weight)
          return brush
          }else{
            throw("Unexpected input object")
          }
        }catch(e){
          let some_error = `Brush.from_Vec2(${JSON.stringify(v)})E -> ${e}`
          throw new Error(some_error + "\n")
        }         
  }
  // Debugging
  static info(){ return Object.getOwnPropertyNames(this) }
  info(){ return Object.getOwnPropertyNames(this) } 

  // Setters and getters
  setPos(x, y){this.position = [x, y]; this.x = x; this.y = y}
  getPos(){return this.position}
  
  setPosFromArray(array){
    if(array.every((value) => typeof value === "number") === false) throw "array value NaN"

    try{
      if (array.length === 2){
        this.position = array; 
        this.x = array[0]; 
        this.y = array[1]
      }else{
        throw("Incorrect array length")
      }
    }catch(e){
        let some_error = `some_brush.set_pos_from_array(${array})E -> ${e}`
        throw new Error(some_error)    }
  }
  // p5.jsonly
  setPosFromVec2(v){
      try{
        if(v instanceof p5.Vector){
          this.position = [v.x, v.y];
          this.x = v.x;
          this.y = v.y
        }else{
            throw("Unexpected input object")
          }
        }catch(e){
          let some_error = `Brush.from_array(${JSON.stringify(v)})E -> ${e}`
          throw new Error(some_error + "\n")
        }      
  }
  
  setX(new_value){this.setPos(new_value, this.y)}
  getX(){return this.x}
  
  setY(new_value){ this.setPos(this.x, new_value)}
  getY(){return this.y}
  
  setWeight(new_value){this.weight = new_value}
  getWeight(){return this.weight}
  
  setMode(new_value){this.mode = new_value}
  getMode(){return this.mode}
  
  objectName(){return this.name}
  setObjectName(new_name){this.name = new_name}
  
  // Weight adjustment
  changeWeight(minimum, maximum, mouse_event_delta, value){
  if (isNaN(mouse_event_delta)) {
    return this.weight
  }else if (mouse_event_delta <= 0) {
    this.weight -= value
  }else{
    this.weight += value
  }
  this.weight = constrain(this.weight, minimum, maximum)
  return this.weight
  }
  // Debugging info
  toString(){
   return `
  x: ${this.x}
  y: ${this.y}
  Weight: ${this.weight}
  Position: [${this.position}]
  Object name: ${this.object_name()}
  Mode: ${this.mode.toString()}
`
  }

  // p5.jsonly
  useBrush(draw_function, 
            eraser_mode=EraserMode.fully_transparent, 
            bg_clr = color(0),
           )
  {
  noStroke();
  if(this.mode.is("erase")){
    switch(eraser_mode){
      case EraserMode.fully_transparent:
        erase(255);
        break;
      case EraserMode.to_background:
        fill(bg_clr)
        break;
      default:
        throw new Error("eraser_mode not found")
    }
  }
  if(mouseIsPressed){
      this.setPosFromArray([mouseX, mouseY])
      draw_function()
  }
  noErase()
  }
}
