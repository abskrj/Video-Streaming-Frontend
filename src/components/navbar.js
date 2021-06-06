import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png"
import MenuIcon from '@material-ui/icons/Menu';

import "../assets/css/navbar.css";
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../redux/action';


export default function Navbar() {

    const [avtarUrl, setAvtarUrl] = useState('https://www.gravatar.com/avatar/?d=mp');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const avtarUrl = localStorage.getItem('avtarUrl') || null;
        if (avtarUrl) {
            setAvtarUrl(avtarUrl);
        }
    }, []);

    const dispatch = useDispatch();

    const toggleMenu = () => {
        dispatch(toggleSidebar());
    }

    return (
        <div className="navbar">
            <div className="navbar__left">
                <IconButton onClick={toggleMenu} >
                    <MenuIcon />
                </IconButton>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }} >
                    <img className="navbar__logo" src={logo} alt="" />
                </Link>
            </div>

            {/* <div className="navbar__middle">
                <form noValidate autoComplete="off">

                    <TextField onChange={event => setSearch(event.target.value)} name="searchQuery" className="navbar__search" size="small" id="outlined-basic" label="Search" variant="outlined" />

                    <Link to={`/search?q=${search}`}>
                        <IconButton color="default" aria-label="add to shopping cart">
                            <SearchIcon className="navbar__search__btn" />
                        </IconButton>
                    </Link>

                </form>
            </div> */}

            <div className="navbar__right">

                <Link to="/upload" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                    <Button>Upload</Button>
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
