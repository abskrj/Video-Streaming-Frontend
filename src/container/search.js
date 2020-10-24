import React, { Component } from 'react'
import SearchPage from "../components/searchPage";
import Sidebar from "../components/sidebar";
import "../assets/css/search.css"


export default class Search extends Component {
    render() {
        return (
            <div className="search__main">
                <Sidebar />
                <SearchPage />
            </div>
        )
    }
}
