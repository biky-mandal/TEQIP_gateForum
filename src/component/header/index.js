import React, { useState } from 'react';
import './style.css';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';


/**
* @author
* @function Header
**/

const Header = (props,isAuth) => {
    return (
        <div className="header">
            <Navbar className="navbar-bg" collapseOnSelect expand="md" variant="dark">
                <Navbar.Brand href="/" className="navlogo">TEQIPGATEFORUM</Navbar.Brand>
                <Navbar.Toggle className="custom-toggler" aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <li className="nav-item">
                            <NavLink to="" className="nav-link link2 navtags" >Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="testseries" activeClassName="activeLink" className="nav-link link2 navtags" >testseries</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="profile" activeClassName="activeLink" className="nav-link link2 navtags" >profile</NavLink>
                        </li>

                        {!isAuth?( <li className="nav-item">
                            <NavLink to="login" activeClassName="activeLink" className="nav-link navtags" >login</NavLink>
                        </li>):(<></>)}
                       


                        <li className="nav-item">
                            <NavLink to="register" activeClassName="activeLink" className="nav-link navtags">register</NavLink>
                        </li>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header