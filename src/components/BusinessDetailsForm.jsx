import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../scss/components/_businessdetailsform.scss"; 

function BusinessDetailsForm({ initialData }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        businessName: initialData.businessName || '',
        insuranceCompany: initialData.insuranceCompany || '',
        insuranceExpiry: initialData.insuranceExpiry || '',
        businessLicense: initialData.businessLicense || ''
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
                <label className="business-label" htmlFor="businessLicense">Business License</label>
                <input
                    className="input"
                    type="file"
                    id="businessLicense"
                    name="businessLicense"
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
