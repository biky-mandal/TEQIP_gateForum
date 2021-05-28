import React from 'react';
import './style.css';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogoutAction } from '../../redux/actions/authAction';


/**
* @author
* @function Header
**/

const Header = (props) => {

    const dispatch = useDispatch();

    const token = localStorage.getItem('token');
    const displayName = localStorage.getItem('displayName');

    const logoutFunction = () => {
        dispatch(LogoutAction());
    }

    const renderLoggedInLinks = () => {
        return(
            <>
                <li className="nav-item">
                    <NavLink to="profile" className="nav-link navtags profile__btn">{displayName ? displayName : 'User'}</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/" onClick={logoutFunction} className="nav-link navtags"><span></span>LogOut</NavLink>
                </li>
            </>
        );
    }

    const renderNonLoggedInLinks = () => {
        return(
            <>
                <li className="nav-item">
                    <NavLink to="login" className="nav-link navtags">Login</NavLink>
                </li>
                <li className="nav-item register-li">
                    <NavLink to="register" className=" nav-link navtags">Register</NavLink>
                </li>
            </>
        );
    }
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
                        {
                            token ? 
                                renderLoggedInLinks()
                            :
                                renderNonLoggedInLinks()
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header