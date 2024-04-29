//import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";



function ProfileBanner({ title, imagePath, name, email, phone, location }) {
    return (
        <div className="profile-banner">
            <div className="profile-banner-top-container">
                <h1 className="profile-banner-title">{title}</h1>
                <div className="profile-banner-buttons">
                    <a href="/editprofile" className="button">EDIT PROFILE</a>
                    <NavLink to="/addservice" className="button">ADD SERVICE</NavLink>
                </div>
            </div>
            <div className="profile-banner-image-container">
                <img src={imagePath} alt="Profile Picture" className="profile-banner-picture"/>
            </div>
            <div className="profile-banner-details"> 
                <h2 className="profile-banner-name">{name}</h2>
                <p><i className="fa-solid fa-envelope"></i> {email}</p>
                <p><i className="fa-solid fa-phone"></i> {phone}</p>
                <p><i className="fa-solid fa-location-dot"></i> {location}</p>
            </div>
        </div>
    );
}
ProfileBanner.propTypes = {
    title: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
};

export default ProfileBanner;
