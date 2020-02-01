import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Controls.css'
const Controls = (props) => {
    let menuDirection = props.direction
    return (
        <Menu isOpen={true} left>
            <a id="woah" className="menu-item" href="/">Manure</a>
            <a id="woah" className="menu-item" href="/">Manure</a>
        </Menu>
    )
}
export default Controls