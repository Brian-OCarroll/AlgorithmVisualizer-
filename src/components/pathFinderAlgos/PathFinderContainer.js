import React, { useState, useEffect, useRef, useCallback } from 'react';
import Controls from '../pathFinderAlgos/Controls';
import { Container, Row, Col } from 'react-bootstrap';
import Grid from './aStar/Grid';
import Node from './aStar/Node';
import AStarFinder from './aStar/Astar';

class PathFinderContainer extends React.Component {

    constructor() {
        super()
        this.grid = getInitialGrid();

        this.state = {
            algo: [],
            grid: this.grid,
            startCoords: [2,4],
            endCoords: [11,11],
            mouseIsPressed: false
        }
        this.mouseAction = null
        this.algos = ["A*", "Depth First"];
        this.algoSelections = [
            {
                heuristics: ["Manhattan", "Euclidean", "Octile", "Chebyshev"],
                options: ["Allow Diagonal", "Don't Cross Corners"]
            },
            {
                heuristics: ["Manhattan", "Euclidean", "Octile", "Chebyshev"],
                options: ["Allow Diagonal", "Don't Cross Corners"]
            }
        ]
        this.mouseEvent = this.mouseEvent.bind(this)
    }
    componentDidMount() {
        this.grid.getNode(this.state.startCoords[0], this.state.startCoords[1]).isStart = true
        this.grid.getNode(this.state.endCoords[0], this.state.endCoords[1]).isEnd = true
        this.setState({
            grid: this.grid
        })
    }
    updateStart(x, y) {
        this.grid.getNode(this.state.startCoords[0], this.state.startCoords[1]).isStart = false;
        this.setState({
            startCoords: [x, y]
        })
        this.grid.getNode(this.state.startCoords[0], this.state.startCoords[1]).isStart = true;
    }
    updateEnd(x, y) {
        this.grid.getNode(this.state.endCoords[0], this.state.endCoords[1]).isEnd = false;
        this.setState({
            endCoords: [x, y]
        })
        this.grid.getNode(this.state.endCoords[0], this.state.endCoords[1]).isEnd = true;
    }
    mouseEvent = (x, y, evt) => {
      
        if (evt.type === 'mouseup') {
            console.log('mouseip')
            this.mouseAction = null;

            this.grid.getNode(x, y).active = false
            console.log('noramal', this.grid)
            console.log('state', this.state.grid)
            this.setState({
                grid: this.grid
            })
            return;
        }

        // Ignore mouseover's without mousedown
        if (evt.buttons !== 1 && evt.type !== 'click') {
            this.mouseAction = null;
            return;
        }

        if (this.mouseAction == null) {
            if (this.grid.getNode(x, y).isStart) {
                this.mouseAction = function (x, y) {
                    console.log('start', x, y);
                    this.updateStart(x, y);

                }
            } else if (this.grid.getNode(x, y).isEnd) {
                this.mouseAction = function (x, y) {
                    console.log('end', x, y);
                    // this.grid.removeAll('goalPosition');
                    //   this.grid.cells[cellIndex].setProperty({ 'goalPosition': true });
                };
            } else if (this.grid.getNode(x, y).isWall) {

                this.mouseAction = function (x, y) {
                    console.log('wall', x, y);
                    this.grid.setWall(x, y);
                    //   this.grid.cells[cellIndex].removeProperty(['wall']);
                };
            } else {
                this.mouseAction = function (x, y) {
                    this.grid.setWall(x, y);
                    console.log('not wall', x, y);
                    //   this.grid.cells[cellIndex].setProperty({ 'wall': true });
                };
            }
        }

        // this.grid.cells[cellIndex].setProperty({ 'active': true });
        this.mouseAction(x, y);
        // this.reset();
    }


    render() {
        return (
            <Container>
                <Controls algorithms={this.algos} algoSelections={this.algoSelections} />
                <div className="grid">
                    {this.state.grid.nodes.map((row, rowIdx) => {
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
                                            MouseDown={this.mouseEvent}
                                            MouseEnter={
                                                this.mouseEvent
                                            }
                                            MouseUp={this.mouseEvent}
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

