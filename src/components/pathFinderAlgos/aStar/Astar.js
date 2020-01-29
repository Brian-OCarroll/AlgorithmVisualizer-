import React, { useState } from 'react';
import Rows from './Rows'
const AStarPathFinder = () => {
    const [matrixSize, setMatrixSize] = useState(25)
    const [matrix, setMatrix] = useState(Array.from({ length: matrixSize }, () => Array.from({ length: matrixSize }, () => null))); //creates a 2d array
    const [start, setStart] = useState([4,5]);
    const [end, setEnd] = useState([11,12]);
    const [openSet, setOpenSet] = useState([start])
    const [closedSet, setClosedSet] = useState([]);
    const [lastCheckedNode, setLastCheckedNode] = useState(start);
    const [allowDiagonals, setAllowDiagonals] = useState(false);

    

    const handleMatrixChange = (event) => {
        
        let newSize = event.target.value
        if( newSize > 100) { //prevent matrix over 100x100
            newSize = 100;
        }
        let newArr = Array.from({ length: newSize }, () => Array.from({ length: newSize }, () => null))
        //when adding walls, remember to delete all walls on resize **************************************************************************
        // Delete them before settingMatrix
        setMatrixSize(newSize)
        setMatrix(newArr);
        
        
    };
    // const handleStartChange = (row, col, e) {

    // }

     //This function returns a measure of aesthetic preference for
    //use when ordering the openSet. It is used to prioritise
    //between equal standard heuristic scores. It can therefore
    //be anything you like without affecting the ability to find
    //a minimum cost path
    const visualDist = (a, b) => {
        return dist(a.i, a.j, b.i, b.j);
    }
    const heuristic = (a, b) => {
        var d;
        if (allowDiagonals) {
            d = dist(a.i, a.j, b.i, b.j);
        } else {
            //Manhattan distance formula
            d = Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
        }
        return d;
    }
    // euclidean distance formula
    const dist = (x1, x2, y1, y2) => {
        const a = x1 - x2;
        const b = y1 - y2;
        return Math.sqrt(a * a + b * b);
    }

    //returns copy of array without element in it
    //*****************Need to test this */
    const removeFromArray = (array, el) => {
        let arrayCopy = [...array]; // make a separate copy of the array
        const index = arrayCopy.indexOf(el)
        if (index !== -1) {
            const newArr = arrayCopy.splice(index, 1);
            return newArr
        }
    }
    const step = () => {

        if (openSet.length > 0) {

            // Best next option
            var winner = 0;
            for (var i = 1; i < openSet.length; i++) {
                if (openSet[i].f < openSet[winner].f) {
                    winner = i;
                }
                //if we have a tie according to the standard heuristic
                if (openSet[i].f == openSet[winner].f) {
                    //Prefer to explore options with longer known paths (closer to goal)
                    if (openSet[i].g > openSet[winner].g) {
                        winner = i;
                    }
                    //if we're using Manhattan distances then also break ties
                    //of the known distance measure by using the visual heuristic.
                    //This ensures that the search concentrates on routes that look
                    //more direct. This makes no difference to the actual path distance
                    //but improves the look for things like games or more closely
                    //approximates the real shortest path if using grid sampled data for
                    //planning natural paths.
                    if (!allowDiagonals) {
                        if (openSet[i].g == openSet[winner].g &&
                            openSet[i].vh < openSet[winner].vh) {
                            winner = i;
                        }
                    }
                }
            }
            var current = openSet[winner];
            lastCheckedNode = current;

            // Did I finish?
            if (current === end) {
                console.log("DONE!");
                return 1;
            }

            // Best option moves from openSet to closedSet
            removeFromArray(openSet, current);
            closedSet.push(current);

            // Check all the neighbors
            var neighbors = current.getNeighbors();

            for (var i = 0; i < neighbors.length; i++) {
                var neighbor = neighbors[i];

                // Valid next spot?
                if (!closedSet.includes(neighbor)) {
                    // Is this a better path than before?
                    var tempG = current.g + heuristic(neighbor, current);

                    // Is this a better path than before?
                    if (!openSet.includes(neighbor)) {
                        openSet.push(neighbor);
                    } else if (tempG >= neighbor.g) {
                        // No, it's not a better path
                        continue;
                    }

                    neighbor.g = tempG;
                    neighbor.h = heuristic(neighbor, end);
                    if (!allowDiagonals) {
                        neighbor.vh = visualDist(neighbor, end);
                    }
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }

            }
            return 0;
            // Uh oh, no solution
        } else {
            console.log('no solution');
            return -1;
        }
    }


    return (

        <div>
            <h1>Change Matrix Size</h1>
            <input type="number" value={matrixSize} onChange={handleMatrixChange}/>
            <Rows matrix={matrix} start={start} end={end}/>
        </div>
    )
}
// function unused() {
//     map = map;
//     lastCheckedNode = start;
//     openSet = [];
//     // openSet starts with beginning node only
//     openSet.push(start);
//     closedSet = [];
//     start = start;
//     end = end;
//     allowDiagonals = allowDiagonals;


