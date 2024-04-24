import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../scss/components/_mydetailsform.scss";
import { getEmailFromJWT } from '../utilities/utilities';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem('token');
const email = getEmailFromJWT(token);
const response = await axios.get(`${apiUrl}/api/customer/getcustomerbyemail?email=${email}`);
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const MyDetailsForm = () => {
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phone: response.data.phone,
        birthdate: response.data.birthdate,
        email: response.data.email,
        address: response.data.address || '',
        city: response.data.city || '',
        province: response.data.province || '',
        postalCode: response.data.postalCode || '',
        vip: false,
        // photo: initialData?.photo || ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        let value = e.target.value;
        let errorMessage = '';

        if (e.target.name === 'phone') {
            // Strip away non-numeric characters
            value = value.replace(/\D/g, '');
            // Limiting phone length to 20 characters
            value = value.slice(0, 20);
            if (value.length === 20) {
                errorMessage = 'Phone number is limited to 20 digits.';
                setErrorMessage(errorMessage);
            }
        }
        
        setUserDetails({ ...userDetails, [e.target.name]:  value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setUserDetails(prevState => ({
                ...prevState,
                photo: reader.result 
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const birthdate = new Date(userDetails.birthdate);
        const today = new Date();
        const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        if (birthdate > eighteenYearsAgo) {
            setErrorMessage('You must be 18 years or older in order to be registered with Our Beauty Referral Network.');
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/api/customer/editcustomer`, userDetails);
            console.log(response.data);
        } catch (error) {
            console.error('Updating customer failed: ', error);
            console.log("error.response.data: ", error.response.data);
            if (error.response && error.response.data) {
                // Display the specific error message from the backend
                setErrorMessage(`Registration failed: ${error.response.data}`);
            } else {
                setErrorMessage('Registration failed. Please try again later.');
            }
        }
    }

    const handleCancel = () => {
        navigate('/editprofile');
    };

    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            <div className="profile-form-group">
                <label className="profile-label" htmlFor="firstName">First Name</label>
                <input
                    className="input"
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={userDetails.firstName}
                    onChange={handleChange}
                />
            </div>
            <div className="profile-form-group">
                <label className="profile-label" htmlFor="lastName">Last Name</label>
                <input
                    className="input"
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={userDetails.lastName}
                    onChange={handleChange}
                />
            </div>
            <div className="profile-form-group">
                <label className="profile-label" htmlFor="phone">Phone Number</label>
                <input
                    className="input"
                    type="text"
                    id="phone"
                    name="phone"
                    required
                    value={userDetails.phone}
                    onChange={handleChange}
                />
            </div>
            <div className="profile-form-group">
                <label className="profile-label" htmlFor="birthdate">Birthdate</label>
                <input
                    className="input"
                    type="date"
                    id="birthdate"
                    name="birthdate"
                    required
                    value={userDetails.birthdate}
                    onChange={handleChange}
                />
            </div>
            <div className="profile-form-group">
                <label className="profile-label" htmlFor="address">Address</label>
                <input
                    className="input"
                    type="text"
                    id="address"
                    name="address"
                    value={userDetails.address}
                    onChange={handleChange}
                />
            </div>
            <div className="profile-form-group">
                <label className="profile-label" htmlFor="city">City</label>
                <input
                    className="input"
                    type="text"
                    id="city"
                    name="city"
                    value={userDetails.city}
                    onChange={handleChange}
                />
            </div>
            <div className="profile-form-group">
                <label className="profile-label" htmlFor="province">Province</label>
                <input
                    className="input"
                    type="text"
                    id="province"
                    name="province"
                    value={userDetails.province}
                    onChange={handleChange}
                />
            </div>
            <div className="profile-form-group">
                <label className="profile-label" htmlFor="postalCode">Postal Code</label>
                <input
                    className="input"
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={userDetails.postalCode}
                    onChange={handleChange}
                />
            </div>
            <div className="profile-form-group">
                <label className="profile-label" htmlFor="photo">Profile Picture</label>
                <input
                    className="input"
                    type="file"
                    id="photo"
                    name="photo"
                    onChange={handleImageChange}
                    accept="image/*"
                />
            </div>
            <div className="button-container">
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
            <p id="register-error">{errorMessage}</p>
        </form>
    );
}

MyDetailsForm.propTypes = {
    initialData: PropTypes.object,
}

export default MyDetailsForm;
