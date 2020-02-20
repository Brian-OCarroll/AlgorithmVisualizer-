import React from 'react'
import './Node.css'

class Node extends React.Component {
    render() {
        const {
            x,
            isEnd,
            isStart,
            isWall,
            active,
            MouseDown,
            MouseEnter,
            MouseUp,
            y,
            nodeSize,
            gridWidth,
            gridHeight,
            opened,
            closed,
            path
        } = this.props;

        this.x = ((x % gridWidth) * nodeSize) + 1; //get grid placement y-axis
        this.y = (Math.floor(y % gridHeight) * nodeSize) + 1 //get grid placement x-axis
        const extraClassName =
            isEnd && active
                ? 'node-finish--active'
                : isStart && active
                    ? 'node-start--active'
                    :
                    isEnd
                        ? 'node-finish'
                        : isStart
                            ? 'node-start'
                            : isWall
                                ? 'node-wall':
                                  path ? 'node-path' : closed ? 'node-closed' : opened ? 'node-opened' : "";

        //might need to get rid of this if doesn't work
        // const pathClassName = path ? 'node-path' : closed ? 'node-closed' : opened ? 'node-opened' : '';
        const pathClassName = ""
        return (
            <g
                id={`node-${y}-${x}`}
                // className={`node ${extraClassName} ${activeClassName}`}
                onMouseDown={(e) => MouseDown(x, y, e)}
                onMouseEnter={(e) => MouseEnter(x, y, e)}
                onMouseUp={(e) => MouseUp(x, y, e)}>

                <rect
                    id={`node-${y}-${x}`}
                    className={`node ${extraClassName} ${pathClassName} `}
                    x={this.x}
                    y={this.y}
                    width={nodeSize - 1}
                    height={nodeSize - 1}
                />
            </g>
        );
    }
}

export default Node