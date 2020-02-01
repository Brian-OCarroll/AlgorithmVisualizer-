import React, { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import Controls from '../pathFinderAlgos/Controls';
import { Container, Row, Col } from 'react-bootstrap';
import Grid from './aStar/Grid';
import AStarFinder from './aStar/Astar';
const PathFinderContainer = () => {
    let initialGrid = new Grid(16, 16);
    initialGrid.setNodes(); // create 2d array



    // const [matrixSize, setMatrixSize] = useState(25);

    // // const [matrix, setMatrix] = useState(); //creates a 2d array
    const [grid, setGrid] = useState(initialGrid);

    const [startNode, setStartNode] = useState(grid.getNode(11, 9));

    const [endNode, setEndNode] = useState(grid.getNode(3, 4));
    const [openSet, setOpenSet] = useState([startNode])
    const [closedSet, setClosedSet] = useState([]);
    const [lastCheckedNode, setLastCheckedNode] = useState(startNode);
    const [allowDiagonals, setAllowDiagonals] = useState(false);
    const [mouseActive, setMouseActive] = useState(false)
    let finder = new AStarFinder();
    let path = finder.findPath(startNode, endNode, initialGrid)
    console.log(JSON.stringify(path))


    // const handleMatrixChange = (event) => {

    //     let newSize = event.target.value
    //     if( newSize > 100) { //prevent matrix over 100x100
    //         newSize = 100;
    //     }
    //     let newArr = Array.from({ length: newSize }, () => Array.from({ length: newSize }, () => null))
    //     //when adding walls, remember to delete all walls on resize **************************************************************************
    //     // Delete them before settingMatrix
    //     setMatrixSize(newSize)
    //     setMatrix(newArr);


    // };



    let cellSize = 30;
    return (

        <Container>
            <Row >
                <Col md={4}>
                    <Controls />
                </Col>
            </Row>
            <svg className={mouseActive ? 'mouseActive' : ''} width={(grid.width * cellSize) + 1} height={(grid.height * cellSize) + 1}>
                {
                    grid.nodes.map((rows, rowIndex) => {
                        return rows.map((col, colIndex) => {
                            return (
                                <g key={colIndex}>
                                    <rect
                                        x={((col.x) * cellSize) + 1}
                                        y={((col.y) * cellSize) + 1}
                                        width={cellSize - 1}
                                        height={cellSize - 1}
                                    />
                                </g>
                            )
                        })
                    })
                }
            </svg>
            {/* <div>
            <h1>Change Matrix Size</h1>
            <input type="number" value={matrixSize} onChange={handleMatrixChange}/>
            <Rows matrix={matrix} start={start} end={end}/>
        </div> */}
        </Container>

    )
}

export default PathFinderContainer