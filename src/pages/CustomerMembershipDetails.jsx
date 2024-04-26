import { useState, useEffect } from 'react';
import axios from 'axios';

function CustomerMembershipDetails() {
    const [customerFees, setCustomerFees] = useState([]);

    useEffect(() => {
        const fetchCustomerFees = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL; 
                const token = localStorage.getItem('token');
                const customerId = localStorage.getItem('customerId');
                if (token && customerId) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
                    const response = await axios.get(`${apiUrl}/fee?customerId=${customerId}`); 
                    setCustomerFees(response.data);
                }
            } catch (error) {
                console.error('Error fetching customer fees:', error);
            }
        };

        fetchCustomerFees();
    }, []);

    return (
        <div className="customer-membership">
            <div className="testimonials-banner">
                <p className="testimonials-small">CUSTOMER MEMBERSHIP</p>
                <p className="testimonials-large">Membership</p>
                <div className="testimonials-path">
                    <i className="fa-solid fa-house"></i>
                    <p>HOME</p>
                    <i className="fa-solid fa-angle-right"></i>
                    <p>EDIT PROFILE</p>
                    <i className="fa-solid fa-angle-right"></i>
                    <p>CUSTOMER MEMBERSHIP</p>
                </div>
            </div>
            <div className="edit-business-container">
                <h2 className="edit-business-title">Membership</h2>
                {customerFees.length > 0 ? (
                    customerFees.map(fee => (
                        <div key={fee.pkFeeId}>
                            <p>{fee.title} - ${fee.amount}</p>
                            <p>Description: {fee.description}</p>
                            <p>Type: {fee.feeType}</p>
                            <p>Frequency: {fee.frequency}</p>
                        </div>
                    ))
                ) : (
                    <p>No membership fees found for this customer.</p>
                )}
                <div className="upgrade-membership">
                    <a href="/comingsoon" className="upgrade-link">Upgrade Membership</a>
                </div>
                <div className="membership-info">
                            <a href="/membershipinfo" className="membership-link">Learn more about our Membership</a>
                        </div>
            </div>
        </div>
    );
}

export default CustomerMembershipDetails;
