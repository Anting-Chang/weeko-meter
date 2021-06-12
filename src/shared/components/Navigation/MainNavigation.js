import React, {useContext} from 'react';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'

import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/auth-hook";
import {AuthContext} from "../../context/auth-context";

const MainNavigation = () => {
    const auth = useContext(AuthContext)

    const signOutHandler = () => {
        auth.logout()
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>Week Journal</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {auth.isLoggedIn && <Nav.Link as={Link} to="/" >Home</Nav.Link>}
                </Nav>
                {!auth.isLoggedIn && <Link to="/login">
                    <Button variant="outline-success">Login</Button>
                </Link>}
                {auth.isLoggedIn && <Button variant="outline-dark" onClick={signOutHandler}>Sign Out</Button>}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MainNavigation;
