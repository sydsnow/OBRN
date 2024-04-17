import "../scss/components/_nav.scss";
import logo from '../assets/obrn-logo.png';
import { NavLink } from "react-router-dom";


function Nav () {
    return (
        <nav className="header-main-nav">
            <div className="header-logo">
                <img src={logo} alt="obrn logo" ></img>
            </div>
            <div className="header-nav-links">
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
                    <li><a href="#">SHOP</a></li>
                    <li><a href="#">COMMUNITY <i className="fa-solid fa-angle-down"></i></a></li>
                    {/* <li><a href="#">BLOG</a></li>
                    <li><a href="#">JOB</a></li> */}
                    <li><a href="#">CONTACT US</a></li>
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