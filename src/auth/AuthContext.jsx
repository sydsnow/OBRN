import PropTypes from 'prop-types';
import { apiUrl, setAuthHeaders, AuthContext } from './authUtils';
import axios from 'axios';

export const AuthProvider = ({ children }) => {
    const login = async (formData) => {
        try {
            const response = await axios.post(`${apiUrl}/api/customer/login`, formData);
            const { token } = response.data;
            // console.log("token: ", token);
            const existingToken = localStorage.getItem('token');
            if (existingToken) {
                localStorage.removeItem('token');
            }
            localStorage.setItem('token', token);
            setAuthHeaders(token); 
            return token;
        } catch (error) {
            console.error('Login failed: ', error);
            return null;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        // localStorage.removeItem('authenticated');
    };

    return (
        <AuthContext.Provider value={{ login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};