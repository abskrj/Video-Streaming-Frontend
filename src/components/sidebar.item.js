import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import "../assets/css/sidebar.css";
import { toggleSidebar } from '../redux/action';

export default function SidebarItem({ Icon, title, selected }) {
    const dispatch = useDispatch();
    return (
        <ListItem onClick={() => dispatch(toggleSidebar())} className={`sidebar__item ${selected && `selected`}`}>

            <ListItemIcon  ><Icon /> </ListItemIcon>

            <ListItemText primary={title} />
        </ListItem>
    )
}
