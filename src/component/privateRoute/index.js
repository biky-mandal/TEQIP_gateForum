import React from 'react';
import {Route, Redirect} from 'react-router-dom';


/**
* @author
* @function PrivateRoute
**/
// we split the Component and rest other props and pass it and 
// rest will be same we just change the Component.
const PrivateRoute = ({component: Component, ...rest}) => {
  return <Route {...rest} component={(props) => {
        // Here Comes what Component we have to show. COnditionally
        const token = window.localStorage.getItem('token');

        if(token){
            return <Component {...props}/>
            // Which component we receive will be shown.

        }else{
            return <Redirect to={'./login'}/>
        }
  }}/>

 }

export default PrivateRoute