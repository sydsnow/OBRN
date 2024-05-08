import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import provinces from '../data/provinces';

import registerbsn from '../assets/register-bsn.jpg';

function RegisterBusiness() {
    const navigate = useNavigate();
    const [business, setBusiness] = useState({
        pkBusinessId: '',
        businessName: '',
        contactName: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        email: '',
        phone: '',
        insuranceCompany: '',
        insuranceExpiryDate: '',
        verificationDocument: '',
        logo: '',
        password: '',
        confirmPassword: '',
        fkReferralId: null,
        membershipType: 'basic-yearly'  // Default to 'basic-yearly'
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [isValidReferral, setIsValidReferral] = useState(false);

    const handleChange = async (e) => {
        const { name, type, value, checked } = e.target;
        let actualValue = type === 'checkbox' ? checked : value;

        if (name === 'phone' || name === 'pkBusinessId') {
            let newValue = value.replace(/\D/g, '');
            newValue = newValue.slice(0, name === 'phone' ? 20 : 30);  // Limit character length
            if (newValue.length === (name === 'phone' ? 20 : 30)) {
                setErrorMessage(`${name === 'phone' ? 'Phone number' : 'Username'} is limited to ${name === 'phone' ? 20 : 30} characters.`);
            }
            actualValue = newValue;
        }

        if (name === 'fkReferralId') {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/api/referral/get-referral/${value}`);
                setIsValidReferral(response.data ? true : false);
            } catch (error) {
                console.error('Error validating referral code: ', error);
                setErrorMessage('Invalid referral code');
            }
        }

        setBusiness(prev => ({ ...prev, [name]: actualValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (business.password !== business.confirmPassword) {
            setErrorMessage('Password and Confirm Password must match');
            return;
        }

        if (!isValidReferral && business.fkReferralId) {
            setErrorMessage('Please enter a valid referral code.');
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${apiUrl}/api/Business/add-business`, business, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            console.log("response: ", response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            console.error('Registration failed: ', error);
            setErrorMessage(`Registration failed: ${error.response ? error.response.data : "Please try again later."}`);
        }
    };

    return (
        <div className="wrapper">
            <div className="register">
                <div className="register-business-container">
                    <div className="register-header">
                        <h1>Business Registration</h1>
                        <p>Please fill out the following details. All fields are required.</p>
                    </div>
                    <form className="register-business-form" onSubmit={handleSubmit}>

                        <div className="register-business-block">
                            <div className="form-group">
                                <input
                                    className='input'
                                    type="string"
                                    required
                                    autoComplete='off'
                                    id="businessName"
                                    name="businessName"
                                    value={business.businessName}
                                    onChange={handleChange}
                                />
                                <label className="label" htmlFor="businessName"><i className="fa-solid fa-building"></i> Business Name</label>
                            </div>
                            <div className="form-group">
                                <input
                                    className='input'
                                    type="string"
                                    required
                                    autoComplete='off'
                                    id="contactName"
                                    name="contactName"
                                    value={business.contactName}
                                    onChange={handleChange}
                                />
                                <label className="label" htmlFor="contactName"><i className="fa-regular fa-user"></i> Contact Name</label>
                            </div>
                            <div className="form-group">
                                <input
                                    className='input'
                                    type="string"
                                    required
                                    autoComplete='off'
                                    id="phone"
                                    name="phone"
                                    value={business.phone}
                                    onChange={handleChange}
                                />
                                <label className="label" htmlFor="phone"><i className="fa-solid fa-phone"></i> Phone</label>
                            </div>
                            <div className="form-group">
                                <input
                                    className='input'
                                    type="string"
                                    required
                                    autoComplete='off'
                                    id="address"
                                    name="address"
                                    value={business.address}
                                    onChange={handleChange}
                                />
                                <label className="label" htmlFor="address"><i className="fa-solid fa-location-dot"></i> Street Address</label>
                            </div>
                            <div className="form-group">
                                <input
                                    className='input'
                                    type="string"
                                    required
                                    autoComplete='off'
                                    id="city"
                                    name="city"
                                    value={business.city}
                                    onChange={handleChange}
                                />
                                <label className="label" htmlFor="city"> City</label>
                            </div>
                            <div className="form-group">
                                <select
                                    className="input"
                                    id="province"
                                    required
                                    name="province"
                                    value={business.province}
                                    onChange={handleChange}
                                >
                                    <option value=""></option>
                                    {provinces.map((province) => (
                                        <option key={province} value={province}>{province}</option>
                                    ))}
                                </select>
                                <label htmlFor="province" className="label">Province/Territory</label>
                            </div>
                            <div className="form-group">
                                <input
                                    className='input'
                                    type="string"
                                    required
                                    autoComplete='off'
                                    id="postalCode"
                                    name="postalCode"
                                    value={business.postalCode}
                                    onChange={handleChange}
                                />
                                <label className="label" htmlFor="postalCode"> Postal Code</label>
                            </div>
                            <div className="form-group">
                                <input
                                    className='input'
                                    type="email"
                                    required
                                    autoComplete='off'
                                    id="email"
                                    name="email"
                                    value={business.email}
                                    onChange={handleChange}
                                />
                                <label className="label" htmlFor="email">            <i className="fa-regular fa-envelope"></i> Email</label>
                            </div>
                        </div>
                        <div className="register-business-block">

                            <div className="form-group">
                                <input
                                    className='input'
                                    type="string"
                                    id="insuranceCompany"
                                    required
                                    autoComplete='off'
                                    name="insuranceCompany"
                                    value={business.insuranceCompany}
                                    onChange={handleChange}
                                />
                                <label className="label" htmlFor="insuranceCompany"> Insurance Company</label>
                            </div>
                            <div className="form-group">
                                <input
                                    className='input2'
                                    type="date"
                                    required
                                    autoComplete='off'
                                    id="insuranceExpiryDate"
                                    name="insuranceExpiryDate"
                                    value={business.insuranceExpiryDate}
                                    onChange={handleChange}
                                />
                                <label className="label" htmlFor="insuranceExpiryDate"> Insurance Expiry</label>
                            </div>
                            <div className="form-group">
                                <input
                                    className='input2'
                                    type="file"
                                    required
                                    id="verificationDocument"
                                    name="verificationDocument"
                                    accept=".jpg,.jpeg,.png,.doc,.docx,.pdf"
                                    value={business.verificationDocument}
                                    /* onChange={(e) => handleImageChange(e, 'verificationDocument')} */
                                    onChange={handleChange}
                                />
                                <label className="label" htmlFor="verificationDocument">
                                    <i className="fa-solid fa-upload"></i> Business License</label>
                            </div>
                            <div className="form-group">
                                <input
                                    className='input2'
                                    type="file"
                                    required
                                    id="logo"
                                    name="logo"
                                    value={business.logo}
                                    /* onChange={(e) => handleImageChange(e, 'logo')} */
                                    onChange={handleChange}
                                />
                                <label className="label" htmlFor="logo">
                                    <i className="fa-solid fa-upload"></i> Logo</label>
                            </div>
                            <div className="form-group">
                                <input
                                    className='input'
                                    type="string"
                                    required
                                    autoComplete='off'
                                    id="username"
                                    name="pkBusinessId"
                                    value={business.pkBusinessId}
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
                                    value={business.password}
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
                                    value={business.confirmPassword}
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
                                    value={business.fkReferralId}
                                    onChange={handleChange}
                                />
                                <label className="label" htmlFor="fkReferralId">Referral Code <small> *optional</small></label>
                            </div>
                            <div className="form-group">
                                <label>
                                    <input type="radio" name="membershipType" value="basic-yearly" checked={business.membershipType === 'basic-yearly'} onChange={handleChange} />
                                    Basic Membership ($250 yearly)
                                </label>
                                <label>
                                    <input type="radio" name="membershipType" value="vip-yearly" checked={business.membershipType === 'vip-yearly'} onChange={handleChange} />
                                    VIP Membership ($650 yearly)
                                </label>
                                <label>
                                    <input type="radio" name="membershipType" value="basic-monthly" checked={business.membershipType === 'basic-monthly'} onChange={handleChange} />
                                    Basic Membership ($27 monthly)
                                </label>
                                <label>
                                    <input type="radio" name="membershipType" value="vip-monthly" checked={business.membershipType === 'vip-monthly'} onChange={handleChange} />
                                    VIP Membership ($63 monthly)
                                </label>
                            </div>

                            <button type="submit">Register</button>
                            <p id="register-error">{errorMessage}</p>
                        </div>
                    </form>
                    <div className="register-login">
                        <p>Already a user?&nbsp;<a href="#"> Login</a></p>
                    </div>
                </div>
                <div className="register-business-aside">

                    <img src={registerbsn} alt="person registering in" />
                </div>
            </div>
        </div>
    )
}
export default RegisterBusiness;