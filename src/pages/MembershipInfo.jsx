import { useState, useEffect } from 'react';
import axios from 'axios';

function MembershipInfo() {
    const [fees, setFees] = useState([]);

    useEffect(() => {
        const fetchFees = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL; 
                const token = localStorage.getItem('token');
                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await axios.get(`${apiUrl}/fee`);
                    const filteredFees = response.data.$values.filter(fee => 
                        fee.feeType.trim() === "Basic" || fee.feeType.trim() === "VIP"
                    );
                    setFees(filteredFees);

                }
            } catch (error) {
                console.error('Error fetching fees:', error);
            }
        };

        fetchFees();
    }, []);

    const postFee = async (fee) => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const postData = {
                pkFeeId: fee.pkFeeId,
                amount: fee.amount,
                title: fee.title,
                description: fee.description,
                percentage: fee.percentage,
                feeType: fee.feeType.trim(),
                frequency: fee.frequency.trim()
            };
    
            console.log('Posting data:', postData);
            const response = await axios.post(`${apiUrl}/fee/create`, postData);
            console.log('Fee created:', response.data);
        } catch (error) {
            console.error('Error posting fee:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="membership-info">
            <div className="testimonials-banner">
                <p className="testimonials-small">MEMBERSHIP INFO</p>
                <p className="testimonials-large">Membership</p>
                <div className="testimonials-path">
                    <i className="fa-solid fa-house"></i>
                    <p>HOME</p>
                    <i className="fa-solid fa-angle-right"></i>
                    <p>MEMBERSHIP INFO</p>
                </div>
            </div>
            <div className="membership-info-container">
                <h2 className="membership-info-title">Membership Information</h2>
                {fees.map(fee => (
                    <div key={fee.pkFeeId} onClick={() => postFee(fee)}>
                        <p>{fee.title} - ${fee.amount}</p>
                        <p>Description: {fee.description}</p>
                        <p>Type: {fee.feeType}</p>
                        <p>Frequency: {fee.frequency}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MembershipInfo;
