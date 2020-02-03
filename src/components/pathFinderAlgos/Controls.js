import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Tab, Nav, Col, Sonnet, Row } from 'react-bootstrap';
import './Controls.css'
// const Controls = (props) => {
//     let menuDirection = props.direction
//     return (
//         <Menu isOpen={true} left>
//             <a id="woah" className="menu-item" href="/">Manure</a>
//             <a id="woah" className="menu-item" href="/">Manure</a>
//         </Menu>
//     )
// }
// const Controls = (props) => {
//     return (
//         <Tab.Container id="left-tabs-example" defaultActiveKey="first">
//             <Row>
//                 <Col sm={3}>
//                     <Nav variant="pills" className="flex-column">
//                         {props.algorithms.map((algo, i) => {
//                             return (
//                                 <Nav.Item>
//                                     <Nav.Link eventKey={i}>{algo.name}</Nav.Link>
//                                 </Nav.Item>
//                             )
//                         })}
//                     </Nav>
//                 </Col>
//                 <Col sm={6}>
//                     <Tab.Content>
//                         <Tab.Pane eventKey="first">
//                             <h1>Thing</h1>
//                         </Tab.Pane>
//                         <Tab.Pane eventKey="second">
//                             <h1>Thing 2</h1>
//                         </Tab.Pane>
//                     </Tab.Content>
//                     <Tab.Content>
//                         <Tab.Pane eventKey="first">
//                             <h1>Thing</h1>
//                         </Tab.Pane>
//                         <Tab.Pane eventKey="second">
//                             <h1>Thing 2</h1>
//                         </Tab.Pane>
//                     </Tab.Content>
//                 </Col>
//                 <Col sm={6}>
//                    <Tab.Content>

//                    </Tab.Content>

//                 </Col>
//                 {/* <Col sm={12}>

//                 </Col> */}
//             </Row>
//         </Tab.Container>

//     )
// }
const Controls = (props) => {
    let i = props.algoIndex || 0;
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="0">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        {props.algorithms.map((algo, i) => { //map the algorithm names to nav links
                            return (
                                <Nav.Item>
                                    <Nav.Link eventKey={i}>{algo}</Nav.Link>
                                </Nav.Item>
                            )
                        })}
                    </Nav>
                </Col>
                <Col sm={6}>
                <Tab.Content eventKey={i}>
                            <Tab.Pane eventKey={i}>
                                <p eventKey={i} >Heuristics</p>
                                {props.algoSelections[i].heuristics.map((heuristic, heurIndex) => {
                                    return (
                                        
                                            
                                                <label>
                                                    {heuristic}
                                                    <input type="radio" value={heuristic}  />
                                                </label>
                                            

                                        
                                    )
                                })}
                                </Tab.Pane>
                            </Tab.Content>
                            <Tab.Content eventKey={i}>
                            <Tab.Pane eventKey={i}>
                                <p eventKey={i} >Options</p>
                                {props.algoSelections[i].options.map((option, optIndex) => {
                                    return (
                                        
                                            
                                                <label>
                                                    {option}
                                                    <input type="radio" value={option}  />
                                                </label>
                                            

                                        
                                    )
                                })}
                                </Tab.Pane>
                            </Tab.Content>
                


                </Col>

            </Row>
        </Tab.Container>

    )
}
export default Controls