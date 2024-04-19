import React from 'react';
import ProfileBanner from '../components/ProfileBanner';
import kitty from '../assets/kitty.jpg';

function CustomerProfile() {
    return (
        <div className="customer-profile">
            <ProfileBanner 
                title="Customer Profile"
                imagePath={kitty}
                name="Catherine Smith"
                email="cssmith@home.com"
                phone="+123 456 7890"
                location="Vancouver, Canada"
            />
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
