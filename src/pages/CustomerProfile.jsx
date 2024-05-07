import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileBanner from '../components/ProfileBanner';
import { getEmailFromJWT, formatPhoneNumber } from '../utilities/utilities';
import kitty from '../assets/kitty.jpg';

function CustomerProfile() {
    const [customer, setCustomer] = useState({
        pkCustomerId: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        province: '',
        postalCode: ''
    });
    const [referralCode, setReferralCode] = useState(null);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const email = getEmailFromJWT(token);
                    const customerResponse = await axios.get(`${apiUrl}/api/customer/get-customer-by-email?email=${email}`);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    setCustomer(customerResponse.data);
                    if (customerResponse.data && customerResponse.data.pkCustomerId) {
                        const customerId = customerResponse.data.pkCustomerId;
                        const referralResponse = await axios.get(`${apiUrl}/api/referral/get-customer-referral-code/${customerId}`);
                        setReferralCode(referralResponse.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        };
        fetchCustomerData();
        }, [apiUrl]); 
    
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
                referralCode={referralCode || "Not available"} 
            />
            
            )}
            <div className="customer-profile-upcoming">
                <div className="customer-profile-upcoming-header">
                    <h2 className="customer-profile-upcoming-title">Upcoming Appointments</h2>
                    <a href="#seeall" className="customer-profile-see-all-button">See All</a>
                </div>
                <table className="customer-profile-table">
                    <tbody>
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
                    </tbody>
                </table>
            </div>
            <div className="customer-profile-history">
                <div className="customer-profile-history-header">
                    <h2 className="customer-profile-history-title">Appointment History</h2>
                    <a href="#seeall" className="customer-profile-see-all-button">See All</a>
                </div>
                <table className="customer-profile-table">
                    <tbody>
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
                    </tbody>
                </table>
            </div>
            <div className="customer-profile-products">
                <div className="customer-profile-products-header">
                    <h2 className="customer-profile-products-title">Product History</h2>
                    <a href="#seeall" className="customer-profile-see-all-button">See All</a>
                </div>
                <table className="customer-profile-table">
                    <tbody>
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
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CustomerProfile;



// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProfileBanner from '../components/ProfileBanner';
// import { getEmailFromJWT, formatPhoneNumber } from '../utilities/utilities';
// import kitty from '../assets/kitty.jpg';

// function CustomerProfile() {
//     const [customer, setCustomer] = useState({
//         pkCustomerId: '',
//         firstName: '',
//         lastName: '',
//         phone: '',
//         email: '',
//         address: '',
//         city: '',
//         province: '',
//         postalCode: ''
//     });
//     const [referralCode, setReferralCode] = useState(null);
//     const apiUrl = import.meta.env.VITE_API_BASE_URL;

//     useEffect(() => {
//         const fetchCustomerData = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (token) {
//                     const email = getEmailFromJWT(token);
//                     const customerResponse = await axios.get(`${apiUrl}/api/customer/get-customer-by-email?email=${email}`);
//                     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//                     setCustomer(customerResponse.data);
//                     const customerId = customer.pkCustomerId;
//                     const referralResponse = await axios.get(`${apiUrl}/api/referral/get-customer-referral-code/${customerId}`);
//                     setReferralCode(referralResponse.data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user data: ', error);
//             }
//         };
//         fetchCustomerData();
//     }, [apiUrl, customer.pkCustomerId]);

//     return (
//         <div className="customer-profile">
//             {customer && (
//                 <ProfileBanner 
//                     title="Customer Profile"
//                     imagePath={kitty}
//                     name={customer.firstName + ' ' + customer.lastName}
//                     email={customer.email}
//                     phone={formatPhoneNumber(customer.phone)}
//                     location={(customer.city && customer.province) ? `${customer.city}, ${customer.province}` : 'Location unspecified'}
//                     referralCode={referralCode}
//                 />
//             )}
//             <div className="customer-profile-upcoming">
//                 <div className="customer-profile-upcoming-header">
//                     <h2 className="customer-profile-upcoming-title">Upcoming Appointments</h2>
//                     <a href="#seeall" className="customer-profile-see-all-button">See All</a>
//                 </div>
//                 <table className="customer-profile-table">
//                     <tr>
//                         <th className="customer-profile-date">Date</th>
//                         <th>Service</th>
//                         <th>Provider</th>
//                     </tr>
//                     <tr>
//                         <td>29 June, 2024</td>
//                         <td>Haircut & Styling</td>
//                         <td>Joe</td>
//                     </tr>

//                 </table>
//             </div>
//             <div className="customer-profile-history">
//                 <div className="customer-profile-history-header">
//                     <h2 className="customer-profile-history-title">Appointment History</h2>
//                     <a href="#seeall" className="customer-profile-see-all-button">See All</a>
//                 </div>
//                 <table className="customer-profile-table">
//                     <tr>
//                         <th className="customer-profile-date">Date</th>
//                         <th>Service</th>
//                         <th>Provider</th>
//                     </tr>
//                     <tr>
//                         <td>15 April, 2024</td>
//                         <td>Haircut & Styling</td>
//                         <td>Sarah</td>
//                     </tr>
//                     <tr>
//                         <td>15 April, 2024</td>
//                         <td>Haircut & Styling</td>
//                         <td>Sarah</td>
//                     </tr>
//                 </table>
//             </div>
//             <div className="customer-profile-products">
//                 <div className="customer-profile-products-header">
//                     <h2 className="customer-profile-products-title">Product History</h2>
//                     <a href="#seeall" className="customer-profile-see-all-button">See All</a>
//                 </div>
//                 <table className="customer-profile-table">
//                     <tr>
//                         <th className="customer-profile-date">Date</th>
//                         <th>Product</th>
//                         <th>Provider</th>
//                     </tr>
//                     <tr>
//                         <td>29 June, 2024</td>
//                         <td>Mushroom</td>
//                         <td>Joe</td>
//                     </tr>
//                     <tr>
//                         <td>29 June, 2024</td>
//                         <td>Weed</td>
//                         <td>Joe</td>
//                     </tr>
//                     <tr>
//                         <td>29 June, 2024</td>
//                         <td>Weed</td>
//                         <td>Joe</td>
//                     </tr>
//                     <tr>
//                         <td>29 June, 2024</td>
//                         <td>Weed</td>
//                         <td>Joe</td>
//                     </tr>
//                 </table>
//             </div>
//         </div>
//     )
// }

// export default CustomerProfile;
