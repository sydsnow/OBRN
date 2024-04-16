import React, { useState } from 'react';
import kitty from '../assets/kitty.jpg';

function CustomerProfile () {
    return (
        <div className="wrapper">
            <div className="customer-profile">
                <div className="customer-profile-top-container">
                    <h1>Customer Profile</h1>
                    <div className="customer-profile-buttons">
                        <a href="#password" className="customer-profile-link">CHANGE PASSWORD</a>
                        <a href="#editprofile" className="button">EDIT PROFILE</a> 
                        <a href="#notifications" className="button">NOTIFICATIONS</a>
                        <a href="#logout" className="button">LOGOUT</a>                    </div>
                </div>
                <div className="customer-profile-picture">
                    <img src={kitty} alt="Profile Picture" />
                </div>
                <div className="customer-profile-details"> 
                    <h2>Tracy Huang</h2>
                    <p>I love to go on hikes, and eat yummy food!</p>
                    <p><i className="fa-solid fa-envelope"></i> tracy@home.com</p>
                    <p><i className="fa-solid fa-phone"></i>  +123 456 7890</p>
                    <p><i className="fa-solid fa-location-dot"></i> Vancouver, Canada</p>
                </div>
                <div className="customer-profile-history">
                        <h2 className="customer-profile-history-title">Appointment History </h2>
                        <button className="button">See All</button>
                            <div className="customer-profile-history-date">
                                <h4 className="customer-profile-history-date-heading">Date</h4>
                                <p>15 April, 2024</p>
                            </div>
                            <div className="customer-profile-history-service">
                                <h4 className="customer-profile--history-service-heading">Service</h4>
                                <p>Haircut & Styling</p>
                            </div>
                            <div className="customer-profile-history-styling">
                                <h4 className="customer-profile-history-stylist-heading">Stylist</h4>
                                <p>Sarah</p>
                            </div>
                </div>
                <div className="customer-profile-upcoming">
                        <h2 className="customer-profile-upcoming-title">Upcoming Appointments </h2>
                        <button className="button">See All</button>
                            <div className="customer-profile-upcoming-date">
                                <h4 className="customer-profile-upcoming-date-heading">Date</h4>
                                <p>29, June, 2024</p>
                            </div>
                            <div className="customer-profile-upcoming-service">
                                <h4 className="customer-profile-upcoming-service-heading">Service</h4>
                                <p>Gel X Nails</p>
                            </div>
                            <div className="customer-profile-upcoming-styling">
                                <h4 className="customer-profile-upcoming-stylist-heading">Stylist</h4>
                                <p>Joe</p>
                            </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerProfile;