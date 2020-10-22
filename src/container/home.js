import React, { Component } from 'react'
import Sidebar from "../components/sidebar";
import Body from "../components/body";
import SearchPage from "../components/searchPage";
import "../assets/css/home.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class Home extends Component {
    render() {
        return (
            <div className="home__main" >
                < Sidebar />
                    <Switch>
                        <Route path="/search/:searchQuery">
                            <SearchPage />
                        </Route>

                        <Route path="/trending">
                                < Body pageTitle="Trending" />
                        </Route>

                        <Route path="/likedvideos">
                                < Body pageTitle="Liked Videos" />
                        </Route>

                        <Route path="/myvideos">
                                < Body pageTitle="My Videos" />
                        </Route>

                        <Route path="/watchlater">
                                < Body pageTitle="Watch Later" />
                        </Route>

                        <Route path="/">
                                < Body pageTitle="Recommended" />
                        </Route>
                    </Switch>
            </div>
        );
    }
}
