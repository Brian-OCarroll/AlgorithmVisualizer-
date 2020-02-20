import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Algorithm Visualizer</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#features">PathFinders</Nav.Link>
                    <Nav.Link href="#pricing">Sorting</Nav.Link>
                    <NavDropdown title="Data Structures" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Next Update</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Next Update</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Next Update</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Next Update</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="https://brianocarroll.dev/">Portfolio</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Other Projects
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;