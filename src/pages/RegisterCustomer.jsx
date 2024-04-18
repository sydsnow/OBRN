import { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

import registerimg from '../assets/register-img.jpg';

function RegisterCustomer(){
    const [customer, setCustomer] = useState({
        pkCustomerId: '',
        firstName: '',
        lastName: '',
        phone: '',
        birthdate: new Date(),
        email: '',
        confirm18: '0',
        qr: '',
        vip: '0',
        photo: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        if (e.target.name === 'confirm18') {
            const value = e.target.checked ? '1' : '0';
            setCustomer({ ...customer, [e.target.name]: value });
        } else {
            setCustomer({ ...customer, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("customer: ", customer);
        if (customer.password !== customer.confirmPassword) {
            setErrorMessage('Password and Confirm Password must match');
            return;
        }

        try {
            const hashedPassword = await bcrypt.hash(customer.password, 10);
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${apiUrl}/api/customer/addcustomer`, { ...customer, password: hashedPassword, confirmPassword: hashedPassword });
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
    <div className="register">
    <div className="register-container">

        <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-header">
        <h1>Customer Registration</h1>
        <p>Please fill out the following details</p>
        </div>
        <div className="form-group">
        <input 
            className='input' 
            type="firstName" 
            required autoComplete='off' 
            id="firstName" 
            name="firstName" 
            value={customer.firstName} 
            onChange={handleChange} 
        />
        <label className="label" htmlFor="firstName">            <i className="fa-solid fa-user"></i> First Name</label>
        </div>
        <div className="form-group">
        <input 
            className='input' 
            type="lastName" 
            required 
            autoComplete='off' 
            id="lastName" 
            name="lastName" 
            value={customer.lastName} 
            onChange={handleChange}
        />
        <label className="label" htmlFor="lastName">            <i className="fa-regular fa-user"></i> Last Name</label>
        </div>
        <div className="form-group">
        <input 
            className='input' 
            type="phone" 
            required 
            autoComplete='off' 
            id="phone" 
            name="phone" 
            value={customer.phone} 
            onChange={handleChange} 
        />
        <label className="label" htmlFor="phone">            <i className="fa-solid fa-phone"></i> Phone</label>
        </div>
        <div className="form-group">
        <input 
            className='input2' 
            type="date" 
            required 
            autoComplete='off' 
            id="birthdate" 
            name="birthdate" 
            value={customer.birthdate} 
            onChange={handleChange} 
        />
        <label className="label" htmlFor="birthdate"><i className="fa-regular fa-calendar"></i> Birthday</label>
        </div>
        <div className="form-group">
        <input 
            className='input' 
            type="email" 
            required 
            autoComplete='off' 
            id="email" 
            name="email" 
            value={customer.email} 
            onChange={handleChange}
        />
        <label className="label" htmlFor="email">            <i className="fa-regular fa-envelope"></i> Email</label>
        </div>
        <div className="form-group">
        <input 
            className='input' 
            type="username" 
            required 
            autoComplete='off' 
            id="username" 
            name="pkCustomerId" 
            value={customer.pkCustomerId} 
            onChange={handleChange}
        />
        <label className="label" htmlFor="username">            <i className="fa-regular fa-circle-user"></i> Username</label>
        </div>
        <div className="form-group">
        <input 
            className='input' 
            type="password" 
            id="password" 
            required 
            autoComplete='off' 
            name="password"
            value={customer.password}
            onChange={handleChange}
        />
        <label className="label" htmlFor="password"> <i className="fa-solid fa-key"></i> Password</label>
        </div>
        <div className="form-group">
        <input 
            className='input' 
            type="password" 
            id="confirmPassword" 
            required 
            autoComplete='off' 
            name="confirmPassword"
            value={customer.confirmPassword}
            onChange={handleChange}
        />
        <label className="label" htmlFor="confirmPassword"> <i className="fa-solid fa-key"></i> Confirm Password</label>
        </div>
        <div className="form-group">
    <input className='input-checkbox' type="checkbox" id="overEighteen" name="confirm18" required value={customer.confirm18} onChange={handleChange} />
    <label  htmlFor="overEighteen">I confirm that I am over 18 years old</label>
</div>

        <button type="submit">Register</button>
        <p id="register-error">{errorMessage}</p>
        </form>

        <div className="register-login">
        <p>Already a user?&nbsp;<a href="#"> Login</a></p>
        </div>
    </div>
    <div className="register-aside">

    <img src={registerimg} alt="person registering in" />
    </div>
</div>
</div>
    )
}
export default RegisterCustomer;