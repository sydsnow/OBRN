import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from '../auth/authUtils';
import axios from 'axios';
import { getRolesFromJWT, getEmailFromJWT } from "../utilities/utilities";
import "../scss/components/_nav.scss";
import logo from '../assets/obrn-logo.png';

function Nav () {
    const [isActive, setIsActive] = useState(false);
    const [userRoles, setUserRoles] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { logout } = useAuth();
    const token = localStorage.getItem('token');
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        async function confirmUser() {
            if (token) {
                const roles = getRolesFromJWT(token);
                setUserRoles(roles);
                const email = getEmailFromJWT(token);
                const response = await axios.get(`${apiUrl}/api/customer/get-customer-by-email?email=${email}`);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                if (response.data) {
                    setIsAuthenticated(true);
                }
            }
        }
        confirmUser();
    }, [token, apiUrl]);
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
                    {(isAuthenticated && token) ? (
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
                            <NavLink onClick={handleLogout}>
                                LOGOUT
                            </NavLink>
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