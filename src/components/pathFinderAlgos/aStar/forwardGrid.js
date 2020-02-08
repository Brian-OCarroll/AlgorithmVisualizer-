 /**
     * NEED TO TEST THIS
     * MAY HAVE DEFINITELY MESSED UP SYNTAX
     */
   const populateNeighbors = (startNode) => {
        startNode.neighbors = [];
        startNode.neighboringWalls = []; // might use this for something
        let i;
        //Add Left/Up/Right/Down Moves
        for (i = 0; i < 4; i++) {
            console.log(startNode.x, this.LURDMoves[0][i], startNode.y + this.LURDMoves[1][i])
            console.log(startNode)
            let node = this.getNode(startNode.x + this.LURDMoves[i][0], startNode.y + this.LURDMoves[i][1]);
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
            const gridX = startNode.x + this.DiagonalMoves[i][0];
            const gridY = startNode.y + this.DiagonalMoves[i][1];

            const diagNode = this.getNode(gridX, gridY);

            if (diagNode != null) {
                if (this.allowDiagonals && !diagNode.isWall) {
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