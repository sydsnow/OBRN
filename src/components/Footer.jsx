import { Link } from 'react-router-dom';
import logo from '../assets/obrn-logo.png';
import { getYear } from "../utilities/utilities";

function Footer() {
  const isAuthenticated = !localStorage.getItem('token'); 

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
          <Link to="/comingsoon" className="footer-link">SHOP</Link>
          {isAuthenticated && (
            <>
              <Link to="/registerbusiness" className="footer-link">BUSINESS REGISTRATION</Link>
              <Link to="/registercustomer" className="footer-link">CUSTOMER REGISTRATION</Link>
            </>
          )}
          <Link to="/admin" className="footer-link">ADMIN</Link>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading">Services</h4>
          <Link to="/comingsoon" className="footer-link">HAIR</Link>
          <Link to="/comingsoon" className="footer-link">NAILS</Link>
          <Link to="/comingsoon" className="footer-link">SPA</Link>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading">About Us</h4>
          <Link to="/about" className="footer-link">OUR HISTORY</Link>
          <Link to="/termscondition" className="footer-link">TERMS & CONDITIONS</Link>
          <Link to="/privacystatement" className="footer-link">PRIVACY STATEMENT</Link>
          <Link to="/cancellationpolicy" className="footer-link">CANCELLATION POLICY</Link>
          <Link to="/businessprofile" className="footer-link">BUSINESS PROFILE</Link>
          <Link to="/customerprofile" className="footer-link">CUSTOMER PROFILE</Link>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading">Contact Us</h4>
          <p>4140 PARKER RD, ALLENTOWN, NEW MEXICO 31134</p>
          <p>OURBEAUTY@GMAIL.COM</p>
          <p>(+92)3012699778</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {getYear()} OUR BEAUTY. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}

export default Footer;
