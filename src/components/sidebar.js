import React, { Component } from 'react'
import "../assets/css/sidebar.css";
import SidebarItem from "./sidebar.item";
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import { Link } from "react-router-dom";
import { SidebarProvider } from "../context/side.context";

export default class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            sideBar: true
        }
    }

    toggleSidebar = () => {
        console.log('clicked');
        if (this.state.sideBar) {
            this.setState({ sideBar: false });
        }
        else {
            this.setState({ sideBar: true });
        }
    }

    render() {
        const { toggleSidebar } = this

        return (
            <SidebarProvider value={toggleSidebar}>
                <div className="sidebar__main" style={{ display: this.state.sideBar ? 'block' : 'none' }}>

                    <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        < SidebarItem selected={window.location.pathname === '/' ? true : false} Icon={HomeIcon} title="Home" />
                    </Link>

                    <Link to="/trending" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        < SidebarItem selected={window.location.pathname === '/trending' ? true : false} Icon={WhatshotIcon} title="Trending" />
                    </Link>

                    <hr />

                    <Link to="/myvideos" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        < SidebarItem selected={window.location.pathname === '/myvideos' ? true : false} Icon={VideoLibraryIcon} title="My videos" />
                    </Link>

                    <Link to='/likes' style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        < SidebarItem selected={window.location.pathname === '/likes' ? true : false} Icon={ThumbUpIcon} title="Liked videos" />
                    </Link>

                    <hr />

                    <Link to='/profile' style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        < SidebarItem selected={window.location.pathname === '/profile' ? true : false} Icon={SettingsIcon} title="Profile" />
                    </Link>

                    <Link to='/about' style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        < SidebarItem selected={window.location.pathname === '/about' ? true : false} Icon={HelpIcon} title="About" />
                    </Link>

                </div>
            </SidebarProvider>
        )

    }
}
