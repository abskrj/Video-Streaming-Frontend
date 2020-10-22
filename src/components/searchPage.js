import React, { Component } from 'react'
import { useParams, Redirect } from "react-router-dom";
import "../assets/css/search.css"
import VideoTile from "./videoTile";

export default class SearchPage extends Component {
    constructor() {
        super();

        this.state = {
            redirect: false
        }
    }
    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/' />;
        }
        return (
            <div className="searchPage__main">
                <h2>Search Page</h2>

                <div className="searchPage__video">
                    <VideoTile
                        userAvtar="https://secure.gravatar.com/avatar/a001a3f46d1449494fdcb542d22afad0?default=wavatar"
                        videoId="vDIT7VC"
                        videoTitle="Cricbuddy Chatbot Demo"
                        userName="Abhishek Raj"
                        views="125M views"
                        timestamp="5 days ago"
                        description="This is a sample video description."
                    />
                </div>
            </div>
        )
    }
}
