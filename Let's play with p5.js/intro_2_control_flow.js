// Control flow

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling

// Here we are initialising some objects that we can refer to later to draw our animation.
let ellipse_location = {x: 200, y: 200}
let ellipse_location_x = 200
let ellipse_location_y = 200

const ellipse_dimensions = {WIDTH: 100, HEIGHT: 100}
let movement_speed = {x: 5, y : 5}

const canvas = {WIDTH: 640, HEIGHT: 480};
const ellipse_colour = {RED: 255, GREEN: 0, BLUE: 0};
const background_colour = {RED: 0, GREEN: 255, BLUE: 0};


function setup() {
  // The setup function only runs once at the beginning of the programme.
  createCanvas(canvas.WIDTH, canvas.HEIGHT)
  background(background_colour.RED, background_colour.GREEN, background_colour.BLUE);
  fill(ellipse_colour.RED, ellipse_colour.GREEN, ellipse_colour.BLUE)
  describe("A ball bouncing around the screen in the style of an old-school screensaver.")
}

function draw() {
  /*
  The draw function runs repeatedly.
  
  This means that every time we want to animate something, it needs to happen here.
  */
  // We start by redrawing the background for every frame.
  background(background_colour.RED, background_colour.GREEN, background_colour.BLUE);
  
  // Then we draw the updated location of the ellipse over that background.
  ellipse(ellipse_location.x, ellipse_location.y, ellipse_dimensions.WIDTH, ellipse_dimensions.HEIGHT)
  
  // Here we use a user-defined function to check whether we should change the direction.
  movement_speed.x = check_direction(ellipse_location.x, movement_speed.x, width, ellipse_dimensions.WIDTH/2)
  // Same here just for the y axis. The check_direction function is defined below.
  movement_speed.y = check_direction(ellipse_location.y, movement_speed.y, height, ellipse_dimensions.HEIGHT/2)
  
  // And here we update the object that stores the location of the ellipse.
  ellipse_location.x += movement_speed.x
  ellipse_location.y += movement_speed.y
}


function check_direction(axis_of_movement, axis_speed, axis_max, border_buffer){
  /*This function has a lot of inputs. 
  
  This lets us reuse it for both width and height while keeping the function body concise.
  
  Here we use the border_buffer input variable to make sure we update the speed 
  depending on the outline of the ellipse rather than its center.
  
  The || operator means 'or' - for the if statement to evaluate as true, either of the conditions on each side of this operator must evaluate to true
  */
  if (axis_of_movement <= border_buffer || axis_of_movement >= axis_max - border_buffer){
    // By negating the speed using the minus operator we can reverse the direction.
    axis_speed = -axis_speed
  }
  return axis_speed
}