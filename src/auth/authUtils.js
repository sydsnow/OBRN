import { createContext, useContext } from 'react';
import axios from 'axios';

export const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const setAuthHeaders = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

