import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'react-bootstrap'
import Navigation from './components/Nav/Navigation';
import PathFinderContainer from './components/pathFinderAlgos/PathFinderContainer';

function App() {

  return (
    <div className="App">

      <Navigation />
      <Container>
        <PathFinderContainer />
      </Container>
    </div>
  );
}

export default App;
