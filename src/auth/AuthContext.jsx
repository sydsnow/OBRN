import PropTypes from 'prop-types';
import { apiUrl, setAuthHeaders, AuthContext } from './authUtils';
import axios from 'axios';

export const AuthProvider = ({ children }) => {
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
            return token.result;
        } catch (error) {
            console.error('Login failed: ', error);
            return null;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
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