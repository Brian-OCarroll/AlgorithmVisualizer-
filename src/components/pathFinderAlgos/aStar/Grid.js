import React from 'react';
import Node from './Node'


export default class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.gridSize = width * height;
        this.nodes = new Array(height); //set rows
        this.allowDiagonals = false;
        this.canPassThroughCorners = false;
        this.LURDMoves = [ //left right up down
            [-1, 0],
            [0, -1],
            [1, 0],
            [0, 1]
        ];
        this.DiagonalMoves = [
            [-1, -1],
            [1, -1],
            [1, 1],
            [-1, 1]
        ];
        //references to the this.LURDMoves entries that would block the diagonal
        //if they are both walls and canPassThroughCorners = false
        this.DiagonalBlockers = [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 0]
        ];
    }
    /**
     * Build and return the nodes.
     * @private
     * @see Grid
     */
    setNodes = () => {
        for (let i = 0; i < this.height; ++i) {
            this.nodes[i] = new Array(this.width); //set columns
            for (let j = 0; j < this.width; ++j) {
                this.nodes[i][j] = this.createNode(j, i); // pass in width and height
            }
        }
        return this.nodes
    }

    createNode = (x, y) => {
        return {
            x, //the column
            y, //the row
            isStart: false,
            isEnd: false,
            active: false,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
        }
    }

    /**
     * MIGHT NEED TO SWITCH X AND Y HERE
     */
    getNode = (x, y) => {
        return this.nodes[y][x];
    }



    isInsideGrid = (x, y) => {
        return (x >= 0 && x < this.width) && (y >= 0 && y < this.height);
    }

    /**
     * Determines if node is traversable
     * @param {number} x - The x coordinate of the node.
     * @param {number} y - The y coordinate of the node.
     * @return {boolean} - The walkability of the node.
     */
    isTraversable = function (x, y) {
        return this.isInsideGrid(x, y) && !this.nodes[y][x].wall;
    };

    /**
     * Set whether the node on the given position is walkable.
     * NOTE: throws exception if the coordinate is not inside the grid.
     * @param {number} x - The x coordinate of the node.
     * @param {number} y - The y coordinate of the node.

     */
    setWall = (x, y) => {
        this.nodes[y][x].isWall = !this.nodes[y][x].isWall;
    };
    getNeighbors = (x, y) => {
        const node = this.getNode(x, y);
        if (!node.neighbors) {
            this.populateNeighbors(node);
        }
        return node.neighbors;
    }

    getNeighboringWalls = (x, y) => {
        const node = this.getNode(x, y);
        if (!node.neighboringWalls) {
            this.populateNeighbors(node);
        }

        return node.neighboringWalls;
    }

    /**
     * NEED TO TEST THIS
     * MAY HAVE DEFINITELY MESSED UP SYNTAX
     */
    populateNeighbors = (startNode) => {
        startNode.neighbors = [];
        startNode.neighboringWalls = []; // might use this for something
        let i;
        //Add Left/Up/Right/Down Moves
        for (i = 0; i < 4; i++) {
            let node = this.getNode(startNode.x + this.LURDMoves[i][0], startNode.y + this.LURDMoves[i][1]);
            if (node != null) {
                if (!node.wall) {
                    startNode.neighbors.push(node);
                } else {
                    startNode.neighboringWalls.push(node);
                }
            }
        }

        //Add Diagonals
        /**
         * GRIDX MAY NEED TO BE SWITCH WITH GRIDY
         * DONT KNOW BETWEEN X AND Y, I AND J
         */
        for (i = 0; i < 4; i++) {
            const gridX = startNode.x + this.DiagonalMoves[i][0];
            const gridY = startNode.y + this.DiagonalMoves[i][1];

            const diagNode = this.getNode(gridX, gridY);

            if (diagNode != null) {
                if (this.allowDiagonals && !diagNode.wall) {
                    if (!this.canPassThroughCorners) {
                        //Check if blocked by surrounding walls
                        var border1 = this.DiagonalBlockers[i][0];
                        var border2 = this.DiagonalBlockers[i][1];
                        //no need to protect against OOB as diagonal move
                        //check ensures that blocker refs must be valid
                        var blocker1 = this.grid[startNode.y + this.LURDMoves[border1][0]]
                        [this.x + this.LURDMoves[border1][1]];
                        var blocker2 = this.grid[startNode.x + this.LURDMoves[border2][0]]
                        [this.x + this.LURDMoves[border2][1]];


                        if (!blocker1.wall || !blocker2.wall) {
                            //one or both are open so we can move past
                            startNode.neighbors.push(diagNode);
                        }
                    } else {
                        startNode.neighbors.push(diagNode);
                    }
                }
                if (diagNode.wall) {
                    startNode.neighboringWalls.push(diagNode);
                }
            }
        }
        return startNode.neighbors
    }
    /**
 * Get a clone of this grid.
 * @return {Grid} Cloned grid.
 */
clone = () => {
    var i, j,

        width = this.width,
        height = this.height,
        dupNodes = {...this.nodes},

        newGrid = new Grid(width, height)
        
        newGrid.nodes = dupNodes

    // newGrid.nodes = newNodes;

    return newGrid;
};
} 



// export default Grid