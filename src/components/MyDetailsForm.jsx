import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../scss/components/_mydetailsform.scss";

function MyDetailsForm({ initialData }) {
    console.log("initial data: ", initialData);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: initialData?.firstName,
        lastName: initialData?.lastName,
        phone: initialData?.phoneNumber,
        birthdate: initialData?.birthdate,
        email: initialData?.email,
        address: initialData?.address || '',
        city: initialData?.city || '',
        province: initialData?.province || '',
        postalCode: initialData?.postalCode || '',
        // photo: initialData?.photo || ''
    });
    console.log("form data: ", formData);
    const [errorMessage, setErrorMessage] = useState('');

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };

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
        
        setFormData({ ...formData, [e.target.name]:  value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prevState => ({
                ...prevState,
                photo: reader.result 
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log('Form Data:', formData);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const birthdate = new Date(formData.birthdate);
        const today = new Date();
        const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        if (birthdate < eighteenYearsAgo) {
            setErrorMessage('You must be 18 years or older in order to be registered with Our Beauty Referral Network.');
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${apiUrl}/api/customer/editcustomer`, formData);
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
                    value={formData.firstName}
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
                    value={formData.lastName}
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
                    value={formData.phone}
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
                    value={formData.birthdate}
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
                    value={formData.address}
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
                    value={formData.city}
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
                    value={formData.province}
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
                    value={formData.postalCode}
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