//     const handleChange = (row, column, event) => {
//         let copy = [...matrix];
//         copy[row][column] = +event.target.value;
//         setMatrix(copy);

//         console.log(matrix);
//     };

//     //This function returns a measure of aesthetic preference for
//     //use when ordering the openSet. It is used to prioritise
//     //between equal standard heuristic scores. It can therefore
//     //be anything you like without affecting the ability to find
//     //a minimum cost path.

//     visualDist = function (a, b) {
//         return dist(a.i, a.j, b.i, b.j);
//     }

//     // An educated guess of how far it is between two points

//     heuristic = function (a, b) {
//         var d;
//         if (allowDiagonals) {
//             d = dist(a.i, a.j, b.i, b.j);
//         } else {
//             d = abs(a.i - b.i) + abs(a.j - b.j);
//         }
//         return d;
//     }

//     // Function to delete element from the array
//     removeFromArray = function (arr, elt) {
//         // Could use indexOf here instead to be more efficient
//         for (var i = arr.length - 1; i >= 0; i--) {
//             if (arr[i] == elt) {
//                 arr.splice(i, 1);
//             }
//         }
//     }

//     //Run one finding step.
//     //returns 0 if search ongoing
//     //returns 1 if goal reached
//     //returns -1 if no solution
//     step = function () {

//         if (openSet.length > 0) {

//             // Best next option
//             var winner = 0;
//             for (var i = 1; i < openSet.length; i++) {
//                 if (openSet[i].f < openSet[winner].f) {
//                     winner = i;
//                 }
//                 //if we have a tie according to the standard heuristic
//                 if (openSet[i].f == openSet[winner].f) {
//                     //Prefer to explore options with longer known paths (closer to goal)
//                     if (openSet[i].g > openSet[winner].g) {
//                         winner = i;
//                     }
//                     //if we're using Manhattan distances then also break ties
//                     //of the known distance measure by using the visual heuristic.
//                     //This ensures that the search concentrates on routes that look
//                     //more direct. This makes no difference to the actual path distance
//                     //but improves the look for things like games or more closely
//                     //approximates the real shortest path if using grid sampled data for
//                     //planning natural paths.
//                     if (!allowDiagonals) {
//                         if (openSet[i].g == openSet[winner].g &&
//                             openSet[i].vh < openSet[winner].vh) {
//                             winner = i;
//                         }
//                     }
//                 }
//             }
//             var current = openSet[winner];
//             lastCheckedNode = current;

//             // Did I finish?
//             if (current === end) {
//                 console.log("DONE!");
//                 return 1;
//             }

//             // Best option moves from openSet to closedSet
//             removeFromArray(openSet, current);
//             closedSet.push(current);

//             // Check all the neighbors
//             var neighbors = current.getNeighbors();

//             for (var i = 0; i < neighbors.length; i++) {
//                 var neighbor = neighbors[i];

//                 // Valid next spot?
//                 if (!closedSet.includes(neighbor)) {
//                     // Is this a better path than before?
//                     var tempG = current.g + heuristic(neighbor, current);

//                     // Is this a better path than before?
//                     if (!openSet.includes(neighbor)) {
//                         openSet.push(neighbor);
//                     } else if (tempG >= neighbor.g) {
//                         // No, it's not a better path
//                         continue;
//                     }

//                     neighbor.g = tempG;
//                     neighbor.h = heuristic(neighbor, end);
//                     if (!allowDiagonals) {
//                         neighbor.vh = visualDist(neighbor, end);
//                     }
//                     neighbor.f = neighbor.g + neighbor.h;
//                     neighbor.previous = current;
//                 }

