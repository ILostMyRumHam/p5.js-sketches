/* 
As we build larger programmes, we will inevitably run into errors and bugs 

Not all errors are bad though; sometimes they signal exactly what you need to fix in the programme.

If we expect some error to happen, we can get a hold of it early

Let's look at error handling and iterators.

We'll write a short script that will display a number represented by text on each mouse click

For more information visit:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling
*/


// First we need to group our numbers together so that we can access the values easily

// Note the semicolon between each number and word and the comma after each pairing

// Try adding more numbers after 10!
const ennamba_luganda = {
  moko: "emu",
  mibale: "bbiri",
  misatu: "ssatu",
  mine: "nnya",
  mitano: "ttaano",
  motoba: "mukaaga",
  sambo: "musanvu",
  mwabe: "munaana",
  libwa: "mwenda",
  zomi: "kkumi",
}

let current_language = selectLanguage("Luganda")

// Try uncommenting the line below:
//current_language = selectLanguage("Lingala")



// Turning the object with all of the numbers into an iterator will let us go through them one by one
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators


let number_iterator = Iterator.from(current_language)

function setup() {
  createCanvas(400, 400);
  // Background colour
  background(220);
  // Text colour
  fill(255, 0, 255)

  textSize(40)
  textAlign(CENTER)
  text("Click to start counting", width/2, height/2)
  describe("Count from one to ten by clicking the mouse button.")
}


function mouseClicked(){
  background(220)
  // The 'try' block lets our programme check if the code inside can continue without error
  try{
    let current_number = number_iterator.next().value
    // If there is no next number, that means we got to the end of the iterator
    // By using throw, we can signal our programme to not continue further because there are no more numbers to display
    
    // The below expression could be roughly translated into english as:
    // "If there is no value inside the current_number variable, skip all remaining code and go to the nearest catch block"
    if (!current_number) throw RangeError
    // If there is a meaningful value inside the variable, we display it on the screen
    text(current_number, width/2, height/2)
    
  // The 'catch' block lets our programme handle any errors encountered within the previous 'try' block
  }catch(RangeError){
    // Instead of stopping the programme at the last number, we can define custom behaviour for what happens when we reach the last value of our iterator
    // If we get to the final number, we reset the iterator by transforming the numbers object into an Iterator and assigning it to the number_iterator variable
    number_iterator = Iterator.from(Object.values(current_language))
    text("Click to restart", width/2, height/2)
  }
}

function selectLanguage(olulimi_lwange){
  switch (olulimi_lwange.toLowerCase()){
    case "luganda": return Object.values(ennamba_luganda)
    case "lingala": return Object.keys(ennamba_luganda)
      
    default: throw new Error(`selectLanguage("${name}") -> language not found in current scope`)
  }
}