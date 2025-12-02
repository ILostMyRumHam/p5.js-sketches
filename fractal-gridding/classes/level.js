
class Level  {
  constructor(some_width, some_height=some_width){
    this.w = some_width
    this.h = some_height
    if(this.w === 0){ return
    }else if(!this.w) throw new Error(`Level.w is ${this.w}`)
  }
  getW(){return this.w}
  getH(){return this.h}
  setW(some){this.w = some}
  setH(some){this.h = some}
  array(){return [this.w, this.h]}
  lower(){return Math.min(this.w, this.h)}
  greater(){return Math.max(this.w, this.h)}
  sink(){
    try{
      let min_val = Math.min(this.w, this.h)
      this.w = min_val
      this.h = min_val
    }catch(e){
      let some_error = `Level.sink(${JSON.stringify(this)})E -> ${e}`
      throw new Error(some_error + "\n")
    }
   }
  toAverage() {
    let avg = (this.w+this.h)/2
    this.w = avg
    this.h = avg
  }
  average() {return (this.w+this.w)/2}
  toString(){
    return `Level: (${this.w} ${this.h})`
  }
  static lattice(some_lowest_level, other_lowest_level) {
    return Math.abs(some_lowest_level, other_lowest_level)
  }
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
      if(array.every(x = (y) => typeof y === "number") === false) throw "array value NaN"
      
      if(array.length < 1){
        throw "empty array"}
      else if(array.length === 1){
        return new Level(array[0])
      }else{
      return new Level(array[0], array[1])
      }
      
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