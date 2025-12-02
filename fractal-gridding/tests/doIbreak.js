const path = "tests/doIbreak::"
      
class SomeError {
  constructor(some_error, formatted_string=";"){
    this.e = some_error
    this.message = formatted_string
  }
  show(this_test){return path + this_test +"E-> "+ this.e + this.message}
  static from(an_error, and_string){ return new SomeError(an_error, and_string)}
}

function run_all_tests(){
  test_levels1()
  test_levels2()
}

const format_test = (message) =>{
  return path + message
}

function test_levels1(){
  let format = path + "test_levels1()"
  console.log(format)
  try{
    const level1 = new Level(1)
    const level2 = new Level(2, 6)
    const level3 = new Level(4, 3)
    console.assert(level1.w === 1 && level1.h === 1)
    console.assert(level2.w === 2 && level2.h === 6)
    console.assert(level3.w === 4 && level3.h === 3)

    level1.sink()
    console.assert(level1.w === 1 && level1.h === 1)
    level2.sink()
    console.assert(level2.w === 2 && level2.h === 2)
    level3.w = level3.lower()
    console.assert(level3.w === 3 && level3.h === 3)

    console.log(format + "-> ok!")
  }catch(e){
    const new_error = SomeError.from(e)
    console.log(new_error.show("test_levels1()"))
  }
}

function test_levels2(){
  const format = format_test("test_levels2()")
  console.log(format)
  try{
    let level4 = new Level(50, 20)
    console.assert(level4.w === 50 && level4.h === 20)
    level4.average()
    console.assert(level4.w === 35 && level4.h === 35)
    
    let level5 = new Level(1.3, 4.1)
    console.assert(level5.w.toFixed(2) === "1.30" && level5.h.toFixed(2) === "4.10")
    level5.average()
    console.assert(level5.w.toFixed(2) === "2.70" && level5.h.toFixed(2) === "2.70")

    console.log(format + "-> ok!")
    
  }catch(e){
    const new_error = SomeError.from(e)
    console.log(new_error.show("test_levels2()"))

  }
}