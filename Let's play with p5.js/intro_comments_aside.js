// Right now I'm writing comments in a programming language called

// JavaScript -> Learn more about JavaScript here:

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide

// A comment is something that is a part of the code. But it's only for humans

// The computer cannot read it. It doesn't do anything

// You can either write a comment using two forward slashes like here

/* Or like this if 
  you want to comment
  across several lines
*/

// Under here we have our first function!

// A function is like a group of code

// Functions will let us do many things with our code!
function setup() {
  gridOutput()
  // size of the picture
  createCanvas(400, 400);
  
  // Fill the background with some colour. 
  // RGB colours have a value between 0 and 255
  
  // EXERCISE: Change the background to red, green or blue.
  
  // hint: the background function can accept three numbers 
  background(150)

  // The const keyword declares a constant 
  // Using the = sign we can assign a value to this constant
  const new_name = "{Erinnya}"
  
  // In this case we are using the built-in variables 'width' and 'height'
  // To calculate the middle of the screen
  
  const x_location = width/2 // This gets me the centre of the drawing
  const y_location = height/2 // Same here! But for the y axis
  
  // Variables can be used as fuction arguments
  const greet = greeting(new_name)
  
  textAlign(CENTER)
  textSize(20)
  text(greet, x_location, y_location)
  describe("")
}

function draw() {
}

//This is a built-in function that does some action on every mouse click

function mouseClicked(){
  // Here variables are defined using a different keyword - let 
  // This allows us to initialise variables without a specific value, unlike the const keyword
  // Because these variables are initialised as "undefined" we have to assign a value to them later
  // In this function there are two different ways of changing the string value of the variables x and y
  // They are different in how they are written, but they are essentially two ways of expressing the same condition
  // One is a combination of the "if" and "else" statements - we use that one for the value of x
  // The other is called a ternary operator - we use that one for the value of y
  
  //____EXERCISE: try swapping these two ways of expressing conditions for x and y______
  // We will talk about conditions and co-called "control flow" later
  // See:
  // https://developer.mozilla.org/en-US/docs/Glossary/Control_flow
  
  // Variable declaration
  let x ; let y;
  
  // If else
  
  // if(condition1 AND condition2) {do something}
  // else {do something different}
  
  if(width >= mouseX && mouseX >= 0){
  // In Javascript, two ampersands - && - stand for "and" - it means that mouseX has to be higher or equal to zero as well as being smaller or equal to the width of the canvas
      x = "X location: " + mouseX
  }else{
      x = "X location is outside of the grid"
  }
  
  /*Ternary operator
    The variable name and the equals sign are followed by the condition
    After the question mark "?" comes the value we assign to the variable if the condition evaluates to true
    After the colon ":" comes the condition we assign to the variable if the condition evaluates to false
  */
  y = height >= mouseY && mouseY >= 0 ? 
      "Y location: " + mouseY :
      "Y location is outside of the grid"
  
  console.log(x, y)

}


// This is a user-defined function that takes in one input - a string
// In this case, we called the input variable 'name' but it could be called anything
// AS LONG as it follows the JavaScript syntax for variable names:

//https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables

// It returns another string using something called concatenation
// That is when we add two strings (pieces of text) together using a + sign

function greeting(name){
  return "Erinnya lyange nze " + name
}
