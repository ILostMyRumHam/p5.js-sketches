function mouse_within(x, y){
  if (mouseX <= 0 || mouseY <= 0 || mouseX >= x || mouseY >= y) return false
  else return true
}

function mouse_within_array(a){
  if (mouseX <= 0 || mouseY <= 0 || mouseX >= a[0] || mouseY >= a[1]) return false
  else return true
}