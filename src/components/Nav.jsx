import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from '../auth/authUtils';
import { getRolesFromJWT } from "../utilities/utilities";
import "../scss/components/_nav.scss";
import logo from '../assets/obrn-logo.png';

function Nav () {
    const [isActive, setIsActive] = useState(false);
    const [userRoles, setUserRoles] = useState([]);
    const { logout } = useAuth();
    const authenticated = localStorage.getItem('token');

    useEffect(() => {
        if (authenticated) {
            const roles = getRolesFromJWT(authenticated);
            setUserRoles(roles);
        }
    }, [authenticated]);

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
                    {/* <li>
                        <NavLink to="/comingsoon">
                            COMMUNITY <i className="fa-solid fa-angle-down"></i>
                        </NavLink>
                    </li> */}
                    {/* <li><a href="#">BLOG</a></li>
                    <li><a href="#">JOB</a></li> */}
                    <li>
                        <NavLink to="/about">
                            ABOUT
                        </NavLink>
                    </li>
                    {authenticated ? (
                        <li>
                            {userRoles.includes('customer') ? (
                                <NavLink to="/customerprofile">
                                    PROFILE
                                </NavLink>
                            ) : (
                                <NavLink to="/businessprofile">
                                    PROFILE
                                </NavLink>
                            )}
                            &nbsp;&nbsp;
                            <span onClick={handleLogout}>
                                LOGOUT
                            </span>
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