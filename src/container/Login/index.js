import React, { useState , useEffect} from 'react';
import './style.css';
import { NavLink, Redirect } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { FaTelegramPlane, FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Col, Container, Row } from 'react-bootstrap';

import { LoginAction } from '../../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import firebase from 'firebase'


/**
* @author
* @function LoginPage
**/

const LoginPage = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [modalIsOpen,setModalIsOpen]=useState(false)

    const [email,setEmail]=useState("")

    if(auth.authenticate){
        return <Redirect to={'/'}/>
    }

    const loginUser = (e) => {
        e.preventDefault();

        const loginUserDetail = {
            userEmail,
            userPassword
        }
        
        dispatch(LoginAction(loginUserDetail));
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const auth=firebase.auth()
        const config = {
            url:process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp:true
        }
        await auth.sendPasswordResetEmail(email,config)
        .then(()=>{
            setEmail("")
        })
        .catch((error)=>{
            console.log(error.message)
        })

    }

    return(
        <div className="login_div">
            <div className="header_div_in_login">
                <NavLink to="" className="back_to_home_lbl"><span><FiChevronLeft/></span>Home</NavLink>
            </div>
            <div className="body_div_in_login">
                <div className="main_login_component">
                <label className="login_lbl">Login</label>

                    <Container>
                      <Row style={{}}>
                        <Col md={{ span: 12, offset: 0 }}>
                        <ValidatorForm useref="form" onSubmit={loginUser}>
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

                        <TextValidator
                            className="input-field"
                            placeholder="Enter Password"
                            value={userPassword}
                            type="password"
                            variant="outlined"
                            validators={["required", "minStringLength:8"]}
                            errorMessages={[
                            "this field is required",
                            "Minimum Length should be 8",
                            ]}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                        <Row style={{}}>
                            <Col md={{ span: 12, offset: 0 }}>
                                <label className="forgot-password-lbl" onClick={()=>{setModalIsOpen(true)}} >Forgot Password?</label>
                                <Modal isOpen={modalIsOpen}>
                                    <div>
                                        <button onClick={()=>{setModalIsOpen(false)}}>X</button>
                                    </div>
                                    <div>
                                    <form onSubmit={handleSubmit}>
                                      <input type="email" className="form-control" placeholder="enter your email" value={email}
                                          onChange={(e)=>{setEmail(e.target.value)}} autoFocus
                                      />
                                      <button disabled={!email}>submit</button>
                                    </form>
                                      
                                        
                                    </div>
                                </Modal>
                            </Col>
                        </Row>
                            <button type="submit" className="login_btn">Login</button>
                        </ValidatorForm>
                        </Col>
                      </Row>
                    </Container>     

                </div>
            </div>
            <div className="signup_link_div">
                <NavLink to="register" className="signUp_link">Don't have an Account? Register Here</NavLink>
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

export default LoginPage