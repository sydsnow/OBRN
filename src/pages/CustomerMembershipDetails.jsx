import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../scss/components/_button.scss"; 

function CustomerMembershipDetails() {
    const [customerFees, setCustomerFees] = useState([]);
    const navigate = useNavigate();

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

    const handleCancel = () => {
        navigate('/editprofilebusiness');
    };

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
                <h2 className="edit-business-title">Manage Customer Membership</h2>
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
                    <a href="/comingsoon" className="upgrade-link">Upgrade Customer Membership</a>
                </div>
                <div className="membership-info">
                            <a href="/membershipinfo" className="membership-link">Learn more about our Membership</a>
                        </div>
            </div>
            <div className="button-container">
                <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default CustomerMembershipDetails;
