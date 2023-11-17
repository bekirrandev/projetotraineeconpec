import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import Sheets from './pages/Sheets';
import Login from './pages/Login';
import Home from './pages/Home';
<<<<<<< HEAD
import GeneralInfo from './pages/GeneralInformation';

=======


>>>>>>> dea5e52a2957f35c5bdac690c7fb0ae4c67394e2
function App(): JSX.Element {
  return (
    <Router>
      <Switch>
<<<<<<< HEAD
        <Route path="/home" exact component={Home} />
        <Route path="/sheets" exact component={Sheets} />
        <Route path="/" exact component={Login} />
        <Route path="/generalInfo" exact component={GeneralInfo} />
=======
        <Route path="/sheets" exact component={Sheets} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home} />
>>>>>>> dea5e52a2957f35c5bdac690c7fb0ae4c67394e2
      </Switch>
    </Router>
  );
}

export default App;
