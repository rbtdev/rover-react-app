import React from 'react';
import './App.css';
import Rover from './lib/Rover';

function RoverGrid(props) {

  const { size, rovers } = props;
  const rotation = {
    'N': 0,
    'E': 90,
    'S': 180,
    'W': 270
  }
  const ratioW = Math.floor(400 / size.xMax);
  const ratioH = Math.floor(400 / size.yMax);
  const grid = [];

  for (var y = 0; y < size.yMax; y++) {
    for (var x = 0; x < size.xMax; x++) {
      grid.push(<div style={{
        width: ratioW - 1,
        height: ratioH - 1
      }} />);
    }
  }

  const roverIcons = rovers.map(rover => {
    let [x, y, heading] = rover.position.split(' ');
    return (
      <div className='rover' style={{ 
        width: ratioW - 1, 
        height: ratioH - 1, 
        left: x * ratioW - ratioW/2, 
        bottom: y * ratioH-ratioH/2,
        backgroundSize: Math.min(ratioH, ratioW),
        transform: `rotate(${rotation[heading]}deg)`
      }} />
    )
  });

  return (
    <div className='grid' style={{ position: 'relative', width: 400, height: 400 }}>
      {grid}
      {roverIcons}
    </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commandCount: 0,
      gridSize: {
        xMax: 5,
        yMax: 5
      },
      rovers: [new Rover('0 0 N', '5 5') ]
    }
    this.commandInput = null;
  }

  setGridSize = (gridSize) => {
    let [xMax, yMax] = gridSize.split(' ');
    this.setState({ gridSize: { xMax, yMax } });
  }

  commandRover = () => {
    let command = this.commandInput.value;
    this.state.rovers[0].execute(command);
    this.setState({commandCount: this.state.commandCount+1})
  }

  render() {
    return (
      <div className="App">
        <RoverGrid size={this.state.gridSize} rovers={this.state.rovers} />
        <input ref = {ref=>(this.commandInput = ref)} type='text'/>
        <button onClick = {this.commandRover}>Execute</button>

        <div>
          <p>Type a command in the input box to move and rotate the rover</p>
          <p>Example: MMRM will move the rover two squares in the current direction, then turn right, then move 1 square in the new direction</p>
        </div>
      </div>
    );
  }
}

export default App;
