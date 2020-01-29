import React from 'react';

// cell class that allows for assignable properties
class Node {
    constructor(col, row, wall) {
        /**
         * The x coordinate of the node on the grid.
         * @type number
         */
        this.x = col;
        /**
         * The y coordinate of the node on the grid.
         * @type number
         */
        this.y = row;
        /**
         * Whether this node can be walked through.
         * @type boolean
         */
        this.wall = wall
        // Neighbors
        this.neighbors = undefined;
        this.neighboringWalls = undefined;
        this.previous = undefined;
        // Already been evaluated?
        this.visited = false;
    }

}

export class Grid {
    constructor(width, height, matrix) {
        this.width = width;
        this.height = height;
        this.gridSize = width * height;
        this.nodes = new Array(height); //set rows
        this.allowDiagonals = false;
        this.canPassThroughCorners = false;
        this.LURDMoves = [
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
     * @param {number} width
     * @param {number} height
     * @see Grid
     */
    setNodes = () => {
        for (let i = 0; i < this.height; ++i) {
            this.nodes[i] = new Array(this.width); //set columns
            for (let j = 0; j < this.width; ++j) {
                this.nodes[i][j] = new Node(j, i); // pass in width and height
            }
        }
        return this.nodes
    }

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
     * @param {boolean} walkable - Whether the position is walkable.
     */
    setWall = (x, y) => {
        this.nodes[y][x].wall = true;
    };

    /**
     * NEED TO TEST THIS
     */
    populateNeighbors = function () {
        this.neighbors = [];
        this.neighboringWalls = [];
        let i;
        //Add Left/Up/Right/Down Moves
        for ( i = 0; i < 4; i++) {
            let node = this.getNode(this.i + this.LURDMoves[i][0], this.j + this.LURDMoves[i][1]);
            if (node != null) {
                if (!node.wall) {
                    this.neighbors.push(node);
                } else {
                    this.neighboringWalls.push(node);
                }
            }
        }

        //Add Diagonals

        for ( i = 0; i < 4; i++) {
            const gridX = this.i + this.DiagonalMoves[i][0];
            const gridY = this.j + this.DiagonalMoves[i][1];

            const diagNode = this.getNode(gridX, gridY);

            if (diagNode != null) {
                if (this.allowDiagonals && !diagNode.wall) {
                    if (!this.canPassThroughCorners) {
                        //Check if blocked by surrounding walls
                        var border1 = this.DiagonalBlockers[i][0];
                        var border2 = this.DiagonalBlockers[i][1];
                        //no need to protect against OOB as diagonal move
                        //check ensures that blocker refs must be valid
                        var blocker1 = this.grid[this.i + this.LURDMoves[border1][0]]
                        [this.j + this.LURDMoves[border1][1]];
                        var blocker2 = this.grid[this.i + this.LURDMoves[border2][0]]
                        [this.j + this.LURDMoves[border2][1]];


                        if (!blocker1.wall || !blocker2.wall) {
                            //one or both are open so we can move past
                            this.neighbors.push(diagNode);
                        }
                    } else {
                        this.neighbors.push(diagNode);
                    }
                }
                if (diagNode.wall) {
                    this.neighboringWalls.push(diagNode);
                }
            }
        }
    }

}





export default Grid