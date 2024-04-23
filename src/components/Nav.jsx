import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from '../auth/authUtils';
import "../scss/components/_nav.scss";
import logo from '../assets/obrn-logo.png';

function Nav () {
    const [isActive, setIsActive] = useState(false);
    const { authenticated, logout } = useAuth();
    const navigate = useNavigate();

    const toggleHamburger = () => {
        setIsActive(!isActive);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="header-main-nav">
            <div className="header-logo">
            <NavLink to="/">
                <img src={logo} alt="obrn logo" ></img>
            </NavLink>
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
                    {authenticated ? (
                        <li>
                            <NavLink to="/customerprofile">
                                PROFILE
                            </NavLink>
                            <button onClick={handleLogout}>
                                LOGOUT
                            </button>
                        </li>
                    ) : (
                        <li>
                            <NavLink to="/login">
                                LOGIN
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Nav;