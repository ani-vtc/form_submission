import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    const [productsOpen, setProductsOpen] = useState(false);
    const [industriesOpen, setIndustriesOpen] = useState(false);

    return (
        <header className="main-header">
            <div className="header-container">
                <Link to="/" className="header-logo">VTCo</Link>

                <nav className="header-nav">
                    <Link to="/" className="nav-link">Home</Link>

                    <div
                        className="nav-dropdown"
                        onMouseEnter={() => setProductsOpen(true)}
                        onMouseLeave={() => setProductsOpen(false)}
                    >
                        <button className="nav-link dropdown-trigger">
                            Products
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            </svg>
                        </button>
                        {productsOpen && (
                            <div className="dropdown-menu">
                                <a href="#" className="dropdown-item">WIP</a>
                            </div>
                        )}
                    </div>

                    <div
                        className="nav-dropdown"
                        onMouseEnter={() => setIndustriesOpen(true)}
                        onMouseLeave={() => setIndustriesOpen(false)}
                    >
                        <button className="nav-link dropdown-trigger">
                            Industries
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            </svg>
                        </button>
                        {industriesOpen && (
                            <div className="dropdown-menu">
                                <a href="#" className="dropdown-item">WIP</a>
                            </div>
                        )}
                    </div>

                    {/* <a href="#" className="nav-link">How it works</a> */}
                    <Link to="/blog" className="nav-link">Blog</Link>
                    <a href="#" className="nav-link">About us</a>
                </nav>

                <Link to="/" className="header-cta">Contact Sales</Link>
            </div>
        </header>
    );
}

export default Header;
