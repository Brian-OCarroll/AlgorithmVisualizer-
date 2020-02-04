import React from 'react'
import './Node.css'
// cell class that allows for assignable properties
// class Node {
//     constructor(col, row, wall) {
//         /**
//          * The x coordinate of the node on the grid.
//          * @type number
//          */
//         this.x = col;
//         /**
//          * The y coordinate of the node on the grid.
//          * @type number
//          */
//         this.y = row;
//         /**
//          * Whether this node can be walked through.
//          * @type boolean
//          */
//         this.wall = wall || false

//     }

// }
class Node extends React.Component {
    render() {
        const {
            x,
            isEnd,
            isStart,
            isWall,
            MouseDown,
            MouseEnter,
            MouseUp,
            y,
        } = this.props;
        const extraClassName = isEnd
            ? 'node-finish'
            : isStart
                ? 'node-start'
                : isWall
                    ? 'node-wall'
                    : '';

        return (
            <div
                id={`node-${y}-${x}`}
                className={`node ${extraClassName}`}
                onMouseDown={(e) => MouseDown(x, y, e)}
                onMouseEnter={(e) => MouseEnter(x, y, e)}
                onMouseUp={(e) => MouseUp(x, y, e)}></div>
        );
    }
}

export default Node