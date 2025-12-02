// Loops

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration

// To make use of an iterable, there has to be a way to iterate through it
let entries = ["Hello", "p5", ".", "js"]

const search_array = (haystack, needle) => {
  for(let index = 0; index < haystack.length; index++ ){
  if(haystack[index] === needle){return [haystack[index], index]}
  }
  throw new Error("search_array()E ")
}

// Loops can be labeled

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label
let counter = 0;

on_full_stop: while(counter < entries.length) {
  if(entries[counter] === "."){
    console.log("Breaking out of a labeled while loop")
    break on_full_stop
    }
  console.log(entries[counter])
  counter++
}

for(let index = 0; index <= entries.length; index++ ){
  if(entries[index] === "."){
    console.log("Breaking out of an unlabeled for loop")
    break
  }
  console.log(entries[index])
}


// Loops can be nested

function setup() {
  createCanvas(400, 400);
  fill(0, 255, 0)
  stroke(0, 0, 255)
  background(150)
  const table = {columns: 10, rows: 10}
  const rectangle = {a: height/table.rows, b: height/table.rows};
  let grid = []
  outer: for(let i = 0; i < table.columns; i++ ){
    //if (i === 5) {break}
    inner: for(let j = 0; j < table.rows; j++ ){
      grid.push([i*rectangle.a, j*rectangle.b])
      rect(i*rectangle.a, j*rectangle.b, rectangle.a, rectangle.b)
    }
  }
  console.assert(grid.length === table.columns*table.rows, "grid not was not filled fully")
}


function mouseClicked(){
  let x = width >= mouseX && mouseX >= 0 ?
      "X location: " + mouseX :
      "Y location is outside of the grid "
  let y = height >= mouseY && mouseY >= 0 ? 
      "Y location: " + mouseY :
      "Y location is outside of the grid"
  console.log(x, y)
}