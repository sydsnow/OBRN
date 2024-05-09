import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/obrn-logo.png';
import { getYear } from "../utilities/utilities";
import { useContext } from 'react';
import { AuthContext } from '../auth/authUtils';
import { getRolesFromJWT } from "../utilities/utilities";

function Footer() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let userRoles = [];

  if (token) {
    userRoles = getRolesFromJWT(token);
  }

  // console.log('Customer and Business Registration is not shown in the footer:', isAuthenticated);

  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={logo} alt="Our Beauty Logo" />
      </div>
      <div className="footer-top">
        <div className="footer-section">
          <h4 className="footer-heading">Quick Menu</h4>
          <Link to="/" className="footer-link">HOME</Link>
          <Link to="/services" className="footer-link">SERVICES</Link>
          {!isAuthenticated && (
            <>
              <Link to="/registerbusiness" className="footer-link">BUSINESS REGISTRATION</Link>
              <Link to="/registercustomer" className="footer-link">CUSTOMER REGISTRATION</Link>
            </>
          )}
          {isAuthenticated && (
            <Link to={userRoles.includes('customer') ? "/customerprofile" : "/businessprofile"} className="footer-link">
              PROFILE
            </Link>
          )}
          <Link to="/admin" className="footer-link">ADMIN</Link>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading">Categories</h4>
          <Link to="/comingsoon" className="footer-link">HAIR</Link>
          <Link to="/comingsoon" className="footer-link">NAILS</Link>
          <Link to="/comingsoon" className="footer-link">FACIAL</Link>
          <Link to="/comingsoon" className="footer-link">SPA</Link>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading">About Us</h4>
          <Link to="/about" className="footer-link">OUR HISTORY</Link>
          <Link to="/termscondition" className="footer-link">TERMS & CONDITIONS</Link>
          <Link to="/privacystatement" className="footer-link">PRIVACY STATEMENT</Link>
          <Link to="/cancellationpolicy" className="footer-link">CANCELLATION POLICY</Link>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading">Contact Us</h4>
          <p>OURBEAUTY@GMAIL.COM</p>
          <p>(604) 902-5234</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {getYear()} OUR BEAUTY. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}

export default Footer;
