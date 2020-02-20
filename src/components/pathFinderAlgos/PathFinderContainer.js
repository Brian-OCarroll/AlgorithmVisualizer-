import React, { useState, useEffect, useRef, useCallback } from 'react';
import Controls from '../pathFinderAlgos/Controls';
import { Container, Row, Col } from 'react-bootstrap';
import Grid from './Grid/Grid';
import Node from './Grid/Node';
import AStarFinder from './Finders/Astar';
import Heuristic from './Heuristics';

class PathFinderContainer extends React.Component {

    constructor() {
        super();
        this.grid = getInitialGrid();
        this.nodeSize = 30;
        this.grid.getNode(2, 4).isStart = true
        this.grid.getNode(11, 11).isEnd = true
        this.algos = ["A*", "Best-First"];
        this.heuristics = ["Manhattan", "Euclidean", "Octile", "Chebyshev"];
        this.options = ["allowDiagonals", "canCrossCorners"]
        this.state = {
            algo: "A*",
            heuristic: "Manhattan",
            grid: this.grid,
            startCoords: [2, 4],
            endCoords: [11, 11],
            allowDiagonals: false,
            canCrossCorners: false,
            mouseIsPressed: false,
            autoRun: false
        }


        this.mouseAction = null;
        this.mouseEvent = this.mouseEvent.bind(this)
    }
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 10 * i);
        }
    }
    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
            }, 50 * i);
        }
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (target.name === "allowDiagonals") {
            this.setAllowDiagonals()
        } else if (target.name === "canCrossCorners") {
            this.setCanCrossCorners()
        } else {
            this.setState({
                [name]: value
            });
            this.reset()
        }

    }
    setAllowDiagonals = () => {
        let { allowDiagonals } = this.state
        this.grid.allowDiagonals = !allowDiagonals
        this.setState({
            allowDiagonals: !allowDiagonals,
            grid: this.grid
        })
        this.reset()
    }
    setCanCrossCorners = () => {
        let { canCrossCorners } = this.state
        this.grid.canCrossCorners = !canCrossCorners
        this.setState({
            canCrossCorners: !canCrossCorners,
            grid: this.grid
        })
        this.reset()
    }

    runAlgo = () => {
        const { startCoords, endCoords, algo, heuristic, allowDiagonals, canCrossCorners } = this.state;
        let opts = {
            heuristic: Heuristic[heuristic.toLowerCase()],
            allowDiagonals: allowDiagonals,
            canCrossCorners: canCrossCorners
        },
            finder,
            startNode = this.grid.getNode(startCoords[0], startCoords[1]),
            endNode = this.grid.getNode(endCoords[0], endCoords[1]),
            path
        switch (algo) {
            case 'A*':
                finder = new AStarFinder(opts)

                path = finder.findPath(startNode, endNode, this.grid);

                this.setState({
                    grid: this.grid
                })
                break;

            case 'Best-First':

                finder = new AStarFinder(opts)
                finder.setBestFirst()
                path = finder.findPath(startNode, endNode, this.grid);

                this.setState({
                    grid: this.grid
                })
                break;
            default:
            // code block
        }
    }
    reset = () => {
        this.grid.cleanGrid();
        this.setState({
            grid: this.grid,
        });
        if (this.state.autoRun) {
            this.runAlgo()
        }

    }

    setRunOnUpdate = () => {
        this.setState({
            autoRun: !this.state.autoRun
        })
    }

    removeWalls = () => {
        this.grid.cleanWalls();

        this.setState({
            grid: this.grid,
        });
    }
    cleanGrid = () => {
        this.grid.cleanGrid();
        this.setState({
            grid: this.grid
        })
    }
    /**
     * Updates the starting node to a new location
     * Returns nothing
     * @param {Number} x - column number of grid
     * @param {Number} y - row number of grid
     * see @Grid
     */
    updateStart(x, y) {
        const { startCoords } = this.state
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
        const { endCoords } = this.state
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
            this.reset()
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

                    this.updateEnd(x, y);
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
            <Container fluid="false" style={{ position: "relative" }}>
                <Row>
                    <Col>
                        <h1>Path Finding Algorithms</h1>
                    </Col>
                </Row>
                <Controls handleChange={this.handleInputChange} algo={this.state.algo} heuristic={this.state.heuristic} canCrossCorners={this.state.canCrossCorners} allowDiagonals={this.state.allowDiagonals} algorithms={this.algos} heuristics={this.heuristics} options={this.options} />
                <Row>
                    <Col >
                        <div className="scroll-grid">
                            <svg className={this.state.mouseActive ? 'mouseActive white-bg' : 'white-bg'} width={(this.state.grid.width * this.nodeSize) + 1} height={(this.state.grid.height * this.nodeSize) + 1}>
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
                                                    nodeSize={this.nodeSize}
                                                    gridWidth={this.state.grid.width}
                                                    gridHeight={this.state.grid.height}
                                                    opened={opened}
                                                    closed={closed}
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
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={() => this.runAlgo()}>Click Bouton Pls</button>
                        <button onClick={() => { this.removeWalls() }}>Remove Walls</button>
                        <button onClick={() => { this.cleanGrid() }}>Reset Grid</button>
                        <button className={this.state.autoRun ? "btn-active" : ""} onClick={() => { this.setRunOnUpdate() }}>Auto Run?</button>
                    </Col>
                </Row>

                {/* <button className={this.state.allowDiagonals ? "btn-active" : ""} onClick={() => { this.setAllowDiagonals() }}>Allow Diagonals</button>
                <button className={this.state.canCrossCorners ? "btn-active" : ""} onClick={() => { this.setCanCrossCorners() }}>Can Cross Corners?</button> */}
            </Container>
            // </Container>
        );
    }

}
/**
 * Build and return the grid with only start and end assigned
 * @see Grid
 */
const getInitialGrid = () => {
    const grid = new Grid(35, 20);
    grid.setNodes()
    return grid
};


export default PathFinderContainer

