let path = "tests/doIbreak::"

const format_test = (message) =>{
  return path + message + " ?"
}

class SomeError {
  constructor(some_error, formatted_string=";"){
    this.e = some_error
    this.message = formatted_string
  }
  toString(this_test){return this_test +"E-> "+ this.e + this.message}
  static from(an_error, a_string){ return new SomeError(an_error, a_string)}
}


const run_all_tests = () =>{
  level_tests()
  brush_tests()
}

const level_tests = () =>{
  console.log(path + "(classes/level.js)" + "\n")

  level_get()
  level_set()
  level_sink()
  // static
  level_lowestLevel()
  level_compare()
  level_fromArray()
  console.log("\n")

}

const brush_tests = () =>{
  console.log(path + "(classes/brush.js)" + "\n")

  brush_get()
  brush_set()
  brush_swap()
  brush_setPaint()
  brush_setEraser()
  brush_setPosFromArray()
  brush_objectName()
  // static
  brush_fromArray()
  brush_fromVec2()
  
  console.log("\n")
}

function level_sink(){
  let format = format_test("level_sink()")
  console.log(format)
  try{
    const level1 = new Level(1, 0)
    const level2 = new Level(2, 6)
    console.assert(level1.w === 1 && level1.h === 0)
    console.assert(level2.w === 2 && level2.h === 6)

    level1.sink()
    console.assert(level1.w === 0 && level1.h === 0)
    level2.sink()
    console.assert(level2.w === 2 && level2.h === 2)

    console.log("-> ok!")
  }catch(e){
    const new_error = SomeError.from(e)
    console.log(new_error.toString(format))
  }
}

function level_get(){
  let format = format_test("level_get()")
  console.log(format)
  try{
    const level = new Level(4, 3)
    console.assert(level.getW() > level.getH())
    console.log("-> ok!")
  }catch(e){
    const new_error = SomeError.from(e)
    console.log(new_error.toString(format))
  }
}

function level_set(){
  let format = format_test("level_set()")
  console.log(format)
  try{
    const level = new Level(0)
    level.setW(4)
    level.setH(3)
    console.assert(level.w === 4 && level.h === 3)

    console.log("-> ok!")
  }catch(e){
    const new_error = SomeError.from(e)
    console.log(new_error.toString(format))
  }
}

function level_lowestLevel(){
  let format = format_test("level_lowestLevel()")
  console.log(format)
  try{
    const some_list = []
    for(let i = 5; i >= 0; i--){
      some_list.push(Level.fromArray([i, i+1]))
    }
    let lowest = Level.lowestLevel(some_list)
    console.assert(lowest.w === 0 && lowest.h === 1)
    
    console.log("-> ok!")

  }catch(e){
    const new_error = SomeError.from(e)
    console.log(new_error.toString(format))
  }
}

function level_compare(){
  const format = format_test("level_compare()")
  console.log(format)
    try{
    let some_level = Level.fromArray([0])
    let some_other_level = new Level(0)

    // should fail:
    //console.assert(some_level === some_other_level)
    //let some_empty_level = Level.fromArray()
    //let some_other_empty_level = new Level()
    //let some_undefined_level = new Level(undefined)
    //let some_null_level = new Level(null)
    //let some_string_level = Level.fromArray("hi")
    console.assert(Level.compare(some_level,some_other_level))

    console.log("-> ok!")
    }catch(e){
    const new_error = SomeError.from(e)
    console.log(new_error.toString(format))
  }
}

function level_fromArray(){
  const format = format_test("level_fromArray()")
  console.log(format)
  try{
    let level6 = Level.fromArray([6, 0])    
    let level7 = Level.fromArray([7, 0, 8, 9, 5])
    
    
    console.assert(level6.w === 6 && level6.h === 0)
    console.assert(level7.w === 7 && level7.h === 0)
    
    console.log("-> ok!")
  }catch(e){
    const new_error = SomeError.from(e)
    console.log(new_error.toString(format))
  }
}


