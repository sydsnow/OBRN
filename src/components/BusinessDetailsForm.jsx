// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
// import provinces from '../data/provinces';
// import "../scss/components/_businessdetailsform.scss"; 

// function BusinessDetailsForm({ initialData }) {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         contactName: initialData.contactName || '',
//         businessName: initialData.businessName || '',
//         address: initialData.address || '',
//         city: initialData.city || '',
//         province: initialData.province || '',
//         postalCode: initialData.postalCode || '',
//         email: initialData.email || '',
//         phone: initialData.phone || '',
//         description: initialData.description || '',
//         logo: initialData.logo || '',
//         insuranceCompany: initialData.insuranceCompany || '',
//         insuranceExpiry: initialData.insuranceExpiry || '',
//         verificationDocument: initialData.verificationDocument || ''
//     });

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log('Form Data:', formData);
//     };

//     const handleCancel = () => {
//         navigate('/editprofile');
//     };

//     return (
//         <form className="business-form" onSubmit={handleSubmit}>
//             <div className="business-form-group">
//                 <label className="business-label" htmlFor="contactName">Contact Name</label>
//                 <input
//                     className="input"
//                     type="text"
//                     id="contactName"
//                     name="contactName"
//                     value={formData.contactName}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div className="business-form-group">
//                 <label className="business-label" htmlFor="businessName">Business Name</label>
//                 <input
//                     className="input"
//                     type="text"
//                     id="businessName"
//                     name="businessName"
//                     value={formData.businessName}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div className="business-form-group">
//                 <label className="business-label" htmlFor="address">Address</label>
//                 <input
//                     className="input"
//                     type="text"
//                     id="address"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div className="business-form-group">
//                 <label className="business-label" htmlFor="city">City</label>
//                 <input
//                     className="input"
//                     type="text"
//                     id="city"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div className="business-form-group">
//                 <label htmlFor="province" className="business-label">Province/Territory</label>
//                 <select 
//                     className="input" 
//                     id="province"
//                     required
//                     name="province"
//                     value={formData.province}
//                     onChange={handleChange}
//                 >
//                     <option value=""></option>
//                     {provinces.map((province) => (
//                         <option key={province} value={province}>{province}</option>
//                     ))}
//                 </select>
//             </div>
//             <div className="business-form-group">
//                 <label className="business-label" htmlFor="postalCode">Postal Code </label>
//                 <input
//                     className="input"
//                     type="text"
//                     id="postalCode"
//                     name="postalCode"
//                     value={formData.postalCode}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div className="business-form-group">
//                 <label className="business-label" htmlFor="email">Email</label>
//                 <input
//                     className="input"
//                     type="text"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div className="business-form-group">
//                 <label className="business-label" htmlFor="phone">Phone</label>
//                 <input
//                     className="input"
//                     type="text"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <h2>Update My Business Descriptions</h2>
//             <div className="business-form-group">
//                 <label className="business-label" htmlFor="description">About Us Description</label>
//                 <textarea
//                     className="input"
//                     id="description"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     maxLength="1200" 
//                     rows="5"  
//                     placeholder="Describe your business (max 1200 characters)"
//                 />
//             </div>
//             <div className="business-form-group">
//                 <label className="business-label" htmlFor="businessLogo">Business Logo</label>
//                 <input
//                     className="input"
//                     type="file"
//                     id="businessLogo"
//                     name="businessLogo"
//                 />
//             </div>
//             <h2>Verify Business</h2>
//             <div className="business-form-group">
//                 <label className="business-label" htmlFor="insuranceCompany">Insurance Company</label>
//                 <input
//                     className="input"
//                     type="text"
//                     id="insuranceCompany"
//                     name="insuranceCompany"
//                     value={formData.insuranceCompany}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div className="business-form-group">
//                 <label className="business-label" htmlFor="insuranceExpiry">Insurance Expiry</label>
//                 <input
//                     className="input"
//                     type="date"
//                     id="insuranceExpiry"
//                     name="insuranceExpiry"
//                     value={formData.insuranceExpiry}
//                     onChange={handleChange}
//                     required
//                 />
//             </div>
//             <div className="business-form-group">
//                 <label className="business-label" htmlFor="verificationDocument">Business License</label>                <input
//                     className="input"
//                     type="file"
//                     id="verificationDocument"
//                     name="verificationDocument"
//                 />
//             </div>
//             <div className="button-container">
//                 <button type="submit">Save</button>
//                 <button type="button" onClick={handleCancel}>Cancel</button>
//             </div>
//         </form>
//     );
// }

// BusinessDetailsForm.propTypes = {
//     initialData: PropTypes.object
// }

// export default BusinessDetailsForm;

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import provinces from '../data/provinces';
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
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.contactName.trim()) {
            errors.contactName = 'Contact name is required.';
        }
        if (!formData.businessName.trim()) {
            errors.businessName = 'Business name is required.';
        }
        if (!formData.address.trim()) {
            errors.address = 'Address is required.';
        }
        if (!formData.city.trim()) {
            errors.city = 'City is required.';
        }
        if (!formData.province) {
            errors.province = 'Province/Territory is required.';
        }
        if (!formData.postalCode.trim()) {
            errors.postalCode = 'Postal code is required.';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            errors.email = 'Please enter a valid email address.';
        }
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone.trim())) {
            errors.phone = 'Please enter a valid phone number.';
        }
        // You can add more validation rules as needed
        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            // Form is valid, submit data
            console.log('Form Data:', formData);
        } else {
            // Set validation errors
            setErrors(validationErrors);
        }
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
                {errors.contactName && <p className="error-message">{errors.contactName}</p>}
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
                {errors.businessName && <p className="error-message">{errors.businessName}</p>}
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
                {errors.address && <p className="error-message">{errors.address}</p>}
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="city">City</label>
                <input
                    className="input"
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
                {errors.city && <p className="error-message">{errors.city}</p>}
            </div>
            <div className="business-form-group">
                <label htmlFor="province" className="business-label">Province/Territory</label>
                <select 
                    className="input" 
                    id="province"
                    required
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                >
                    <option value=""></option>
                    {provinces.map((province) => (
                        <option key={province} value={province}>{province}</option>
                    ))}
                </select>
                {errors.province && <p className="error-message">{errors.province}</p>}
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="postalCode">Postal Code </label>
                <input
                    className="input"
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                />
                {errors.postalCode && <p className="error-message">{errors.postalCode}</p>}
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="email">Email</label>
                <input
                    className="input"
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="phone">Phone</label>
                <input
                    className="input"
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>
            <h2>Update My Business Descriptions</h2>
            <div className="business-form-group">
                <label className="business-label" htmlFor="description">About Us Description</label>
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
                <label className="business-label" htmlFor="businessLogo">Business Logo</label>
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
                {errors.insuranceCompany && <p className="error-message">{errors.insuranceCompany}</p>}
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
                {errors.insuranceExpiry && <p className="error-message">{errors.insuranceExpiry}</p>}
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="verificationDocument">Business License</label>
                <input
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

BusinessDetailsForm.propTypes = {
    initialData: PropTypes.object
}

export default BusinessDetailsForm;
