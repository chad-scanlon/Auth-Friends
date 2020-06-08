import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import "./App.css";

import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import FriendsList from "./Components/FriendsList";

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/protected">The Apartment</Link>
        </div>

        <Switch>
          <PrivateRoute exact path="/protected" component={FriendsList} />
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
