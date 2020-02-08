
const  populateNeighbors = (startNode) => {
        startNode.neighbors = [];
        startNode.neighboringWalls = []; // might use this for something
        let i;
        //Add Left/Up/Right/Down Moves
        for (i = 0; i < 4; i++) {
            let node = this.getNode(startNode.x + this.LURDMoves[0][i], startNode.y + this.LURDMoves[1][i]);
            if (node != null) {
                if (!node.isWall) {
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
            const gridX = startNode.x + this.DiagonalMoves[0][i];
            const gridY = startNode.y + this.DiagonalMoves[1][i];

            const diagNode = this.getNode(gridX, gridY);

            if (diagNode != null) {
                if (this.allowDiagonals && !diagNode.isWall) {
                    if (!this.canPassThroughCorners) {
                        //Check if blocked by surrounding walls
                        var border1 = this.DiagonalBlockers[0][i];
                        var border2 = this.DiagonalBlockers[1][i];
                        //no need to protect against OOB as diagonal move
                        //check ensures that blocker refs must be valid
                        var blocker1 = this.grid[startNode.y + this.LURDMoves[0][border1]]
                        [this.x + this.LURDMoves[1][border1]];
                        var blocker2 = this.grid[startNode.x + this.LURDMoves[0][border2]]
                        [this.x + this.LURDMoves[1][border2]];


                        if (!blocker1.isWall || !blocker2.isWall) {
                            //one or both are open so we can move past
                            startNode.neighbors.push(diagNode);
                        }
                    } else {
                        startNode.neighbors.push(diagNode);
                    }
                }
                if (diagNode.isWall) {
                    startNode.neighboringWalls.push(diagNode);
                }
            }
        }
        return startNode.neighbors
    }



// export default Grid