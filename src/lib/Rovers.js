let Rover = require('./Rover');

const input = [
    '5 5',
    '1 2 N',
    'LMLMLMLMM',
    '3 3 E',
    'MMRMMRMRRM'
];

console.log('Input');
for (line of input) console.log(line);
console.log();


// Get grid boundaries
let grid = input[0];

console.log('Output');

// Process each rover input
for (let r = 1; r < input.length; r += 2) {
    let rover = new Rover(input[r], grid);
    let commands = input[r + 1];
    if (commands) rover.execute(commands);
    console.log(rover.position);
}
