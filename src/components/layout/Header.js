import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header style={headerStyle}>
            <h1>VATNumber Check</h1>
            <Link style={linkStyle} to="/" >Home</Link>  |  <Link
            style={linkStyle} to="/about">about</Link>
        </header>
    )
}

const headerStyle = {
    background: '#282c34',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}