function brush_get(){
  const format = format_test("brush_get()")
  console.log(format)
  try{
    let brush = new Brush(x = 200, y = 100, weight = 20)

    console.assert(brush instanceof Brush)
    console.assert(200 === brush.getX())
    console.assert(100 === brush.getY())
    console.assert(20 === brush.getWeight())
    console.assert(String([200, 100]) === String(brush.getPos()))
    console.assert("paint" === brush.getMode().toString())

    console.log("-> ok!")
  }catch(e){
    const new_error = SomeError.from(e)
    console.log(new_error.toString(format)) 
  }
}

function brush_set(){
  const format = format_test("brush_set()")
  console.log(format)
  try{
    let brush3 = new Brush(0, 0, 0)
    console.assert(brush3 instanceof Brush)
    brush3.setX(20)
    brush3.setY(30)
    brush3.setWeight(15)
    console.assert(brush3.x === 20)
    console.assert(brush3.y === 30)
    console.assert(brush3.weight === 15)
    
    console.log("-> ok!")
  }catch(e){
    const new_error = SomeError.from(e)
    console.log(new_error.toString(format)) 
  }
}



function brush_swap(){
  const format = format_test("brush_swap()")
  console.log(format)
  try{
    let brush = new Brush(x = 0, y = 0, weight = 20)
    console.assert(brush.getMode().toString() === "paint")

    brush.mode.swap()
    
    console.assert(brush.getMode().toString() === "erase")

    console.log("-> ok!")
  }catch(e){
    const new_error = SomeError.from(e)
    console.log(new_error.toString(format)) 
  }
}

function brush_setPaint(){
  const format = format_test("brush_setPaint()")
  console.log(format)
  try{
    let brush = new Brush(x = 0, y = 0, weight = 20)

    brush.mode.setPaint(false)
    
    console.assert(brush.getMode().toString() === "inactive")
    
    console.log("-> ok!")

  }catch(e){
    const new_error = SomeError.from(e)
    console.log(new_error.toString(format)) 
  }
}

function brush_setEraser(){
  const format = format_test("brush_setEraser()")
  console.log(format)
  try{
    let brush = new Brush(x = 0, y = 0, weight = 20)

    brush.mode.setPaint(false)
    brush.mode.setEraser(true)
    console.assert(brush.getMode().toString() === "erase")
    
    console.log("-> ok!")
  }catch(e){
    const new_error = SomeError.from(e)
    console.log(new_error.toString(format)) 
  }
}

function brush_setPosFromArray(){
  const format = format_test("brush_setPosFromArray()")
  console.log(format)
  try{
    let brush = new Brush(x = 0, y = 0, weight = 20)

    brush.setPosFromArray([20, 10])
    console.assert(brush.x === 20)
    console.assert(brush.y === 10)

    console.assert(String(brush.position) === String([20, 10]))
    
    console.log("-> ok!")
  }catch(e){
    const new_error = SomeError.from(e)
    console.log(new_error.toString(format)) 
  }
}

function brush_fromVec2(){
  const format = format_test("brush_fromVec2()")
  console.log(format)
  try{
    let brush2 = Brush.fromVec2(createVector(120, 40))

    console.assert(brush2 instanceof Brush)
    console.assert(String(brush2.position) === String(new Brush(120, 40).position))


    console.log("-> ok!")
  }catch(e){
    const new_error = SomeError.from(e)
    console.log(new_error.toString("brush_tests1()")) 
  }
}

function brush_fromArray(){
  const format = format_test("brush_fromArray()")
  console.log(format)
  try{
    let brush2 = Brush.fromArray([15, 20])    
    console.assert(brush2 instanceof Brush)
    console.assert(brush2.weight === 1)
    console.assert(String(brush2.position) === String([15, 20]))
    
    console.log("-> ok!")
  }catch(e){
    const new_error = SomeError.from(e)
    console.log(new_error.toString(format)) 
  }
}

function brush_objectName(){
  const format = format_test("brush_objectName()")
  console.log(format)
  try{
    let brush = new Brush(x = 0, y = 0, weight = 20)
    console.assert(brush.objectName() === "Some brush")
    
    brush.setObjectName("Inking brush")
    
    console.assert(brush.objectName() === "Inking brush")

    console.log("-> ok!")
  }catch(e){
    const new_error = SomeError.from(e)
    console.log(new_error.toString(format)) 
  }
}
