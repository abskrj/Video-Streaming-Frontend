import React from 'react'
import "../assets/css/sidebar.css";
import SidebarItem from "./sidebar.item";
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import { Link } from "react-router-dom";
import { Drawer, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import { toggleSidebar } from '../redux/action';

export default function Sidebar() {
    const isSidebar = useSelector(state => state.isSidebar);

    const dispatch = useDispatch();

    return (
        <Drawer anchor='left' onClose={() => dispatch(toggleSidebar())} open={isSidebar} >
            <ListItem>
                <ListItemIcon>
                    <MenuIcon />
                </ListItemIcon>
                <ListItemText>
                    Menu
                </ListItemText>
            </ListItem>

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

            {/* </div> */}
        </Drawer>
    )
}


// export default class Sidebar extends Component {

//     render() {

//         return (
//             // <SidebarProvider value={toggleSidebar}>
//             // <div className="sidebar__main" style={{ display: this.state.sideBar ? 'block' : 'none' }}>
//             <Drawer open={true}>

//                 <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
//                     < SidebarItem selected={window.location.pathname === '/' ? true : false} Icon={HomeIcon} title="Home" />
//                 </Link>

//                 <Link to="/trending" style={{ color: 'inherit', textDecoration: 'inherit' }}>
//                     < SidebarItem selected={window.location.pathname === '/trending' ? true : false} Icon={WhatshotIcon} title="Trending" />
//                 </Link>

//                 <hr />

//                 <Link to="/myvideos" style={{ color: 'inherit', textDecoration: 'inherit' }}>
//                     < SidebarItem selected={window.location.pathname === '/myvideos' ? true : false} Icon={VideoLibraryIcon} title="My videos" />
//                 </Link>

//                 <Link to='/likes' style={{ color: 'inherit', textDecoration: 'inherit' }}>
//                     < SidebarItem selected={window.location.pathname === '/likes' ? true : false} Icon={ThumbUpIcon} title="Liked videos" />
//                 </Link>

//                 <hr />

//                 <Link to='/profile' style={{ color: 'inherit', textDecoration: 'inherit' }}>
//                     < SidebarItem selected={window.location.pathname === '/profile' ? true : false} Icon={SettingsIcon} title="Profile" />
//                 </Link>

//                 <Link to='/about' style={{ color: 'inherit', textDecoration: 'inherit' }}>
//                     < SidebarItem selected={window.location.pathname === '/about' ? true : false} Icon={HelpIcon} title="About" />
//                 </Link>

//                 {/* </div> */}
//             </Drawer>
//             // {/* </SidebarProvider> */ }
//         )

//     }
// }
