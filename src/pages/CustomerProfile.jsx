import React from 'react';
import kitty from '../assets/kitty.jpg';

function CustomerProfile () {
    return (
        <div className="customer-profile">
            <div className="customer-profile-top-container">
                <h1 className="customer-profile-title">Customer Profile</h1>
                <div className="customer-profile-buttons">
                    <a href="#editprofile" className="button">EDIT PROFILE</a> 
                    {/* <a href="#notifications" className="button">NOTIFICATIONS</a> */}
                </div>
            </div>
            <div className="customer-profile-image-container">
                <img src={kitty} alt="Profile Picture" className="customer-profile-picture"/>
            </div>
            <div className="customer-profile-details"> 
                <h2 className="customer-profile-name">Tracy Huang</h2>
                <p>I love to go on hikes, and eat yummy food!</p>
                <p><i className="fa-solid fa-envelope"></i> tracy@home.com</p>
                <p><i className="fa-solid fa-phone"></i> +123 456 7890</p>
                <p><i className="fa-solid fa-location-dot"></i> Vancouver, Canada</p>
            </div>
            <div className="customer-profile-upcoming">
                <div className="customer-profile-upcoming-header">
                    <h2 className="customer-profile-upcoming-title">Upcoming Appointments</h2>
                    <a href="#seeall" className="customer-profile-see-all-button">See All</a>
                </div>
                <table className="customer-profile-table">
                    <tr>
                        <th className="customer-profile-date">Date</th>
                        <th>Service</th>
                        <th>Provider</th>
                    </tr>
                    <tr>
                        <td>29 June, 2024</td>
                        <td>Haircut & Styling</td>
                        <td>Joe</td>
                    </tr>

                </table>
            </div>
            <div className="customer-profile-history">
                <div className="customer-profile-history-header">
                    <h2 className="customer-profile-history-title">Appointment History</h2>
                    <a href="#seeall" className="customer-profile-see-all-button">See All</a>
                </div>
                <table className="customer-profile-table">
                    <tr>
                        <th className="customer-profile-date">Date</th>
                        <th>Service</th>
                        <th>Provider</th>
                    </tr>
                    <tr>
                        <td>15 April, 2024</td>
                        <td>Haircut & Styling</td>
                        <td>Sarah</td>
                    </tr>
                    <tr>
                        <td>15 April, 2024</td>
                        <td>Haircut & Styling</td>
                        <td>Sarah</td>
                    </tr>
                </table>
            </div>
            <div className="customer-profile-products">
                <div className="customer-profile-products-header">
                    <h2 className="customer-profile-products-title">Product History</h2>
                    <a href="#seeall" className="customer-profile-see-all-button">See All</a>
                </div>
                <table className="customer-profile-table">
                    <tr>
                        <th className="customer-profile-date">Date</th>
                        <th>Product</th>
                        <th>Provider</th>
                    </tr>
                    <tr>
                        <td>29 June, 2024</td>
                        <td>Mushroom</td>
                        <td>Joe</td>
                    </tr>
                    <tr>
                        <td>29 June, 2024</td>
                        <td>Weed</td>
                        <td>Joe</td>
                    </tr>
                    <tr>
                        <td>29 June, 2024</td>
                        <td>Weed</td>
                        <td>Joe</td>
                    </tr>
                    <tr>
                        <td>29 June, 2024</td>
                        <td>Weed</td>
                        <td>Joe</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default CustomerProfile;
