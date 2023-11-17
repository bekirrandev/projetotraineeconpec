import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import Sheets from './pages/Sheets';
import Login from './pages/Login';
import Home from './pages/Home';


function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path="/sheets" exact component={Sheets} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
