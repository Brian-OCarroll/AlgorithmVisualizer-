import React from 'react';
import logo from './logo.svg';
import './App.css';
import AStarPathFinder from './components/pathFinderAlgos/aStar/Astar';
// import Grid from './components/pathFinderAlgos/aStar/Grid'
import PathFinderContainer from './components/pathFinderAlgos/PathFinderContainer';
// const Grid = require('./components/pathFinderAlgos/aStar/Grid')
function App() {
  // const matrix = new Grid(50, 50);
  // matrix.setNodes()
  // console.log(matrix)
  // window.$log = matrix;
  return (
    <div className="App">
    <PathFinderContainer />
    </div>
  );
}

export default App;
