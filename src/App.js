import React, { useEffect } from 'react'
import {Route, Switch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Pages
import Loginpage from './container/Login';
import Registerpage from './container/register';
import Profilepage from './container/profilePage';
import Testseriespage from './container/testSeriesPage';
import Homepage from './container/homePage';

// Actions
import { isUserLoggedIn } from './redux/actions/authAction';

import PrivateRoute from './component/privateRoute/index';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
  })

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Homepage}/>
        <PrivateRoute path="/testseries" component={Testseriespage}/>
        <Route path="/login" component={Loginpage}/>
        <Route path="/register" component={Registerpage}/>
        <PrivateRoute path="/profile" component={Profilepage}/>
      </Switch>
    </div>
  );
}

export default App;