//             }
//             return 0;
//             // Uh oh, no solution
//         } else {
//             console.log('no solution');
//             return -1;
//         }
//     }
// }
// An object to describe a spot in the grid
// function Spot(i, j, x, y, width, height, isWall, grid) {

//     grid = grid;

//     // Location
//     i = i;
//     j = j;
//     x = x;
//     y = y;
//     width = width;
//     height = height;

//     // f, g, and h values for A*
//     f = 0;
//     g = 0;
//     h = 0;
//     vh = 0; //visual heuristic for prioritising path options
//     // Neighbors
//     neighbors = undefined;
//     neighboringWalls = undefined;
//     // Where did I come from?
//     previous = undefined;
//     // Am I an wall?
//     wall = isWall;

//     // Did the maze algorithm already visit me?
//     visited = false;

//     // Display me
//     show = function (color) {
//         if (wall) {
//             fill(0);
//             noStroke();

//             if (drawingOption === 0) {
//                 ellipse(x + width * 0.5, y + width * 0.5, width * 0.5, height * 0.5);
//             } else {
//                 rect(x, y, width, height);
//             }

//             stroke(0);
//             strokeWeight(width / 2);

//             var nWalls = getNeighboringWalls(grid);
//             for (var i = 0; i < nWalls.length; i++) {
//                 var nw = nWalls[i];

//                 // Draw line between this and bottom/right neighbor walls
//                 if ((nw.i > i && nw.j == j) ||
//                     (nw.i == i && nw.j > j)) {
//                     line(x + width / 2,
//                         y + height / 2,
//                         nw.x + nw.width / 2,
//                         nw.y + nw.height / 2);
//                 }

//                 // Draw line between this and bottom-left/bottom-right neighbor walls
//                 if (!canPassThroughCorners && (nw.j > j) &&
//                     (nw.i < i || nw.i > i)) {
//                     line(x + width / 2,
//                         y + height / 2,
//                         nw.x + nw.width / 2,
//                         nw.y + nw.height / 2);
//                 }
//             }
//         } else if (color) {
//             fill(color);
//             noStroke();
//             rect(x, y, width, height);
//         }
//     }

//     getNeighbors = function () {
//         if (!neighbors) {
//             populateNeighbors();
//         }
//         return neighbors;
//     }

//     getNeighboringWalls = function (grid) {

//         if (!neighboringWalls) {
//             populateNeighbors();
//         }

//         return neighboringWalls;
//     }

//     //maybe should be static properties?
//     //left right up down movements
//     var LURDMoves = [
//         [-1, 0],
//         [0, -1],
//         [1, 0],
//         [0, 1]
//     ];
//     var DiagonalMoves = [
//         [-1, -1],
//         [1, -1],
//         [1, 1],
//         [-1, 1]
//     ];
//     //references to the LURDMoves entries that would block the diagonal
//     //if they are both walls and canPassThroughCorners = false
//     var DiagonalBlockers = [
//         [0, 1],
//         [1, 2],
//         [2, 3],
//         [3, 0]
//     ];

//     //return node or null if request is out of bounds
//     getNode = function (i, j) {
//         if (i < 0 || i >= grid.length ||
//             j < 0 || j >= grid[0].length) {
//             return null;
//         }
//         return grid[i][j];
//     }

//     //populate neighbor move and neighbor wall arrays
//     populateNeighbors = function () {
//         neighbors = [];
//         neighboringWalls = [];

//         //Add Left/Up/Right/Down Moves
//         for (var i = 0; i < 4; i++) {
//             var node = getNode(i + LURDMoves[i][0], j + LURDMoves[i][1]);
//             if (node != null) {
//                 if (!node.wall) {
//                     neighbors.push(node);
//                 } else {
//                     neighboringWalls.push(node);
//                 }
//             }
//         }

//         //Add Diagonals

//         for (var i = 0; i < 4; i++) {
//             var gridX = i + DiagonalMoves[i][0];
//             var gridY = j + DiagonalMoves[i][1];

//             var node = getNode(gridX, gridY);

