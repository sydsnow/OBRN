import React from 'react';
import logo from '../assets/obrn-logo.png';
import { getYear } from "../utilities/utilities";


function Footer() {
  return (
    <footer className="footer">
       <div className="footer-logo">
            <img src={logo} alt="Our Beauty Logo" />
        </div>
        <div className="footer-top">
            <div className="footer-section">
                <h4 className="footer-heading">Quick Menu</h4>
                <a href="#home" className="footer-link">HOME</a>
                <a href="#blog" className="footer-link">SERVICE</a>
                <a href="#shop" className="footer-link">SHOP</a>
                <a href="#community" className="footer-link">COMMUNITY</a>
                <a href="#blog" className="footer-link">BLOG</a>
            </div>
            <div className="footer-section">
                <h4 className="footer-heading">Services</h4>
                <a href="#hair" className="footer-link">HAIR</a>
                <a href="#nails" className="footer-link">NAILS</a>
                <a href="#spa" className="footer-link">SPA</a>
            </div>
            <div className="footer-section">
                <h4 className="footer-heading">About Us</h4>
                <a href="#history" className="footer-link">OUR HISTORY</a>
                <a href="#termscondition" className="footer-link">TERMS & CONDITIONS</a>
                <a href="#privacy" className="footer-link">PRIVACY STATEMENT</a>
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