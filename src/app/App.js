import React, { useEffect, useState } from 'react';
import Home from '../container/home';
import Navbar from "../components/navbar";
import Search from "../container/search";
import Login from "../container/login";
import Signup from "../container/signup";
import Forget from "../container/forget";
import Watch from "../container/watch";
import userContext from "../context/userContext";
import Axios from "axios";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('token');
      if (token === null) {
        localStorage.setItem("token", "");
        token = "";
      }
      const tokenRes = await Axios.post("url", null, { headers: {"x-access-token": token}});
      if(tokenRes.data) {
        const userRes = await Axios.get("url", null, { headers: {"x-access-token": token}});
        setUserData({
          token,
          user: userRes.data
        })
      }
    }

    checkLoggedIn()
  }, [])

  return (
    <div className="app">
      <Router>
        <userContext.Provider value={{}}>
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

        </userContext.Provider>
      </Router>
    </div>
  )
}
