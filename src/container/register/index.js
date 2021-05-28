import React, { useEffect, useState } from 'react';
import './style.css';
import {NavLink, Redirect} from 'react-router-dom';
import {FiChevronLeft} from 'react-icons/fi';
import {FaTelegramPlane, FaTwitter, FaInstagram, FaFacebookF} from 'react-icons/fa';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Col, Container, Row, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import Loader from 'react-loader-spinner'

import {RegisterAction} from '../../redux/actions/authAction';

/**
* @author
* @function Registerpage
**/

const Registerpage = (props) => {
  
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const [userEmail, setUserEmail] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userBranch, setUserBranch] = useState('');
  const [userCollege, setUserCollege] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const Course = [
    'Select Your Branch',
    'Computer Science & Engineering', 
    'Instrumentation Engineering', 
    'Mechanical Engineering', 
    'Civil Engineering',
    'Electrical Engineering'
]

  const Colleges = [
    'Select Your Institution',
    'Computer Science & Engineering', 
    'Instrumentation Engineering', 
    'Mechanical Engineering', 
    'Civil Engineering',
    'Electrical Engineering'
]

    if(auth.authenticate){
        return <Redirect to={'/'} />
    }


  const registerUser = (e) => {
      e.preventDefault();
      const registerUserDetails = {
          userEmail,
          userFullName,
          userPhone,
          userBranch,
          userCollege,
          userPassword
      }
      dispatch(RegisterAction(registerUserDetails));
  }

  return(
    <div className="login_div">
        <div className="header_div_in_login">
            <NavLink to="login" className="back_to_home_lbl"><span><FiChevronLeft/></span>Login</NavLink>
        </div>
        <div className="body_div_in_login">
            <div className="main_register_component">
                <label className="login_lbl">Registration Form</label>
                <span>By Registering in Our Website You Agree our Terms and Conditions and Privacy Policy</span>
                <Container>
                    <Row style={{}}>
                        <Col md={{ span: 12, offset: 0 }}>
                        <ValidatorForm useref="form" onSubmit={registerUser}>
                        <Row style={{}}>
                            <Col md={{ span: 6, offset: 0 }}>
                                <TextValidator
                                    className="input-field"
                                    placeholder="Enter Your FullName"
                                    value={userFullName}
                                    type="text"
                                    variant="outlined"
                                    validators={["required", "minStringLength:3"]}
                                    errorMessages={[
                                    "this field is required",
                                    "Minimum Length should be 3",
                                    ]}
                                    onChange={(e) => setUserFullName(e.target.value)}
                                />
                            </Col>
                            <Col md={{ span: 6, offset: 0 }}>
                                <TextValidator
                                    className="input-field"
                                    placeholder="Enter Phone Number"
                                    value={userPhone}
                                    type="number"
                                    variant="outlined"
                                    validators={["required", "minStringLength:3"]}
                                    errorMessages={[
                                    "this field is required",
                                    "Minimum Length should be 10",
                                    ]}
                                    onChange={(e) => setUserPhone(e.target.value)}
                                />
                            </Col>

                        </Row>

                        <Row style={{}}>
                            <Col md={{ span: 6, offset: 0 }}>
                                <TextValidator
                                    className="input-field"
                                    placeholder="Enter Email"
                                    value={userEmail}
                                    type="email"
                                    variant="outlined"
                                    validators={[
                                        "required",
                                        "matchRegexp:^([a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*.[a-zA-Z]{2,7})$",
                                    ]}
                                    errorMessages={[
                                        "this field is required",
                                        "Email is not valid",
                                    ]}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                />
                            </Col>
                            <Col md={{ span: 6, offset: 0 }}>
                                <TextValidator
                                    className="input-field"
                                    placeholder="Enter Password"
                                    value={userPassword}
                                    type="password"
                                    variant="outlined"
                                    validators={["required", "minStringLength:10"]}
                                    errorMessages={[
                                    "this field is required",
                                    "Minimum Length should be 10",
                                    ]}
                                    onChange={(e) => setUserPassword(e.target.value)}
                                />
                            </Col>



                        </Row>

                        <Row style={{}}>
                            <Col md={{ span: 6, offset: 0 }}>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Control 
                                        className="input-field"
                                        as="select"
                                        onChange={(e) => setUserBranch(e.target.value)}
                                    >
                                    {
                                        Course.map(c => {
                                            return <option value={c}>{c}</option>
                                        })
                                    }
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={{ span: 6, offset: 0 }}>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Control 
                                        className="input-field"
                                        as="select"
                                        onChange={(e) => setUserCollege(e.target.value)}
                                    >
                                    {
                                        Colleges.map(c => {
                                            return <option value={c}>{c}</option>
                                        })
                                    }
                                    </Form.Control>
                                </Form.Group>
                            </Col>

                        </Row>
                        <button type="submit" className="register_btn">Register</button>
                        </ValidatorForm>
                        </Col>
                    </Row>
                </Container>  
            </div>
        </div>
        <div className="footer_div_in_login">
            <div className="logo_lbl_in_login_footer">
                teqipGateForum
            </div>
            <div className="footer_links">
                <span>privacy Policy</span>
                <div className="social_links">
                    <span><FaTelegramPlane/></span>
                    <span><FaTwitter/></span>
                    <span><FaInstagram/></span>
                    <span><FaFacebookF/></span>
                </div>
            </div>
        </div>
    </div>   
  )

 }

export default Registerpage