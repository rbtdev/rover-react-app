const COMPASS = 'NESW'; // Compass headings in clockwise order from North
const TURN_VALUES = {
    'R': 1,  // A right turn is one position
    'L': 3   // A left turn is the same as 3 right turns.  This allows modulus math for turn index

}
class Rover {
    constructor(position, grid) {
        [this.xMax, this.yMax] = grid.split(' ');
        [this.x, this.y, this.heading] = position.split(' ');
    }

    execute(commands) {
        for (let command of commands) {
            if (command === 'M') this.move();
            else this.turn(command);
        }
    }

    turn(turn) {
        let turnValue =  TURN_VALUES[turn] || 0; // Get the index of the current heading from the compass
        let headingIndex = (COMPASS.indexOf(this.heading) + turnValue) % 4; // Compute the lookup value for the new heading
        this.heading = COMPASS[headingIndex];
    }

    move() {
        let x = this.x;
        let y = this.y;
        let heading = this.heading;
        if (heading === 'N') y++;
        else if (heading === 'E') x++;
        else if (heading === 'S') y--;
        else if (heading === 'W') x--;
        if (x <= this.xMax && x >= 0) this.x = x;
        if (y <= this.yMax && y >= 0) this.y = y;
    }

    get position() {
        return `${this.x} ${this.y} ${this.heading}`;
    }
}

export default Rover;