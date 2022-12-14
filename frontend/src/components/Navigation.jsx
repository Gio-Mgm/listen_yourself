import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from 'react-bootstrap'
// import Dashboard from './Dashboard';
// import Analyze from './Analyze';


const Navigation = ({ isLinked, setView, ThemeToggler, theme}) => {

    const searchForm = (
        <Form className="d-flex">
            <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
            />
            <Button variant="secondary">Search</Button>
        </Form>
    )

    return (
        <Navbar bg={theme} variant={theme} expand="lg">
            <Container fluid>
                <Navbar.Brand id="brand">& Listen Yourself</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav    onSelect={e => setView(e)} className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                        <Nav.Item><Nav.Link active={true} eventKey="Prediction">Prediction</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link eventKey="Profile">Profile</Nav.Link></Nav.Item>
                        {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                            </NavDropdown>
                        <Nav.Link href="#" disabled>Link</Nav.Link> */}
                    </Nav>
                    {searchForm}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
