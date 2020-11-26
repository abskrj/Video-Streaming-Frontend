import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png"

import "../assets/css/navbar.css";


export default function Navbar() {

    const [avtarUrl, setAvtarUrl] = useState('https://www.gravatar.com/avatar/?d=mp');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const avtarUrl = localStorage.getItem('avtarUrl') || null;
        if (avtarUrl) {
            setAvtarUrl(avtarUrl);
        }
    }, [])

    return (
        <div className="navbar">
            <div className="navbar__left">
                <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }} >
                    <img className="navbar__logo" src={logo} alt="" />
                </Link>
            </div>

            <div className="navbar__middle">
                <form noValidate autoComplete="off">

                    <TextField onChange={event => setSearch(event.target.value)} name="searchQuery" className="navbar__search" size="small" id="outlined-basic" label="Search" variant="outlined" />

                    <Link to={`/search?q=${search}`}>
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

                <Link to="/profile">
                    <Button>
                        <img className="navbar__profile" src={avtarUrl} height="40px" alt="" />
                    </Button>
                </Link>

            </div>
        </div>
    )
}
