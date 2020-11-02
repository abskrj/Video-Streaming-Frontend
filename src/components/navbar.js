import React, { Component } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { SidebarConsumer } from "../context/side.context";


import "../assets/css/navbar.css";


export default class Navbar extends Component {
    constructor() {
        super();

        this.state = {
            searchQuery: "",
            sideBar: true
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {

        return (
            <div className="navbar">
                <div className="navbar__left">

                    <SidebarConsumer>
                        {
                            (value) => {
                                return (
                                    <Button onClick={value}>
                                        < MenuIcon className="navbar__menu" />
                                    </Button>
                                )
                            }
                        }
                    </SidebarConsumer>

                    <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }} >
                        <h2>Logo</h2>
                    </Link>
                </div>

                <div className="navbar__middle">
                    <form noValidate autoComplete="off">

                        <TextField onChange={this.onChange} name="searchQuery" className="navbar__search" size="small" id="outlined-basic" label="Search" variant="outlined" />

                        <Link to={`/search/${this.state.searchQuery}`}>
                            <IconButton color="default" aria-label="add to shopping cart">
                                <SearchIcon className="navbar__search__btn" />
                            </IconButton>
                        </Link>

                    </form>
                </div>

                <div className="navbar__right">

                    <Link to="/upload" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <Button>Upload Video</Button>
                    </Link>

                    <Button>
                        <NotificationsNoneIcon className="navbar__notification" />
                    </Button>

                    <Link to="/login">
                        <Button>
                            <img className="navbar__profile" src="https://secure.gravatar.com/avatar/a001a3f46d1449494fdcb542d22afad0?default=wavatar" height="40px" alt="" />
                        </Button>
                    </Link>

                </div>
            </div>
        )
    }
}
