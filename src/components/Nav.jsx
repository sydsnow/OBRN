import "../scss/components/_nav.scss";
import logo from '../assets/obrn-logo.png';
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Nav () {
    const [isActive, setIsActive] = useState(false);

    const toggleHamburger = () => {
        setIsActive(!isActive);
    };

    return (
        <nav className="header-main-nav">
            <div className="header-logo">
                <img src={logo} alt="obrn logo" ></img>
            </div>
            <div className={`hamburger ${isActive ? 'active' : ''}`} onClick={toggleHamburger}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <div className={`header-nav-links ${isActive ? "active" : ""}`} onClick={toggleHamburger}>
                <ul>
                    <li>
                        <NavLink to="/">
                            HOME
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/services">
                            SERVICES
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/testimonials">
                            TESTIMONIALS
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/comingsoon">
                            SHOP
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/comingsoon">
                            COMMUNITY <i className="fa-solid fa-angle-down"></i>
                        </NavLink>
                    </li>
                    {/* <li><a href="#">BLOG</a></li>
                    <li><a href="#">JOB</a></li> */}
                    <li>
                        <NavLink to="/about">
                            ABOUT
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/customerprofile">
                            PROFILE
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">
                            LOGIN
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;