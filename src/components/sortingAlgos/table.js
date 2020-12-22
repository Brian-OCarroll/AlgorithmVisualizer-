import React, { useState, useEffect } from 'react';

function Table() {
    const tableWidth = window.innerWidth * .90;
    const [tableXSize, setTableXSize] = useState(30);

    const tableData = Array.apply(null, new Array(tableXSize)).map((el, i) => {
        return {
            color: ((1 << 24) * Math.random() | 0).toString(16),
            size: Math.floor(Math.random() * 50)
        }
    })
    const [table, setTable] = useState(tableData)
    const tableStyle = { "display": "flex", "borderLeft:": "1px solid black", "borderBottom": "1px solid black", "width": `${tableWidth}px`, "alignItems": "flex-end", "verticalAlign": "center" }



    return (
        <div>
            <div style={tableStyle}>

                {table.map((column, i) => {
                    return (
                        <React.Fragment>
                            <div key={i} style={{ "margin": "0 3px", "width": `${(tableWidth / tableXSize) - 3}px`, "height": `${5 * column.size}px`, "backgroundColor": `#${column.color}` }}></div>
                        </React.Fragment>
                    )
                })}

            </div>
            <button >Sort!</button>
        </div>
    )
}


export default Table