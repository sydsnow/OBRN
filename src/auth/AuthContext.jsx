import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);

    const login = async (formData) => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${apiUrl}/api/customer/login`, formData);
            const { token } = response.data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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

export const useAuth = () => useContext(AuthContext);