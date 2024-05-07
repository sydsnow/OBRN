import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import placeholderImg from "../assets/profile-placeholder.png";

import registerimg from '../assets/register-img.jpg';

function RegisterCustomer(){
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        pkCustomerId: '',
        firstName: '',
        lastName: '',
        phone: '',
        birthdate: new Date(),
        email: '',
        confirm18: false,
        vip: false,
        password: '',
        confirmPassword: '',
        photo: placeholderImg,
        // if registering breaks, it might be this 
        fkReferralId: undefined,
    });

    const [isValidReferral, setIsValidReferral] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = async (e) => {
        let value = e.target.value;
        let errorMessage = '';
    
        switch (e.target.name) {
            case 'confirm18':
                value = e.target.checked;
                break;
            case 'phone':
                // Strip away non-numeric characters
                value = value.replace(/\D/g, '');
                // Limiting phone length to 20 characters
                value = value.slice(0, 20);
                if (value.length === 20) {
                    errorMessage = 'Phone number is limited to 20 digits.'
                }
                break;
            case 'pkCustomerId':
                // Limiting pkCustomerId (username) length to 20 characters
                value = value.slice(0, 20);
                if (value.length === 20) {
                    errorMessage = 'Username is limited to 20 characters.';
                }
                break;
            // if registering breaks, it might be this 
            case 'fkReferralId':
                try {
                    const apiUrl = import.meta.env.VITE_API_BASE_URL;
                    const response = await axios.get(`${apiUrl}/api/referral/get-referral/${value}`);
                    if(response.data) {
                        setIsValidReferral(true);
                    } else {
                        setIsValidReferral(false);
                        errorMessage = 'Invalid referral code';
                    }
                } catch (error) {
                    console.error('Error validating referral code: ', error);
                    // Handle the error, maybe display an error message
                }
                break;
            default:
                break;
        }
    
        setCustomer({ ...customer, [e.target.name]: value });
        setErrorMessage(errorMessage);
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const birthdate = new Date(customer.birthdate);
        const today = new Date();
        const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        if (birthdate > eighteenYearsAgo) {
            setErrorMessage('You must be 18 years or older in order to register with Our Beauty Referral Network.');
            return;
        }
    
        if (customer.password !== customer.confirmPassword) {
            setErrorMessage('Password and Confirm Password must match.');
            return;
        }
        // if registering breaks, it might be this 
        if (!isValidReferral && customer.fkReferralId) {
            setErrorMessage('Please enter a valid referral code.');
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${apiUrl}/api/customer/add-customer`, customer, {
                headers: {
                    'Ocp-Apim-Subscription-Key': import.meta.env.VITE_API_KEY,
                }});
            console.log("response.data: ", response.data);
            const { message, token, referralId } = response.data;
            console.log(message);
            console.log("Referral ID: ", referralId.referralId);// Do something with the referralId (display to user? email to user?)
            localStorage.setItem('token', token.result);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.result}`;
            navigate('/');
        } catch (error) {
            console.error('Registration failed: ', error);
            console.log("error.response.data: ", error.response.data)
            if (error.response && error.response.data) {
                // Display the specific error message from the backend
                setErrorMessage(`Registration failed: ${error.response.data}`);
            } else {
                setErrorMessage('Registration failed. Please try again later.');
            }
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
        <input 
            className='input' 
            type="text" 
            id="fkReferralId" 
            autoComplete='off' 
            name="fkReferralId"
            value={customer.fkReferralId}
            onChange={handleChange}
        />
        <label className="label" htmlFor="fkReferralId">Referral Code <small> *optional</small></label>
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