import React, { useState, useEffect, useRef, useCallback } from 'react';
import Controls from '../pathFinderAlgos/Controls';
import { Container, Row, Col } from 'react-bootstrap';
import Grid from './aStar/Grid';
import Node from './aStar/Node';
import AStarFinder from './aStar/Astar';
import Heuristic from './Heuristics'
class PathFinderContainer extends React.Component {

    constructor() {
        super();
        this.grid = getInitialGrid();
        this.nodeSize = 30;
        this.grid.getNode(2, 4).isStart = true
        this.grid.getNode(11, 11).isEnd = true
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

        this.state = {
            algo: "A*",
            heuristic: "Manhattan",
            options: ["Allow Diagonal", "Don't Cross Corners"],
            grid: this.grid,
            startCoords: [2,4],
            endCoords: [11,11],
            allowDiagonals: true,
            dontCrossCorners: false,
            mouseIsPressed: false
        }


        this.mouseAction = null;
        this.mouseEvent = this.mouseEvent.bind(this)
    }

    runAlgo = () => {
        const {startCoords, endCoords, algo, heuristic, allowDiagonals, dontCrossCorners} = this.state;
        console.log('starting')
        switch(algo) {
            case 'A*':

              let opts = {
                heuristic: Heuristic[heuristic.toLowerCase()],
                allowDiagonals: allowDiagonals,
                dontCrossCorners: dontCrossCorners
              }
              let finder = new AStarFinder(opts)
              let startNode = this.grid.getNode(startCoords[0], startCoords[1]);
              let endNode = this.grid.getNode(endCoords[0], endCoords[1]);
              let path = finder.findPath(startNode, endNode, this.grid);
              
              this.setState({
                  grid: this.grid
              })
              break;

            case 'Best First Search':
              // code block
              break;
            default:
              // code block
          }
    }

    reset = () => {
        this.setState({
            grid: this.grid,
          });
    }
    resetGrid = () => {

    }

    removeWalls = () => {
        this.grid.cleanWalls();
        
        this.setState({
            grid: this.grid,
          });
    }

    /**
     * Updates the starting node to a new location
     * Returns nothing
     * @param {Number} x - column number of grid
     * @param {Number} y - row number of grid
     * see @Grid
     */
    updateStart(x, y) {
        const {startCoords} = this.state
        this.grid.getNode(startCoords[0], startCoords[1]).isStart = false;
      
        this.setState({
            startCoords: [x, y]
        })
        this.grid.getNode(x, y).isStart = true;
    }

    /**
     * Updates the starting node to a new location
     * Returns nothing
     * @param {Number} x - column number of grid
     * @param {Number} y - row number of grid
     * see @Grid
     */
    updateEnd(x, y) {
        const {endCoords} = this.state
        this.grid.getNode(endCoords[0], endCoords[1]).isEnd = false;
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
                    
                    this.updateEnd(x,y);
                };
            } else if (this.grid.getNode(x, y).isWall) {

                this.mouseAction = function (x, y) {
                    
                    this.grid.removeWall(x, y);
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
                                    const { y, x, isEnd, isStart, isWall, active, opened, closed, isPath } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            x={x}
                                            y={y}
                                            isEnd={isEnd}
                                            isStart={isStart}
                                            isWall={isWall}
                                            active={active}
                                            path={isPath}
                                            nodeSize = {this.nodeSize}
                                            gridWidth = {this.state.grid.width}
                                            gridHeight = {this.state.grid.height}
                                            opened = {opened}
                                            closed = {closed}
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
                <button onClick={() => this.runAlgo()}>Click Bouton Pls</button>
                <button onClick={() => {this.removeWalls()}}>Remove Walls</button>
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
    const grid = new Grid(20, 20);
    grid.setNodes()
    return grid
};


export default PathFinderContainer

