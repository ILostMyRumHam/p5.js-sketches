// () => [number].length === 3
const muvuluugiriro_erangi = () => {
  /*Return an array of three pseudo-random values between 0 and 255*/
  return [
    Math.floor(Math.random()*256),
    Math.floor(Math.random()*256),
    Math.floor(Math.random()*256)
  ]
}


const Okuwandiika = {
  /* storing writing in an object */
  emu: "Weebale nnyo, ",
  bbiri: "Ab'emikwano abaagalwa ennyo",
  ssatu: "!"
}

const Erangi = {
  /*storing arrays representing RGB colours*/
  emu: muvuluugiriro_erangi(),
  bbiri: muvuluugiriro_erangi(),
  ssatu: muvuluugiriro_erangi(),
  nnya: muvuluugiriro_erangi(),
  ttano: muvuluugiriro_erangi(),
  mukaaga: muvuluugiriro_erangi(),
  musanvu: muvuluugiriro_erangi(),
  munaana: muvuluugiriro_erangi(),
  mwenda: muvuluugiriro_erangi(),
  kumi: muvuluugiriro_erangi(),
}

// (number, [number]) => [number]
const subtract_from = (y, array) =>{
  // The map method on an array lets us define a function to call on every value of the array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  let new_array = array.map(x => x-y)
  // Equivalent to
  /*
  let new_array = []
  for(let i of array){
    new_array.push(y-i)
  }
  */
  console.assert(array.length === new_array.length, 
                 `subtract_from()E -> ensobi! array.length != new_array.length`
                )
  return new_array
}

// object => String
const okwoleka = (ebigambo) =>{
  let ekyapa = typeof(ebigambo)
  if (ekyapa != "object"){
    throw new Error(`okwoleka()E -> ensobi! ekyapa:${ekyapa} NOT object`)
  }
  let buwandiike = ""
  for(let i of Object.values(ebigambo)){
    buwandiike += String(i).toLowerCase().replaceAll("e", "3")
    buwandiike += "\n"
  }
  return buwandiike
  }
// [number] => object
const to_p5_Color = (some_value) => {try{return color(some_value)}catch(ensobi){
  throw new Error("to_p5_Color()E -> ensobi! wrapper around 'color()'")}
  }

let new_slider;
let topeka = Object.values(Erangi)

function setup() {
  describe("TODO")
  createCanvas(400, 400);

  new_slider = createSlider(0, topeka.length-1)
  new_slider.position(width/3, height-50)
  textAlign(CENTER)
  textSize(25)
  stroke(0)
  describe("change the colour scheme using the slider")
  describeElement("text at the bottom of the canvas", okwoleka(Okuwandiika))
}

// () => ()
function draw() {
  let erangi = topeka[new_slider.value()]
  background(to_p5_Color(erangi))
  fill(to_p5_Color(subtract_from(255, erangi)))
  text(
    okwoleka(Okuwandiika),
    width/2,
    height/2,)
}