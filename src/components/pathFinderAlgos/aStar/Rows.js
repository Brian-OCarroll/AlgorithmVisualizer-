import React from 'react';
let rowContainerStyle = {
    display: "flex",
    flexDirection: 'row'
}
let rowStyle = {
    height: "25px",
    width: "25px",
    background: "light-gray",
    border: "1px solid black",
    display: "flex",
    flexDirection: "column",
    margin: "2px",
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
}
const Rows = (props) => {

    return (
        <div style={rowContainerStyle}>
            {props.matrix.map((row, rowIndex) => {

                return (
                    <div id="row"key={rowIndex}>
                        {row.map((col, colIndex) => {
                            return (
                                <div style={rowStyle}>

                                </div>
                            )
                        })}
                    </div>
                )

            })}
        </div>

    )
}
export default Rows

