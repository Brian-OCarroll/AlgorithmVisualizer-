import React, { useState, useEffect, useRef, useCallback } from 'react';
import Controls from '../pathFinderAlgos/Controls';
import { Container, Row, Col } from 'react-bootstrap';
import Grid from './aStar/Grid';
import Node from './aStar/Node';
import AStarFinder from './aStar/Astar';

const PathFinderContainer = () => {
    // let initialGrid = new Grid(16, 16);
    // initialGrid.setNodes(); // create 2d array
    let algos = ["A*", "Depth First"]
    const algoSelections = [
        {
            heuristics: ["Manhattan", "Euclidean", "Octile", "Chebyshev"],
            options: ["Allow Diagonal", "Don't Cross Corners"]
        },
        {
            heuristics: ["Manhattan", "Euclidean", "Octile", "Chebyshev"],
            options: ["Allow Diagonal", "Don't Cross Corners"]
        }
    ]
    const [selectAlgoIndex, setSelectAlgoIndex] = useState(0)


    const setup = getInitialGrid();
    const [grid, setGrid] = useState(setup);
    
    const [mouseIsPressed, setMouseIsPressed] = useState(false);

    // const [startNode, setStartNode] = useState(grid.getNode(11, 9));

    // const [endNode, setEndNode] = useState(grid.getNode(3, 4));
    // const [openSet, setOpenSet] = useState([startNode]);
    // const [closedSet, setClosedSet] = useState([]);
    // const [lastCheckedNode, setLastCheckedNode] = useState(startNode);
    const [allowDiagonals, setAllowDiagonals] = useState(false);

    //set the state to a new grid class
    // useEffect(() => {
    //     const grid = getInitialGrid();
    //     setGrid(grid.nodes)
    // }, []);

    // const [mouseFunction, setMouseFunction] = useState(null);
    let mouseAction = null;

    // startNode.isStart = true;
    // startNode.isEnd = true;

    // let finder = new AStarFinder();
    // let path = finder.findPath(startNode, endNode, initialGrid)
    
    const mouseEvent = (x, y, evt) => {
        const gridClone = grid.clone();
        if (evt.type === 'mouseup') {
          
          mouseAction = null;

          gridClone.getNode(x,y).active = false
          setGrid(gridClone)
          return;
        }
    
        // Ignore mouseover's without mousedown
        if (evt.buttons !== 1 && evt.type !== 'click') {
          mouseAction = null;
          return;
        }
    
        if (mouseAction == null) {
          if (gridClone.getNode(x, y).isStart) {
            mouseAction = function(x, y) {
                console.log('start', x,y)
            //   this.grid.removeAll('startPosition');
            //   this.grid.cells[cellIndex].setProperty({ 'startPosition': true });
            }
          } else if (gridClone.getNode(x, y).isEnd) {
            mouseAction = function (x, y) {
                console.log('end', x,y);
                // this.grid.removeAll('goalPosition');
            //   this.grid.cells[cellIndex].setProperty({ 'goalPosition': true });
            };
          } else if (gridClone.getNode(x, y).isWall) {
            
            mouseAction = function(x, y) {
                console.log('end', x,y);
                gridClone.setWall(x, y);
            //   this.grid.cells[cellIndex].removeProperty(['wall']);
            };
          } else {
            mouseAction = function(x, y) {
                gridClone.setWall(x, y);
                console.log('end', x,y);
            //   this.grid.cells[cellIndex].setProperty({ 'wall': true });
            };
          }
        }
    
        // this.grid.cells[cellIndex].setProperty({ 'active': true });
        // this.mouseAction(cellIndex);
        // this.reset();
      }


    let cellSize = 30;
    console.log(grid)
    return (
        <Container>
            <Controls algorithms={algos} algoSelections={algoSelections} />
            <div className="grid">
                {grid.nodes.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const { y, x, isEnd, isStart, isWall } = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        x={x}
                                        isEnd={isEnd}
                                        isStart={isStart}
                                        isWall={isWall}
                                        // mouseIsPressed={mouseIsPressed}
                                        // onMouseDown={(x, y) => mouseEvent(x, y)}
                                        // onMouseEnter={(x, y) =>
                                        //     mouseEvent(x, y)
                                        // }
                                        // onMouseUp={() => mouseEvent()}
                                        onMouseDown={mouseEvent}
                                        onMouseEnter={
                                            MouseEvent
                                        }
                                        onMouseUp={ mouseEvent}
                                        y={y}
                                        ></Node>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </Container>
    );
}
/**
 * Build and return the grid with only start and end assigned
 * @see Grid
 */
const getInitialGrid = () => {
    const grid = new Grid(25, 25);
    grid.setNodes()
    return grid
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };
export default PathFinderContainer

// Hook
function useEventListener(eventName, handler, element = window){
    // Create a ref that stores handler
    const savedHandler = useRef();
    
    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useEffect(() => {
      savedHandler.current = handler;
    }, [handler]);
  
    useEffect(
      () => {
        // Make sure element supports addEventListener
        // On 
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;
        
        // Create event listener that calls handler function stored in ref
        const eventListener = event => savedHandler.current(event);
        
        // Add event listener
        element.addEventListener(eventName, eventListener);
        
        // Remove event listener on cleanup
        return () => {
          element.removeEventListener(eventName, eventListener);
        };
      },
      [eventName, element] // Re-run if eventName or element changes
    );
  };