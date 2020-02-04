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
        this.nodeSize = 30;
        // this.grid.getNode(4, 5).isStart = true
        // this.grid.getNode(11, 11).isEnd = true
        this.state = {
            algo: [],
            grid: this.grid,
            startCoords: [2,4],
            endCoords: [11,11],
            mouseIsPressed: false
        }

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
        ];
        this.mouseAction = null;
        this.mouseEvent = this.mouseEvent.bind(this)
    }
    componentDidMount() {
        this.grid.getNode(this.state.startCoords[0], this.state.startCoords[1]).isStart = true
        this.grid.getNode(this.state.endCoords[0], this.state.endCoords[1]).isEnd = true
        this.setState({
            grid: this.grid
        })
    }
    reset = () => {
        this.setState({

            grid: this.grid,
          });
    }
    updateStart(x, y) {

        this.grid.getNode(this.state.startCoords[0], this.state.startCoords[1]).isStart = false;
      
        this.setState({
            startCoords: [x, y]
        })
        this.grid.getNode(x, y).isStart = true;
    }
    updateEnd(x, y) {
        this.grid.getNode(this.state.endCoords[0], this.state.endCoords[1]).isEnd = false;
        this.setState({
            endCoords: [x, y]
        })
        this.grid.getNode(x, y).isEnd = true;
    }
    mouseEvent = (x, y, evt) => {
      
        if (evt.type === 'mouseup') {
            
            this.mouseAction = null;

            this.grid.getNode(x, y).active = false

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
                   
                    this.updateStart(x, y);

                }
            } else if (this.grid.getNode(x, y).isEnd) {
                this.mouseAction = function (x, y) {
                    
                    this.updateEnd(x,y)
                    // this.grid.removeAll('goalPosition');
                    //   this.grid.cells[cellIndex].setProperty({ 'goalPosition': true });
                };
            } else if (this.grid.getNode(x, y).isWall) {

                this.mouseAction = function (x, y) {
                    
                    this.grid.setWall(x, y);
                    //   this.grid.cells[cellIndex].removeProperty(['wall']);
                };
            } else {
                this.mouseAction = function (x, y) {
                    this.grid.setWall(x, y);
                    
                   
                };
            }
        }
        this.grid.getNode(x, y).active = true
      
        this.mouseAction(x, y);
        this.reset();
    }


    render() {
        return (
            
            // <Container>
            <>
                <Controls algorithms={this.algos} algoSelections={this.algoSelections} />
                <svg className={ this.state.mouseActive ? 'mouseActive' : '' } width={(this.state.grid.width*this.nodeSize)+1} height={(this.state.grid.height*this.nodeSize)+1}>
                    {this.state.grid.nodes.map((row, rowIdx) => {
                        return (
                            
                                row.map((node, nodeIdx) => {
                                    const { y, x, isEnd, isStart, isWall, active } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            x={x}
                                            y={y}
                                            isEnd={isEnd}
                                            isStart={isStart}
                                            isWall={isWall}
                                            active={active}
                                            nodeSize = {this.nodeSize}
                                            gridWidth = {this.state.grid.width}
                                            gridHeight = {this.state.grid.height}
          
                                            MouseDown={this.mouseEvent}
                                            MouseEnter={
                                                this.mouseEvent
                                            }
                                            MouseUp={this.mouseEvent}
                                            
                                        ></Node>
                                    );
                                })
                            
                        );
                    })}
                </svg>
                </>
            // </Container>
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

