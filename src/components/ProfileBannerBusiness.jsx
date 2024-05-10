//import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from "react-router-dom";
import { capitalizeFirstLetters, formatPhoneNumber } from '../utilities/utilities';


function ProfileBannerBusiness({ title, imagePath, name, email, phone, location, referralCode, businessId }) {
    const currentLocation = useLocation();
    const isBusinessProfileRoute = currentLocation.pathname === '/businessprofile';
    
    return (
        <div className="profile-banner">
            <div className="profile-banner-top-container">
                <h1 className="profile-banner-title">{title}</h1>
                {isBusinessProfileRoute && (
                    <div className="profile-banner-buttons">
                        <NavLink to="/editprofilebusiness" className="button">EDIT PROFILE</NavLink>
                        <NavLink to={`/create-service/${businessId}`} className="button">ADD SERVICE</NavLink>
                        <NavLink to={`/testimonials/${businessId}/new-testimonial`} className="button">ADD TESTIMONIAL</NavLink>

                    </div>
                )}
            </div>
            <div className="profile-banner-image-container">
                <img src={imagePath} alt="Profile Picture" className="profile-banner-picture"/>
            </div>
            <div className="profile-banner-details"> 
                <h2 className="profile-banner-name">{capitalizeFirstLetters(name)}</h2>
                {isBusinessProfileRoute && (
                    <p><i className="fa-solid fa-user-plus"></i> {referralCode}</p>
                )}
                <p><i className="fa-solid fa-envelope"></i> {email}</p>
                <p><i className="fa-solid fa-phone"></i> {formatPhoneNumber(phone)}</p>
                <p><i className="fa-solid fa-location-dot"></i> {capitalizeFirstLetters(location)}</p>
            </div>
        </div>
    );
}
ProfileBannerBusiness.propTypes = {
    title: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    referralCode: PropTypes.string.isRequired

};

export default ProfileBannerBusiness;
