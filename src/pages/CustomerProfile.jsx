import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileBanner from '../components/ProfileBanner';
import { getEmailFromJWT } from '../utilities/utilities';
import kitty from '../assets/kitty.jpg';

function formatPhoneNumber(phone) {
    if (/^\d{10}$/.test(phone)) {
        return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
    }
    return phone; // If the phone number doesn't match the format, do not modify it
}

function CustomerProfile() {
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const token = localStorage.getItem('token');
                if (token) {
                    const email = getEmailFromJWT(token);
                    const response = await axios.get(`${apiUrl}/api/customer/getcustomerbyemail?email=${email}`);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    setCustomer(response.data);
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        };

        fetchCustomerData();
    }, []);

    return (
        <div className="customer-profile">
            {customer && (
                <ProfileBanner 
                    title="Customer Profile"
                    imagePath={kitty}
                    name={customer.firstName + ' ' + customer.lastName}
                    email={customer.email}
                    phone={formatPhoneNumber(customer.phone)}
                    location={(customer.city && customer.province) ? `${customer.city}, ${customer.province}` : 'Location unspecified'}
                />
            )}
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
