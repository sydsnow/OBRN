import { useState } from 'react';
import PropTypes from 'prop-types';
import { apiUrl, setAuthHeaders, AuthContext } from './authUtils'; // Import the shared utilities
import axios from 'axios';

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);

    const login = async (formData) => {
        try {
            const response = await axios.post(`${apiUrl}/api/customer/login`, formData);
            const { token } = response.data;
            localStorage.setItem('token', token);
            setAuthHeaders(token); // Use the setAuthHeaders function from authUtils
            setAuthenticated(true);
            return token;
        } catch (error) {
            console.error('Login failed: ', error);
            setAuthenticated(false);
            return null;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};