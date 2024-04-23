import { useState } from 'react';
import axios from 'axios';
// import bcrypt from 'bcryptjs';
import loginimg from '../assets/login-img.jpg';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const hashedPassword = await bcrypt.hash(formData.password, 10);
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            console.log("password: ", formData.password);
            // const response = await axios.post(`${apiUrl}/api/customer/login`, { ...formData, password: hashedPassword });
            const response = await axios.post(`${apiUrl}/api/customer/login`, formData);
            console.log("response: ", response);
            const { message, token } = response.data;
            console.log(message);
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            console.error('Registration failed: ', error);
        }
    };

  return (
    <div className="wrapper">
    <div className="login">
    <div className="login-container">

        <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-header">
        <h1>Login</h1>
        <p>Access back to your account</p>
        </div>
        <div className="form-group">
        <input 
            className='input' 
            type="email" 
            required 
            autoComplete='off' 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
        />

        <label className="label" htmlFor="email">            <i className="fa-regular fa-envelope"></i> Email</label>

        </div>
        <div className="form-group">
        <input 
            className='input' 
            type="password" 
            id="password" 
            required 
            autoComplete='off' 
            name="password"
            value={formData.password}
            onChange={handleChange} 
        />
            <label className="label" htmlFor="password"> <i className="fa-solid fa-key"></i> Password</label>

        </div>
        <button type="submit">Login</button>
        <div className="login-forgot">
        <p><a href="#">Forgot Password?</a></p>
        </div>

        </form>

        <div className="login-register">
        <p>New User?&nbsp;<a href="#"> Register Account</a></p>
        </div>

    </div>
    <div className="login-aside">
        <div className="login-img">
    <img src={loginimg} alt="person logging in" />
        </div>
    </div>
</div>
</div>
  );
}
export default Login;