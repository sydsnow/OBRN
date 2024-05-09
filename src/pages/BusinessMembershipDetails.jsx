import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';

function BusinessMembershipDetails() {
    const [businessDetails, setBusinessDetails] = useState({});
    const [businessFees, setBusinessFees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            try {
                setLoading(true);
                const businessId = localStorage.getItem('businessId');
                const token = localStorage.getItem('token');
                if (token && businessId) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await axios.get(`${apiUrl}/api/Business/get-business/${businessId}`);
                    setBusinessDetails(response.data);
                    const feeResponse = await axios.get(`${apiUrl}/fee`);
                    const relevantFees = feeResponse.data.filter(fee => fee.feeType.trim() === (response.data.vip ? "VIP" : "Basic"));
                    setBusinessFees(relevantFees);
                }
            } catch (error) {
                console.error('Error fetching business details:', error);
                setError('Failed to fetch business details');
            } finally {
                setLoading(false);
            }
        };

        fetchBusinessDetails();
    }, []);

    return (
        <div className="business-membership">
            <div className="testimonials-banner">
                <p className="testimonials-small">BUSINESS MEMBERSHIP</p>
                <p className="testimonials-large">Membership</p>
                <div className="testimonials-path">
                    <i className="fa-solid fa-house"></i>
                    <Link to="/">HOME</Link> 
                    <i className="fa-solid fa-angle-right"></i>
                    <Link to="/editprofilebusiness">EDIT PROFILE</Link> 
                    <i className="fa-solid fa-angle-right"></i>
                    <p>BUSINESS MEMBERSHIP</p>
                </div>
            </div>
            <div className="edit-business-container">
                <h2 className="edit-business-title">Manage Business Membership</h2>
                {loading ? (
                    <p>Loading business details...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <h3>{businessDetails.businessName}</h3>
                        <p>{businessDetails.description}</p>
                        {businessFees.length > 0 ? (
                            businessFees.map(fee => (
                                <div key={fee.pkFeeId}>
                                    <p>{fee.title} - ${fee.amount.toFixed(2)}</p>
                                    <p>Description: {fee.description}</p>
                                    <p>Type: {fee.feeType.trim()}</p>
                                    <p>Frequency: {fee.frequency.trim()}</p>
                                </div>
                            ))
                        ) : (
                            <p>No membership fees found for this business.</p>
                        )}
                        <div className="upgrade-membership">
                            <a href="/comingsoon" className="upgrade-link">Upgrade Business Membership</a>
                        </div>
                        <div className="membership-info">
                            <a href="/membershipinfo" className="membership-link">Learn more about our Membership</a>
                        </div>
                    </>
                )}
            </div>
            <div className="button-container">
                <button className="go-back-button" onClick={() => navigate('/editprofilebusiness')}>Go Back</button>           
            </div>
        </div>
    );
}

export default BusinessMembershipDetails;
