import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Nav/Navigation';
import PathFinderContainer from './components/pathFinderAlgos/PathFinderContainer';
import Table from './components/sortingAlgos/table'
function App() {

  return (
    <div className="App">

      <Navigation />
      
        {/* <PathFinderContainer /> */}
        <Table />
    </div>
  );
}

export default App;
