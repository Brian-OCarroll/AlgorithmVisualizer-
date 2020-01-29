import React from 'react';

// cell class that allows for assignable properties
class Cell {
    constructor(props = {}) {
      this.props = props;
    }
    // setter
    setProp(props = {}) {
      Object.assign(this.props, props);
    }
    // getter
    getProp(prop) {
      return this.props[prop];
    }
    //remover
    removeProp(props = []) {
      for(let prop of props) {
        delete this.props[prop];
      }
    }
}

export class Grid {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      let gridSize = width * height;
      this.cells = new Array(gridSize);
      for (let i=0; i<gridSize; i++) {
        this.cells[i] = new Cell();
      }
    }
  
    findCell(prop) {
      for(let i in this.cells) {
        if (this.cells[i].getProperty(property)) {
          return parseInt(i, 10);
        }
      }
    }
    
    removeAll(property) {
      for(let i in this.cells) {
        if (this.cells[i].properties[property]) {
          this.cells[i].removeProperty([property]);
        }
      }
    }
  
    neighbourCell(cell, direction) {
      let neighbourCell;
      switch(direction) {
        case "left":
          neighbourCell = cell - 1;
          if (((neighbourCell+1) % this.width) === 0) {
            return null;
          }
          break;
        case "up":
          neighbourCell = cell - this.width;
          break;
        case "right":
          neighbourCell = cell + 1;
          if ((neighbourCell % this.width) === 0) {
            return null;
          }
          break;
        case "down":
          neighbourCell = cell + this.width;
          break;
        default:
          neighbourCell = null;
      }
  
      if (neighbourCell < 0 || neighbourCell >= (this.width * this.height)) {
        return null;
      }
  
      return neighbourCell;
    }
    
    distanceHeuristic(cellA, cellB) {
      let xDistance = Math.abs(Math.floor(cellA / this.width) - Math.floor(cellB / this.width));
      let yDistance = Math.abs((cellA % this.width) - (cellB % this.width));
  
      return xDistance + yDistance;
    }
  }
  


const Cell = (i, j, x, y, width, height, isWall, grid, props) => {

    props.grid = grid;

    // Location
    props.i = i;
    props.j = j;
    props.x = x;
    props.y = y;
    props.width = width;
    props.height = height;

    // f, g, and h values for A*
    props.f = 0;
    props.g = 0;
    props.h = 0;
    props.vh = 0; //visual heuristic for prioritising path options
    // Neighbors
    props.neighbors = undefined;
    props.neighboringWalls = undefined;
    // Where did I come from?
    props.previous = undefined;
    // Am I an wall?
    props.wall = isWall;

    // Did the maze algorithm already visit me?
    props.visited = false;

    // Display me
    props.show = function(color) {
        if (props.wall) {
            fill(0);
            noStroke();

            if (drawingOption === 0) {
                ellipse(props.x + props.width * 0.5, props.y + props.width * 0.5, props.width * 0.5, props.height * 0.5);
            } else {
                rect(props.x, props.y, props.width, props.height);
            }

            stroke(0);
            strokeWeight(props.width / 2);

            var nWalls = props.getNeighboringWalls(props.grid);
            for (var i = 0; i < nWalls.length; i++) {
                var nw = nWalls[i];

                // Draw line between this and bottom/right neighbor walls
                if ((nw.i > props.i && nw.j == props.j) ||
                    (nw.i == props.i && nw.j > props.j)) {
                    line(props.x + props.width / 2,
                        props.y + props.height / 2,
                        nw.x + nw.width / 2,
                        nw.y + nw.height / 2);
                }

                // Draw line between this and bottom-left/bottom-right neighbor walls
                if (!canPassThroughCorners && (nw.j > props.j) &&
                    (nw.i < props.i || nw.i > props.i)) {
                    line(props.x + props.width / 2,
                        props.y + props.height / 2,
                        nw.x + nw.width / 2,
                        nw.y + nw.height / 2);
                }
            }
        } else if (color) {
            fill(color);
            noStroke();
            rect(props.x, props.y, props.width, props.height);
        }
    }

    props.getNeighbors = function() {
        if (!props.neighbors) {
            props.populateNeighbors();
        }
        return props.neighbors;
    }

    props.getNeighboringWalls = function(grid) {

        if (!props.neighboringWalls) {
            props.populateNeighbors();
        }

        return props.neighboringWalls;
    }

    //maybe should be static properties?
    var LURDMoves = [
        [-1, 0],
        [0, -1],
        [1, 0],
        [0, 1]
    ];
    var DiagonalMoves = [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1]
    ];
    //references to the LURDMoves entries that would block the diagonal
    //if they are both walls and canPassThroughCorners = false
    var DiagonalBlockers = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0]
    ];

    //return node or null if request is out of bounds
    props.getNode = function(i, j) {
        if (i < 0 || i >= props.grid.length ||
            j < 0 || j >= props.grid[0].length) {
            return null;
        }
        return props.grid[i][j];
    }

    //populate neighbor move and neighbor wall arrays
    props.populateNeighbors = function() {
        props.neighbors = [];
        props.neighboringWalls = [];

        //Add Left/Up/Right/Down Moves
        for (var i = 0; i < 4; i++) {
            var node = props.getNode(props.i + LURDMoves[i][0], props.j + LURDMoves[i][1]);
            if (node != null) {
                if (!node.wall) {
                    props.neighbors.push(node);
                } else {
                    props.neighboringWalls.push(node);
                }
            }
        }

        //Add Diagonals

        for (var i = 0; i < 4; i++) {
            var gridX = props.i + DiagonalMoves[i][0];
            var gridY = props.j + DiagonalMoves[i][1];

            var node = props.getNode(gridX, gridY);

            if (node != null) {
                if (allowDiagonals && !node.wall) {
                    if (!canPassThroughCorners) {
                        //Check if blocked by surrounding walls
                        var border1 = DiagonalBlockers[i][0];
                        var border2 = DiagonalBlockers[i][1];
                        //no need to protect against OOB as diagonal move
                        //check ensures that blocker refs must be valid
                        var blocker1 = props.grid[props.i + LURDMoves[border1][0]]
                                                [props.j + LURDMoves[border1][1]];
                        var blocker2 = props.grid[props.i + LURDMoves[border2][0]]
                                                [props.j + LURDMoves[border2][1]];


                        if (!blocker1.wall || !blocker2.wall) {
                            //one or both are open so we can move past
                            props.neighbors.push(node);
                        }
                    }else {
                        props.neighbors.push(node);
                    }
                }
                if (node.wall) {
                    props.neighboringWalls.push(node);
                }
            }
        }
    }

}

export default Cell