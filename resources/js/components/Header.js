import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
    <nav className="mt-2 navbar navbar-expand-md navbar-light navbar-laravel">
        <div className="container justify-content-between">
            <div>
                <Link to="/" className="navbar-brand">
                    Task Man
                </Link>
            </div>
            <div>
                <Link className="add-button shadow" to="/create">
                    <i className="fas fa-plus" />
                </Link>
            </div>
        </div>
    </nav>
)

export default Header
