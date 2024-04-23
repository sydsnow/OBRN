import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../scss/components/_mydetailsform.scss";

function MyDetailsForm({ initialData }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        contactName: initialData.name,
        email: initialData.email,
        phoneNumber: initialData.phoneNumber,
        location: initialData.location,
        address: initialData.address || '',
        city: initialData.city || '',
        province: initialData.province || '',
        postalCode: initialData.postalCode || '',
        photo: initialData.photo || ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData);
    };

    const handleCancel = () => {
        navigate('/editprofile');
    };

    return (
        <form className="profile-form" onSubmit={handleSubmit}>
            <div className="profile-form-group">
                <label className="profile-label" htmlFor="contactName">Contact Name</label>
                <input
                    className="input"
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                />
            </div>
            <div className="profile-form-group">
                <label className="profile-label" htmlFor="email">Email</label>
                <input
                    className="input"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="profile-form-group">
                <label className="profile-label" htmlFor="phoneNumber">Phone Number</label>
                <input
                    className="input"
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
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
        </form>
    );
}

export default MyDetailsForm;
