import React from 'react'
import {Route, Switch} from 'react-router-dom';

// Pages
import Loginpage from './container/Login';
import Registerpage from './container/register';
import Profilepage from './container/profilePage';
import Testseriespage from './container/testSeriesPage';
import Homepage from './container/homePage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Homepage}/>
        <Route path="/testseries" component={Testseriespage}/>
        <Route path="/login" component={Loginpage}/>
        <Route path="/register" component={Registerpage}/>
        <Route path="/profile" component={Profilepage}/>
      </Switch>
    </div>
  );
}

export default App;