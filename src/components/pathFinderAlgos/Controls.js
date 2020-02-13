import  React, {useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Tab, Nav, Col, Sonnet, Row } from 'react-bootstrap';
import './Controls.css'

// const Controls = (props) => {
//     let i = props.algoIndex || 0;
//     return (
//         <Tab.Container id="left-tabs-example" defaultActiveKey="0">
//             <Row>
//                 <Col sm={3}>
//                     <Nav variant="pills" className="flex-column">
//                         {props.algorithms.map((algo, i) => { //map the algorithm names to nav links
//                             return (
//                                 <Nav.Item>
//                                     <Nav.Link eventKey={i}>{algo}</Nav.Link>
//                                 </Nav.Item>
//                             )
//                         })}
//                     </Nav>
//                 </Col>
//                 <Col sm={6}>
//                 <Tab.Content eventKey={i}>
//                             <Tab.Pane eventKey={i}>
//                                 <p eventKey={i} >Heuristics</p>
//                                 {props.algoSelections[i].heuristics.map((heuristic, heurIndex) => {
//                                     return (


//                                                 <label>
//                                                     {heuristic}
//                                                     <input type="radio" value={heuristic}  />
//                                                 </label>



//                                     )
//                                 })}
//                                 </Tab.Pane>
//                             </Tab.Content>
//                             <Tab.Content eventKey={i}>
//                             <Tab.Pane eventKey={i}>
//                                 <p eventKey={i} >Options</p>
//                                 {props.algoSelections[i].options.map((option, optIndex) => {
//                                     return (


//                                                 <label>
//                                                     {option}
//                                                     <input type="radio" value={option}  />
//                                                 </label>



//                                     )
//                                 })}
//                                 </Tab.Pane>
//                             </Tab.Content>



//                 </Col>

//             </Row>
//         </Tab.Container>

//     )
// }
// const Controls = (props) => {
//     return (
        // <Row>
        //     <Col>
        //         <p>Select An Algorithm</p>
        //         <select value={props.algo} onChange={(e) => {this.handleChange(e)}}>
        //             {props.algorithms.map((algo, i) => {
        //                 return (
        //                     <option key={i} value={algo}>{algo}</option>
        //                 )
        //             })}
        //         </select>
        //     </Col>
        //     <Col>
                // <p>Select A Heuristic</p>
                // <select value={props.heuristic} onChange={(e) => {this.handleChange(e)}} >
                //     {props.heuristics.map((heuristic, i) => {
                //         return (
                //             <option  key={i} value={heuristic}>{heuristic}</option>
                //         )
                //     })}
                // </select>
        //     </Col>
        //     <Col>
        //     <Row>Options</Row>
                // {props.options.map((opt, i) => {
                //     return (
                //         <Row>
                //             <label>
                //                 {opt}
                //                 <input
                //                     name={opt}
                //                     type="checkbox"
                //                     onChange={(e) => {this.handleChange(e)}}
                //                 // checked={this.state[opt]}
                //                 // onChange={this.handleInputChange} 
                //                 />
                //             </label>
                //         </Row>

                //     )
                // })}

        //     </Col>
        // </Row>
//     )
// }
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
                <select value={props.algo} onChange={(e) => {this.handleChange(e)}}>
                     {props.algorithms.map((algo, i) => {
                        return (
                            <option key={i} value={algo}>{algo}</option>
                        )
                    })}
                </select>
                <p>Select A Heuristic</p>
                <select value={props.heuristic} onChange={(e) => {this.handleChange(e)}} >
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
                                    onChange={(e) => {this.handleChange(e)}}
                                // checked={this.state[opt]}
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