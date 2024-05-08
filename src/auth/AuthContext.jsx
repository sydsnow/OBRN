import PropTypes from 'prop-types';
import { apiUrl, setAuthHeaders, AuthContext } from './authUtils';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const AuthProvider = ({ children }) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthHeaders(token);
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (formData) => {
        try {
            const response = await axios.post(`${apiUrl}/api/customer/login`, formData, {
                headers: {
                    'Ocp-Apim-Subscription-Key': import.meta.env.VITE_API_KEY,
                }
            });
            const { token } = response.data;
            localStorage.setItem('token', token.result);
            setAuthHeaders(token.result); 
            setIsAuthenticated(true);
            return token.result;
        } catch (error) {
            console.error('Login failed: ', error);
            return null;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);

    };
    

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};