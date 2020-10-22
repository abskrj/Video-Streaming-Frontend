import React, { Component } from 'react'
import "../assets/css/sidebar.css";

export default class SidebarItem extends Component {
    render() {
        return (
            <div className={`sidebar__item ${this.props.selected && `selected`}`}>
                <this.props.Icon className="sidebarItem_icon" />
                <h2 className="sidebarItem_title" >{this.props.title}</h2>
            </div>
        )
    }
}
