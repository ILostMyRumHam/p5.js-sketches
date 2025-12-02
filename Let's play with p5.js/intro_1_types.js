// Source:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types

function setup() {
  createCanvas(400, 400);
  
// Let's have a look at initialising some variables of different data types.

//--- Primitive data types ---

// Boolean
const truthy = true;
const falsy = false;

// Undefined
let undef;

// Number
const integer = 40
const floating_point_number = PI;

// BigInt
const large_number = Number.MAX_SAFE_INTEGER;

// String
const string = "Hello p5.js"

// Symbol
const symbolise = Symbol("unique");

// Null
const nothing = null;

// null behaves strangely. You might expect its type to be null.
  
// Try running the file and opening the console to check. For more information:
// https://developer.mozilla.org/en-US/docs/Glossary/Null
  
//--- Complex data types ---
  
// Complex data types allow us to store many values under one name


// Object literals
const new_point = {x: width/2, y: height/2}

const new_colour = {r: 255, g: 0, b: 0}

// Arrays literals are also objects, but we access the values inside of them differently
const background_colours = [0, 0, 255]

const new_array = [
                truthy, 
                falsy,
                undef, 
                integer, 
                floating_point_number, 
                large_number,
                string,
                symbolise,
                nothing,
                new_point,
                new_colour,
                background_colours,
              ]
  
  log_array_data(new_array)
  
  // We can now use these new variables in our functions
  
  // Here we get the colour blue from the three values inside of an array we defined earlier
  
  // The values inside of the array are accessed in an operation called indexing:
  
  // In JavaScript, indexing starts from 0. The first element is at index 0, second at index 1
  
  // etc. The last index will always be equal to array.length - 1
  background(background_colours[0], background_colours[1], background_colours[2])
  
  // To get the colour red, we can get the values from an object literal we defined earlier
  
  // We get these values by using something called dot notation
  
  // By writing the name of the variable, followed by a dot, and then the name of the property
  
  // This allows us to access the value associated with that property of the object
  fill(new_colour.r, new_colour.g, new_colour.b)
  
  ellipse(new_point.x, new_point.y, integer*10, PI*10)
}

function draw(){
  // Try things here!
}

// For now, we don't need to worry too much about these functions below

// All they do is log the variables defined above to the console

function log_data(input_data){
  let datatype = typeof(input_data)
  if (datatype === "object"){
    input_data = JSON.stringify(input_data)
  }else{
    input_data = String(input_data)
  }
  console.log(`${input_data} : ${datatype}`)
}

function log_array_data(input_array){
  input_array.forEach(log_data)
  console.log("array[] : " + String(typeof(input_array)))
}