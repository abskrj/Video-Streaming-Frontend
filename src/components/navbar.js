import React, { Component } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { Button } from "@material-ui/core";

import "../assets/css/navbar.css";


export default class Navbar extends Component {

    render() {

        return (
            <div className="navbar">
                <div className="navbar__left">
                    < MenuIcon className="navbar__menu" />
                    <h2>Logo</h2>

                </div>

                <div className="navbar__middle">
                    <form noValidate autoComplete="off">

                        <TextField className="navbar__search" size="small" id="outlined-basic" label="Search" variant="outlined" />
                        
                        <IconButton color="default" aria-label="add to shopping cart">
                            <SearchIcon className="navbar__search__btn" />
                        </IconButton>
                    </form>
                </div>

                <div className="navbar__right">
                    <Button>Upload Video</Button>
                    <NotificationsNoneIcon className="navbar__notification" />
                    <img className="navbar__profile" src="https://secure.gravatar.com/avatar/a001a3f46d1449494fdcb542d22afad0?default=wavatar" height="40px" alt="" />
                </div>
            </div>
        )
    }
}
