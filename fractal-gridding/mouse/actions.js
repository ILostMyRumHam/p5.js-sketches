function changeOnMousewheel(minimum, maximum, current, mouse_event_delta, value){
  let output = current
  if (isNaN(mouse_event_delta)) {
    throw new Error("sliderFunctions::addOnMousewheel()E -> NaN")
  }else if (mouse_event_delta <= 0) {
    output -= value
  }else{
   output += value
  }
  output = constrain(output, minimum, maximum)
  return output
}