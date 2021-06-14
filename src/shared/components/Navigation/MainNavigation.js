import React, {useContext} from 'react';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'

import { FaGithub } from "react-icons/all";

import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/auth-hook";
import {AuthContext} from "../../context/auth-context";

import styles from './MainNavigation.module.css'

const MainNavigation = () => {
    const auth = useContext(AuthContext)

    const signOutHandler = () => {
        auth.logout()
    }

    return (
        <Navbar bg="#a9d6e5" expand="lg">
            <Navbar.Brand className={styles.NavTitle} id={styles.idNav} >Week Journal</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {auth.isLoggedIn && <Nav.Link as={Link} to="/" >Home</Nav.Link>}
                    <Nav.Link as={Link} to="/about" >About</Nav.Link>
                </Nav>
                <a href="https://github.com/Anting-Chang/weeko-meter">
                    <FaGithub className={styles.githubIcon}/>
                </a>
                {!auth.isLoggedIn && <Link to="/login">
                    <Button variant="outline-success">Login</Button>
                </Link>}
                {auth.isLoggedIn && <Button variant="outline-dark" onClick={signOutHandler}>Sign Out</Button>}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MainNavigation;
