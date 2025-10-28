

class Coordinate {
    // Instances of this class are modifiable coordinates in 2D space
    constructor(x_axis, y_axis) {
        this.x_axis = x_axis;
        this.y_axis = y_axis;
    }
    swap_axis() {
        this.x = this.x_axis
        this.x_axis = this.y_axis;
        this.y_axis = this.x;
        return this
    }
    show(input_text="") {
        return console.log(input_text + "X axis: " + this.x_axis, "Y axis: " + this.y_axis)
    }
    close_dif(repetitions=0) {
        // Returns a random rounded number between the max and min for each axis
        this.repetitions = repetitions
        while(this.repetitions >= 0){
        try {
            this.min = this.x_axis <= this.y_axis ? this.x_axis : this.y_axis;
            this.max = this.x_axis >= this.y_axis ? this.x_axis : this.y_axis;
            if (Math.abs(this.max - this.min) <= 1) {
                this.min = this.max
                this.x_axis = Math.round(Math.random() * (this.max - this.min) + this.min)
                this.y_axis = Math.round(Math.random() * (this.max - this.min) + this.min)
            } else {
                this.x_axis = Math.round(Math.random() * (this.max - this.min) + this.min)
                this.y_axis = Math.round(Math.random() * (this.max - this.min) + this.min)
            }
        }catch(error){
            console.log(error)
                            }
        this.repetitions -= 1;
                }
            return this
            }
}




function tests() {
    const coordinate = new Coordinate(120, 200);
    const coordinate2 = new Coordinate(360, 720);
    let new_pool = []
    new_pool.push(coordinate)
    new_pool.push(coordinate2)

    first_element = new_pool[0]
    pool_size = new_pool.length

    last_element = new_pool[pool_size-1]
    last_element.show()
    last_element.swap_axis()
    last_element.show(input_text="Swapped: ")
    last_element.close_dif().show("Difference shortened: ")
    shorten_the_difference_further = last_element.close_dif(repetitions=2)
    shorten_the_difference_further.show("Difference shortened further: ")
    close_the_difference = last_element.close_dif(10)
    close_the_difference.show("No difference: ")
}
tests()

/* function number_generator(array_length) {
    // Returns  a nested array
    let numbers = [];
    for (let i =0 ; i < array_length; i++)
        if (i % 400 === 0) {
            numbers.push([i ** 0.5, i ** 0.5 % 10])
        } else if (i % 100 === 0)
            numbers.push([i ** 1.5, i ** 1.5 % 10])
        else if (i % 4 === 0)
            numbers.push([i ** 0.5, i ** 0.5 % 10])
        else {
            numbers.push([i ** 1.5, i ** 1.5 % 10])
        }
    return numbers
}

let number_pool = number_generator(array_length=400)

function convert_to_coordinate(nested_array){
    let coordinate_pool = []
    for(let i of nested_array){
        try{
        const coordinate = new Coordinate(i[0], i[1])
        coordinate.close_dif();

        coordinate_pool.push(coordinate);
        }catch(error){
            console.log(error)
        }
    }
    return coordinate_pool
} */




