// Game of Critters
let grid = []
let rectangle_height = 40;
let rectangle_width = 40;
let columns; let rows;
let cellR = (rectangle_height + rectangle_width) / 2;
let is_cell_living = 0

function flip_state(state) {
    if (state === 1) {
        return 0;
    } else
        return 1;
}

function outerGrid() {
    stroke(255, 0, 0)
    strokeWeight(cellR / 20)
    fill(0, 0)
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            rect(i * cellR, j * cellR, rectangle_width, rectangle_height);
        }
    }
}

function setup() {
    // Generate the outer grid with a red outline and separate it into 2x2 cells. At the start, there are two possible states for each cell. Dead (blank) or alive (green)
    createCanvas(640, 640);
    columns = width / cellR;
    rows = height / cellR;

    background(220);

    // 2x2 cells
    stroke(0, 0, 255)
    strokeWeight(cellR / 40)
    for (let row = 0; row < rows * 2; row++) {
        grid[row] = [];
        for (let column = 0; column < columns * 2; column++) {
            is_cell_living = round(random(0, 1));
            grid[row][column] = is_cell_living;
            if (is_cell_living === 1) {
                fill(0, 255, 0);
                rect(row * (cellR / 2), column * (cellR / 2), rectangle_width / 2, rectangle_height / 2);
            } else {
                fill(255);
                rect(row * (cellR / 2), column * (cellR / 2), rectangle_width / 2, rectangle_height / 2);
            }
        }
    }
    outerGrid()
}
function mousePressed() {
    // There are several possible outcomes for each outer_grid compartment of 2x2 cells
    // This depends on the number of living cells within each compartment
    // a. if this number is exactly two it leaves the block unchanged
    // b. if the number of living cells is zero, one, or four, the transition function flips the state of every cell in the block.
    // c. if the number of living cells is exactly three, the transition flips every state and then rotates the whole block by 180°
    for (let row = 0; row < (rows * 2); row += 2) {
        for (let column = 0; column < (columns * 2); column += 2) {
            current_cell = grid[row][column];
            right = grid[row][column + 1];
            bottom = grid[row + 1][column];
            bottom_right = grid[row + 1][column + 1];
            sum = current_cell + right + bottom + bottom_right;

            if (sum == 2) { // Compartment stays unchanged
                continue;
            } else if (sum === 3) { // Flip every state and rotate 180°
                flipped_current = flip_state(current_cell);
                flipped_right = flip_state(right);
                flipped_bottom = flip_state(bottom);
                flipped_bottom_right = flip_state(bottom_right);
                grid[row][column] = flipped_bottom_right;
                grid[row][column + 1] = flipped_bottom;
                grid[row + 1][column] = flipped_right;
                grid[row + 1][column + 1] = flipped_current;
            } else { // Flip every state
                flipped_current = flip_state(current_cell);
                flipped_right = flip_state(right);
                flipped_bottom = flip_state(bottom);
                flipped_bottom_right = flip_state(bottom_right);
                grid[row][column] = flipped_current
                grid[row][column + 1] = flipped_right;
                grid[row + 1][column] = flipped_bottom;
                grid[row + 1][column + 1] = flipped_bottom_right;
            }
        }
    }
    stroke(0, 0, 255)
    strokeWeight(cellR / 40)
    for (let row = 0; row < rows * 2; row++) {
        for (let column = 0; column < columns * 2; column++) {
            is_cell_living = grid[row][column];
            if (is_cell_living === 1) {
                fill(0, 255, 0);
                rect(row * (cellR / 2), column * (cellR / 2), rectangle_width / 2, rectangle_height / 2);
            } else {
                fill(255);
                rect(row * (cellR / 2), column * (cellR / 2), rectangle_width / 2, rectangle_height / 2);
            }
        }
    }
}
function mouseReleased() {
    return outerGrid()
}

