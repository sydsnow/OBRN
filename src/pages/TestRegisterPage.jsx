import { useState } from 'react';
import axios from 'axios';

const TestRegisterPage = () => {
    const [formData, setFormData]  = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${apiUrl}/api/user/adduser`, formData);
            console.log("response: ", response);
            const { Message, Token } = response.data;
            console.log(Message);
            localStorage.setItem('token', Token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${Token}`
        } catch (error) {
            console.error('Registration failed: ', error);
        }
    };

    return (
        <div>
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email address:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default TestRegisterPage;