import React, { useState } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom';

// Pages
import Loginpage from './container/Login';
import Registerpage from './container/register';
import Profilepage from './container/profilePage';
import Testseriespage from './container/testSeriesPage';
import Homepage from './container/homePage';
import ProtectedRoute from './ProtectedRoutes';


function App() {
  const [isAuth,setAuth]=useState(true)
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Homepage} isAuth={isAuth}/>
        {/*<Route path="/testseries" component={Testseriespage}/>*/}
        <Route path="/login" component={Loginpage}/>
        <Route path="/register" component={Registerpage}/>
        {/*Route path="/profile" component={Profilepage}/>*/}
        <ProtectedRoute path="/profile" component={Profilepage} isAuth={isAuth}/>
        <ProtectedRoute path="/testseries" component={Testseriespage} isAuth={isAuth}/>
      </Switch>
    </div>
  );
}

export default App;