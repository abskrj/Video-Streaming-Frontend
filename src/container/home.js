import React, { Component } from 'react'
import Sidebar from "../components/sidebar";
import Body from "../components/body";
import "../assets/css/home.css"

export default class Home extends Component {
    render() {
        return (
            <div className="home__main" >
                < Sidebar />

                <Body pageTitle={this.props.pageTitle} />

            </div>
        );
    }
}
