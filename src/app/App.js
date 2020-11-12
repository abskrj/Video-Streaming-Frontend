import React from 'react';
import Home from '../container/home';
import Navbar from "../components/navbar";
import Search from "../container/search";
import Login from "../container/login";
import Signup from "../container/signup";
import Forget from "../container/forget";
import Watch from "../container/watch";
import userContext from "../context/userContext";
import UploadVideo from "../container/uploadVideo";
import Profile from "../container/profile";


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  
  return (
    <div className="app">
      <Router >
        <userContext.Provider value={{}}>
          <Navbar />

          <Switch>

            <Route path="/watch/:videoId">
              <Watch />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>

            <Route path="/upload">
              <UploadVideo />
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

            <Route path="/search">
              <Search />
            </Route>

            <Route path="/trending">
              < Home pageTitle="Trending" />
            </Route>

            <Route path="/likes">
              < Home pageTitle="Liked Videos" />
            </Route>

            <Route path="/myvideos">
              < Home pageTitle="My Videos" />
            </Route>

            <Route path="/">
              < Home pageTitle="Recommended" />
            </Route>
          </Switch>

        </userContext.Provider>
      </Router>
    </div>
  )
}
