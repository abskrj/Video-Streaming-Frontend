import React, { Component } from 'react'
import "../assets/css/sidebar.css";
import SidebarItem from "./sidebar.item";
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import { Link } from "react-router-dom";

export default class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar__main">
                <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    < SidebarItem selected Icon={HomeIcon} title="Home" />
                </Link>

                <Link to="/trending" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    < SidebarItem Icon={WhatshotIcon} title="Trending" />
                </Link>

                <hr />

                <Link to="/myvideos" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    < SidebarItem Icon={VideoLibraryIcon} title="My videos" />
                </Link>

                <Link to="watchlater" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    < SidebarItem Icon={WatchLaterIcon} title="Watch later" />
                </Link>

                <Link style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    < SidebarItem Icon={ThumbUpIcon} title="Liked videos" />
                </Link>

                <hr />

                <Link style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    < SidebarItem Icon={SettingsIcon} title="Settings" />
                </Link>

                <Link style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    < SidebarItem Icon={HelpIcon} title="Help" />
                </Link>

            </div>
        )
    }
}
