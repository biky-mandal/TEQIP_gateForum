import firebaseApp from '../../config/fireConfig';
import {authConstants} from '../CONSTANTS';
// import firebase from 'firebase';


//////////////////// User is Logged in Or Not  ///////////////
// Whenever user refresh the Page It Will Check whether the user is Logged in Or Not
export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');

        if(token){
            await firebaseApp.auth()
                .onAuthStateChanged((user) => {
                    const email = user.email;
                    const emailVerified = user.emailVerified;
                    const displayName = user.displayName;
                    const phoneNumber = user.phoneNumber;

                    dispatch({
                        type: authConstants.LOGIN_SUCCESS,
                        payload: {
                            token, email, emailVerified, displayName, phoneNumber
                        }
                    });
                })
        }
    }
}

/////////////////////// Login Action //////////////////////////
export const LoginAction = (userObj) => {
    return async dispatch => {
        dispatch({
            type: authConstants.LOGIN_REQUEST
        })
        await firebaseApp.auth()
        .signInWithEmailAndPassword(userObj.userEmail, userObj.userPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            if(user){
                user.getIdToken().then((token) => {

                    const email = user.email;
                    const emailVerified = user.emailVerified;
                    const displayName = user.displayName;
                    const phoneNumber = user.phoneNumber;

                    localStorage.setItem('token', token);
                    localStorage.setItem('email', email);
                    localStorage.setItem('displayName', displayName);
                    localStorage.setItem('phoneNumber', phoneNumber);


                    dispatch({
                        type: authConstants.LOGIN_SUCCESS,
                        payload: {
                            token, email, emailVerified, displayName, phoneNumber
                        }
                    })
                }).catch((error) => {
                    console.log(error);
                    const message = error.message;
                    dispatch({
                        type: authConstants.LOGIN_FAILURE,
                        payload: {
                            message: message
                        }
                    })
                });
            }
        })
        .catch((error) => {
            console.log(error);
            const message = error.message;
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    message: message
                }
            })
        })
    }
}



/////////////////////// Register Action ///////////////////////
export const RegisterAction = (userObj) => {
    console.log(userObj)

    return async dispatch => {
        dispatch({
            type: authConstants.REGISTER_REQUEST
        })

        await firebaseApp
            .auth()
            .createUserWithEmailAndPassword(userObj.userEmail, userObj.userPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                if(user){
                    user.updateProfile({
                        displayName: userObj.userFullName
                    }).then(() => {
                        user.getIdToken().then((token) => {
    
                            const email = user.email;
                            const emailVerified = user.emailVerified;
                            const displayName = user.displayName;
                            const phoneNumber = user.phoneNumber;
        
                            localStorage.setItem('token', token);
                            localStorage.setItem('email', email);
                            localStorage.setItem('displayName', displayName);
                            localStorage.setItem('phoneNumber', phoneNumber);

                            // Saving data to firestore
                            const db = firebaseApp.firestore();
                            db.collection('users').doc(user.email).set({
                                email : user.email,
                                fullName: user.displayName,
                                phoneNumber: userObj.userPhone,
                                branch: userObj.userBranch,
                                institution: userObj.userCollege,
                            }, {merge: true})
        
                            dispatch({
                                type: authConstants.REGISTER_SUCCESS,
                                payload: {
                                    token, email, emailVerified, displayName, phoneNumber
                                }
                            })
                        }).catch((error) => {
                            console.log(error);
                            const message = error.message
                            dispatch({
                                type: authConstants.REGISTER_FAILURE,
                                payload:{
                                    message: message
                                }
                            })
                        });
                    })
                }
            })
            .catch((error) => {
                console.log(error);
                const message = error.message
                console.log(message)
                dispatch({
                    type: authConstants.REGISTER_FAILURE,
                    payload:{
                        message: message
                    }
                })
            })
    }
}

////////////////////// Logout Action ////////////////////
export const LogoutAction = () => {
    return async dispatch => {
        dispatch({
            type: authConstants.LOGOUT_REQUEST
        })

        await firebaseApp.auth().signOut()
        .then(() => {
            // Clearing localStorage
            localStorage.clear();
            dispatch({
                type: authConstants.LOGOUT_SUCCESS
            })
        })
        .catch((error) => {
            console.log(error);
            dispatch({
                type: authConstants.LOGOUT_FAILURE
            })
        })
    }
}
