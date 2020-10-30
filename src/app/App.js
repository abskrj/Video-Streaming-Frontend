import React, { Component } from 'react';
import Home from '../container/home';
import Navbar from "../components/navbar";
import Search from "../container/search";
import Login from "../container/login";
import Signup from "../container/signup";
import Forget from "../container/forget";
import Watch from "../container/watch";



import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Navbar />

          <Switch>

            <Route path="/watch/:videoId">
              <Watch />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/signup">
              <Signup />
            </Route>

            <Route path="/forget">
              <Forget />
            </Route>

            <Route path="/search/:searchQuery">
              <Search />
            </Route>

            <Route path="/trending">
              < Home pageTitle="Trending" />
            </Route>

            <Route path="/likedvideos">
              < Home pageTitle="Liked Videos" />
            </Route>

            <Route path="/myvideos">
              < Home pageTitle="My Videos" />
            </Route>

            <Route path="/watchlater">
              < Home pageTitle="Watch Later" />
            </Route>

            <Route path="/">
              < Home pageTitle="Recommended" />
            </Route>
          </Switch>

        </Router>
      </div>
    )
  }
}
