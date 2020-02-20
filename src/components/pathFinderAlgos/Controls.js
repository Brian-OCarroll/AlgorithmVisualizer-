import  React, {useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Tab, Nav, Col, Sonnet, Row } from 'react-bootstrap';
import './Controls.css'

const Controls = (props) => {
    const [toggleMenu, setToggleMenu] = useState(false);
    let handleToggle = () => {
        setToggleMenu(!toggleMenu) 
    }
    let toggleClass = toggleMenu ? "overlay--expanded" : "overlay--closed";
    return (
        <>
        <div id="myNav" className={"overlay " + toggleClass}>
        <a href="javascript:void(0)" className="closebtn" onClick={() => {handleToggle()}}>×</a>
            <div id="mySidebar" className="overlay-content" >
  
                <p>Select an Algorithm</p>
                <select name="algo" value={props.algo} onChange={(e) => {props.handleChange(e)}}>
                     {props.algorithms.map((algo, i) => {
                        return (
                            <option key={i} value={algo}>{algo}</option>
                        )
                    })}
                </select>
                <p>Select A Heuristic</p>
                <select name="heuristic" value={props.heuristic} onChange={(e) => {props.handleChange(e)}} >
                    {props.heuristics.map((heuristic, i) => {
                        return (
                            <option  key={i} value={heuristic}>{heuristic}</option>
                        )
                    })}
                </select>
                <p>Options</p>
                <div className="flex flex--column">
                {props.options.map((opt, i) => {
                    return (

                            <label>
                                <span className="check-label" >{opt}</span>
                                <input
                                    name={opt}
                                    type="checkbox"
                                    onChange={(e) => {props.handleChange(e)}}
                                checked={props[opt]}
                                // onChange={this.handleInputChange} 
                                />
                            </label>
                       

                    )
                })}
                </div>
            </div>
            
        </div>
        <button class="openbtn" onClick={() => {handleToggle()}}>&#9776; Open Options</button>
        </>
    )
}


export default Controls