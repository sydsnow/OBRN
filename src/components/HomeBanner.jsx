import { useState, useEffect } from 'react';
import { getEmailFromJWT, getRolesFromJWT } from '../utilities/utilities';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomeBanner() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const token = localStorage.getItem('token');
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        async function confirmUser() {
            if (token) {
                const roles = getRolesFromJWT(token);
                const email = getEmailFromJWT(token);
                if (roles.includes('customer')) {
                    const response = await axios.get(`${apiUrl}/api/customer/get-customer-by-email?email=${email}`);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    if (response.data) {
                        setIsAuthenticated(true);
                    }
                } else {
                    const response = await axios.get(`${apiUrl}/api/business/get-business-by-email?email=${email}`);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    if (response.data) {
                        setIsAuthenticated(true);
                    }
                }
            }
        }
        confirmUser();
    }, [token, apiUrl]);

    return (
        <div className="home">
        <div className="home-banner">
            <div className="home-banner-container">
            <div className="home-banner-copy">
            <h1>The World&apos;s Largest Online Referral Network</h1>
            <p>World&apos;s No.1 Referral Portal</p>
            </div>
            <div className="home-btns">
            {(!isAuthenticated && !token) &&
                <>
                    <Link to="/registerbusiness">
                            <button className="home-btn">Join as a Business</button>
                    </Link>
                    <Link to="/registercustomer">
                            <button className="home-btn">Join as a Customer</button>
                    </Link>
                </>
            }
            </div>
            </div>
        </div>
        </div>
    );
}
export default HomeBanner;