//             if (node != null) {
//                 if (allowDiagonals && !node.wall) {
//                     if (!canPassThroughCorners) {
//                         //Check if blocked by surrounding walls
//                         var border1 = DiagonalBlockers[i][0];
//                         var border2 = DiagonalBlockers[i][1];
//                         //no need to protect against OOB as diagonal move
//                         //check ensures that blocker refs must be valid
//                         var blocker1 = grid[i + LURDMoves[border1][0]]
//                         [j + LURDMoves[border1][1]];
//                         var blocker2 = grid[i + LURDMoves[border2][0]]
//                         [j + LURDMoves[border2][1]];


//                         if (!blocker1.wall || !blocker2.wall) {
//                             //one or both are open so we can move past
//                             neighbors.push(node);
//                         }
//                     } else {
//                         neighbors.push(node);
//                     }
//                 }
//                 if (node.wall) {
//                     neighboringWalls.push(node);
//                 }
//             }
//         }
//     }

// }

//h = |xstart-xdest| + |ystart - ydest|
// f(n) = g(n) + h(n)
//f is estimated total cost of path through node n
//g is cost so far to reach node n
//h is estimated cost from n to goal. heuristic part so guessing
//binary heap has a regular shape so an array can hold it's values.
// Node -
//   left child = 2i
//   right child = 2i+1
//   parent = i/2
//openSet nodes that need to be evaluated []
// closedSet nodes that need to be evaluated []
// class BinaryHeap {
//   constructor(scoreFunction) {
//     content = [];
//     scoreFunction = scoreFunction
//   }
//   push(element) {
//     // Add the new element to the end of the array.
//     content.push(element);

//     // Allow it to sink down.
//     sinkDown(content.length - 1);
//   }
//   pop() {
//     // Store the first element so we can return it later.
//     var result = content[0];
//     // Get the element at the end of the array.
//     var end = content.pop();
//     // If there are any elements left, put the end element at the
//     // start, and let it bubble up.
//     if (content.length > 0) {
//       content[0] = end;
//       bubbleUp(0);
//     }
//     return result;
//   }
//   remove(node) {
//     var i = content.indexOf(node);

//     // When it is found, the process seen in 'pop' is repeated
//     // to fill up the hole.
//     var end = content.pop();

//     if (i !== content.length - 1) {
//       content[i] = end;

//       if (scoreFunction(end) < scoreFunction(node)) {
//         sinkDown(i);
//       } else {
//         bubbleUp(i);
//       }
//     }
//   }
//   size() {
//     return content.length;
//   }
//   rescoreElement(node) {
//     sinkDown(content.indexOf(node));
//   }
//   sinkDown(n) {
//     // Fetch the element that has to be sunk.
//     var element = content[n];

//     // When at 0, an element can not sink any further.
//     while (n > 0) {

//       // Compute the parent element's index, and fetch it.
//       var parentN = ((n + 1) >> 1) - 1;
//       var parent = content[parentN];
//       // Swap the elements if the parent is greater.
//       if (scoreFunction(element) < scoreFunction(parent)) {
//         content[parentN] = element;
//         content[n] = parent;
//         // Update 'n' to continue at the new position.
//         n = parentN;
//       }
//       // Found a parent that is less, no need to sink any further.
//       else {
//         break;
//       }
//     }
//   }
//   bubbleUp(n) {
//     // Look up the target element and its score.
//     var length = content.length;
//     var element = content[n];
//     var elemScore = scoreFunction(element);

//     while (true) {
//       // Compute the indices of the child elements.
//       var child2N = (n + 1) << 1;
//       var child1N = child2N - 1;
//       // This is used to store the new position of the element, if any.
//       var swap = null;
//       var child1Score;
//       // If the first child exists (is inside the array)...
//       if (child1N < length) {
//         // Look it up and compute its score.
//         var child1 = content[child1N];
//         child1Score = scoreFunction(child1);

//         // If the score is less than our element's, we need to swap.
//         if (child1Score < elemScore) {
//           swap = child1N;
//         }
//       }

//       // Do the same checks for the other child.
//       if (child2N < length) {
//         var child2 = content[child2N];
//         var child2Score = scoreFunction(child2);
//         if (child2Score < (swap === null ? elemScore : child1Score)) {
//           swap = child2N;
//         }
//       }

//       // If the element needs to be moved, swap it, and continue.
//       if (swap !== null) {
//         content[n] = content[swap];
//         content[swap] = element;
//         n = swap;
//       }
//       // Otherwise, we are done.
//       else {
//         break;
//       }
//     }
//   }
// };

// class BinaryHeap {

// }

export default AStarPathFinder