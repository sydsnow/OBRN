import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../scss/components/_businessdetailsform.scss"; 

function BusinessDetailsForm({ initialData }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        contactName: initialData.contactName || '',
        businessName: initialData.businessName || '',
        address: initialData.address || '',
        city: initialData.city || '',
        province: initialData.province || '',
        postalCode: initialData.postalCode || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        description: initialData.description || '',
        logo: initialData.logo || '',
        insuranceCompany: initialData.insuranceCompany || '',
        insuranceExpiry: initialData.insuranceExpiry || '',
        verificationDocument: initialData.verificationDocument || ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData);
    };

    const handleCancel = () => {
        navigate('/editprofile');
    };

    return (
        <form className="business-form" onSubmit={handleSubmit}>
            <div className="business-form-group">
                <label className="business-label" htmlFor="contactName">Contact Name</label>
                <input
                    className="input"
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="businessName">Business Name</label>
                <input
                    className="input"
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="address">Address</label>
                <input
                    className="input"
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="contactName">City</label>
                <input
                    className="input"
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="contactName">Province</label>
                <input
                    className="input"
                    type="text"
                    id="province"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="contactName">Postal Code </label>
                <input
                    className="input"
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="contactName">Email</label>
                <input
                    className="input"
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="contactName">Phone</label>
                <input
                    className="input"
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>
            <h2>Update My Business Descriptions</h2>
            <div className="business-form-group">
                <label className="business-label" htmlFor="aboutUs">About Us Description</label>
                <textarea
                    className="input"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    maxLength="1200" 
                    rows="5"  
                    placeholder="Describe your business (max 1200 characters)"
                />
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="businesslogo">Business Logo</label>
                <input
                    className="input"
                    type="file"
                    id="businessLogo"
                    name="businessLogo"
                />
            </div>
            <h2>Verify Business</h2>
            <div className="business-form-group">
                <label className="business-label" htmlFor="insuranceCompany">Insurance Company</label>
                <input
                    className="input"
                    type="text"
                    id="insuranceCompany"
                    name="insuranceCompany"
                    value={formData.insuranceCompany}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="insuranceExpiry">Insurance Expiry</label>
                <input
                    className="input"
                    type="date"
                    id="insuranceExpiry"
                    name="insuranceExpiry"
                    value={formData.insuranceExpiry}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="verificationDocument">Business License</label>                <input
                    className="input"
                    type="file"
                    id="verificationDocument"
                    name="verificationDocument"
                />
            </div>
            <div className="button-container">
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default BusinessDetailsForm;
