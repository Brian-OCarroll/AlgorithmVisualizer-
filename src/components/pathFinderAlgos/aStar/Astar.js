import BinaryHeap from '../BinaryHeap';
import Heuristic from '../Heuristics';
import Util from '../Util';
/**
 * A* path-finder. Based upon https://github.com/bgrins/javascript-astar
 * @constructor
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching 
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 * @param {number} opt.weight Weight to apply to the heuristic to allow for
 *     suboptimal paths, in order to speed up the search.
 */
class AStarFinder {
    constructor(opt) {
        opt = opt || {};
        this.allowDiagonals = opt.allowDiagonals;
        this.dontCrossCorners = opt.canPassThroughCorners;
        this.heuristic = opt.heuristic || Heuristic.manhattan;
        this.weight = opt.weight || 1;
        // this.diagonalMovement = opt.diagonalMovement;

        if (!this.allowDiagonals) {
            this.heuristic = opt.heuristic || Heuristic.manhattan;
        } else {
            this.heuristic = opt.heuristic || Heuristic.octile;
        }
    }



    /**
     * Find and return the the path.
     * @return {Array<Array<number>>} The path, including both start and
     *     end positions.
     */
    findPath =  (startNode, endNode, grid) => {
        let openList = new BinaryHeap(function (node) {
            return node.f;
        }),

            heuristic = this.heuristic,
            weight = this.weight,
            abs = Math.abs, SQRT2 = Math.SQRT2,
            node, neighbors, neighbor, i, l, x, y, ng;
            
        // set the `g` and `f` value of the start node to be 0
        startNode.g = 0;
        startNode.f = 0;

        // push the start node into the open list
        openList.push(startNode);
        startNode.opened = true;

        // while the open list is not empty
        while (!(openList.size() === 0)) {
            // pop the position of node which has the minimum `f` value.
            node = openList.pop();
            node.closed = true;
            console.log(node)
            // if reached the end position, construct the path and return it
            if (node === endNode) {
                return Util.backtrace(endNode);
            }

            // get neigbours of the current node
            neighbors = grid.getNeighbors(node.x, node.y);
            for (i = 0, l = neighbors.length; i < l; ++i) {
                neighbor = neighbors[i];

                if (neighbor.closed) {
                    continue;
                }

                x = neighbor.x;
                y = neighbor.y;

                // get the distance between current node and the neighbor
                // and calculate the next g score
                ng = node.g + ((x - node.x === 0 || y - node.y === 0) ? 1 : SQRT2);

                // check if the neighbor has not been inspected yet, or
                // can be reached with smaller cost from the current node
                if (!neighbor.opened || ng < neighbor.g) {
                    neighbor.g = ng;
                    neighbor.h = neighbor.h || weight * heuristic(abs(x - endNode.x), abs(y - endNode.y));
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = node;

                    if (!neighbor.opened) {
                        openList.push(neighbor);
                        neighbor.opened = true;
                    } else {
                        // the neighbor can be reached with smaller cost.
                        // Since its f value has been updated, we have to
                        // update its position in the open list
                        openList.rescoreElement(neighbor);
                    }
                }
            } // end for each neighbor
            console.log(openList)
        } // end while not open list empty

        // fail to find the path
        return [];
    };
}
export default AStarFinder