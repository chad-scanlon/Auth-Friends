import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import "./App.css";

import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import FriendsList from "./Components/FriendsList";

import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Jumbotron } from "react-bootstrap";

const App = () => {
  // const image = { "background-image": "./assets/apartment.jpg" };
  return (
    <Router>
      <div className="App">
        <Nav className="mr-auto">
          <Link to="/login">
            Login
            <Nav.Link to="/login" href="#home"></Nav.Link>
          </Link>
          <Link to="/protected">
            The Apartment
            <Nav.Link to="/protected" href="#link"></Nav.Link>
          </Link>
        </Nav>

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
