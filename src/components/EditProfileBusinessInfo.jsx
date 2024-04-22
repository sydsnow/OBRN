import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function EditProfileBusinessInfo({ initialData }) {
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
        <div className="wrapper">
            <div className="edit-business">
                <div className="edit-business-container">
                    <div className="edit-header">
                        <h1>Edit Business Profile</h1>
                        <p>Please update the following details</p>
                    </div>
                    <form className="edit-business-form" onSubmit={handleSubmit}>

                        <div className="edit-business-block">
                            <div className="form-group">
                                <input className='input' type="text" required autoComplete='off' id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} />
                                <label className="label" htmlFor="businessName"><i className="fa-solid fa-building"></i> Business Name</label>
                            </div>
                            <div className="form-group">
                                <input className='input' type="text" required autoComplete='off' id="insuranceCompany" name="insuranceCompany" value={formData.insuranceCompany} onChange={handleChange} />
                                <label className="label" htmlFor="insuranceCompany"> Insurance Company</label>
                            </div>
                            <div className="form-group">
                                <input className='input2' type="date" required autoComplete='off' id="insuranceExpiry" name="insuranceExpiry" value={formData.insuranceExpiry} onChange={handleChange} />
                                <label className="label" htmlFor="insuranceExpiry"> Insurance Expiry</label>
                            </div>
                            <div className="form-group">
                                <input className='input2' type="file" required id="businessLicense" name="businessLicense" />
                                <label className="label" htmlFor="businessLicense">
                                    <i className="fa-solid fa-upload"></i> Business License</label>
                            </div>
                        </div>
                        <button type="submit">Update Business Details</button>
                        <button type="button" onClick={handleCancel}>Cancel</button> 
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfileBusinessInfo;
