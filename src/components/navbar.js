import React, { useEffect, useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png"

import "../assets/css/navbar.css";


export default function Navbar() {

    const [avtarUrl, setAvtarUrl] = useState('http://www.gravatar.com/avatar/?d=mp')

    useEffect(() => {
        const avtarUrl = localStorage.getItem('avtarUrl') || null;
        setAvtarUrl(avtarUrl);
    }, [])

    return (
        <div className="navbar">
            <div className="navbar__left">

                <Button><MenuIcon /></Button>

                <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }} >
                    <img src={logo} height="40px" alt="" />
                </Link>
            </div>

            <div className="navbar__middle">
                <form noValidate autoComplete="off">

                    <TextField name="searchQuery" className="navbar__search" size="small" id="outlined-basic" label="Search" variant="outlined" />

                    <Link to={`/search/`}>
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
                        <img className="navbar__profile" src={avtarUrl} height="40px" alt="" />
                    </Button>
                </Link>

            </div>
        </div>
    )
}
