import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getEmailFromJWT, capitalizeFirstLetters, formatPhoneNumber } from '../utilities/utilities';
import provinces from '../data/provinces';
import "../scss/components/_businessdetailsform.scss"; 

async function fetchBusinessData(token, apiUrl) {
    const email = getEmailFromJWT(token);
    const response = await axios.get(`${apiUrl}/api/Business/get-business-by-email?email=${email}`);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response.data;
}

const BusinessDetailsForm = () => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem('token');
    const [businessDetails, setBusinessDetails] = useState({
        contactName: '',
        businessName: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        email: '',
        phone: '',
        description: '',
        logo:  '',
        insuranceCompany: '',
        insuranceExpiryDate: '',
        verificationDocument: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchBusinessData(token, apiUrl);
                updateBusinessDetails(response);
            } catch (error) {
                console.error('Fetching business data failed: ', error);
                setErrorMessage('Failed to fetch business details. Please try again later.');
            }
        }
        fetchData();
    }, [token, apiUrl]);

    const updateBusinessDetails = (data) => {
        const updatedBusinessDetails = {
            contactName: data.contactName || '',
            businessName: data.businessName || '',
            address: data.address || '',
            city: data.city || '',
            province: data.province || '',
            postalCode: data.postalCode || '',
            email: data.email || '',
            phone: data.phone || '',
            description: data.description ||'',
            logo:  data.logo ||'',
            insuranceCompany: data.insuranceCompany ||'',
            insuranceExpiryDate: data.insuranceExpiryDate ||'',
            verificationDocument: data.verificationDocument ||''
        };
        setBusinessDetails(updatedBusinessDetails);
    }

    const handleChange = (e) => {
        let value = e.target.value;
        let errorMessage = '';

        if (e.target.name === 'phone') {
            value = value.replace(/\D/g, '');
            value = value.slice(0, 20);
            if (value.length === 20) {
                errorMessage = 'Phone number is limited to 20 digits.';
            }
        }

        if (e.target.name === 'postalCode') {
            const postalCodePattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
            if (!postalCodePattern.test(value)) {
                errorMessage = 'Invalid postal code format.';
            }
        }

        if (e.target.name === 'email') {
            const emailPattern = /^\S+@\S+\.\S+$/;
            if (!emailPattern.test(value)) {
                errorMessage = 'Invalid email address format.';
            }
        }

        if (e.target.name === 'firstName' || e.target.name === 'lastName' || e.target.name === 'address' || e.target.name === 'city') {
            const namePattern = /^[a-zA-Z0-9\s.,-]*$/;
            if (!namePattern.test(value)) {
                errorMessage = 'Invalid input format. Only letters, numbers, spaces, periods, commas, and dashes are allowed.';
            }
        }

        setBusinessDetails({ ...businessDetails, [e.target.name]:  value });
        setErrorMessage(errorMessage);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setBusinessDetails(prevState => ({
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
        try {
            const response = await axios.post(`${apiUrl}/api/Business/edit-business`, businessDetails);
            console.log(response);
            setSuccessMessage('Business details updated successfully.');
            setTimeout(() => navigate('/editprofilebusiness'), 1000); 
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(`Update failed: ${error.response.data}`);
            } else {
                setErrorMessage('Update failed. Please try again later.');
            }
        }
    };
    

    const handleCancel = () => {
        navigate('/editprofilebusiness');
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
                    value={capitalizeFirstLetters(businessDetails.contactName)}
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
                    value={capitalizeFirstLetters(businessDetails.businessName)}
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
                    value={capitalizeFirstLetters(businessDetails.address)}
                    onChange={handleChange}
                    
                />
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="city">City</label>
                <input
                    className="input"
                    type="text"
                    id="city"
                    name="city"
                    value={capitalizeFirstLetters(businessDetails.city)}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="business-form-group">
                <label htmlFor="province" className="business-label">Province/Territory</label>
                <select 
                    className="input" 
                    id="province"
                    required
                    name="province"
                    value={businessDetails.province}
                    onChange={handleChange}
                >
                    <option value=""></option>
                    {provinces.map((province) => (
                        <option key={province} value={province}>{province}</option>
                    ))}
                </select>
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="postalCode">Postal Code </label>
                <input
                    className="input"
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={capitalizeFirstLetters(businessDetails.postalCode)}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="email">Email</label>
                <input
                    className="input"
                    type="text"
                    id="email"
                    name="email"
                    value={businessDetails.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="phone">Phone</label>
                <input
                    className="input"
                    type="text"
                    id="phone"
                    name="phone"
                    value={formatPhoneNumber(businessDetails.phone)}
                    onChange={handleChange}
                    required
                />
            </div>
            <h2>Update My Business Descriptions</h2>
            <div className="business-form-group">
                <label className="business-label" htmlFor="description">About Us Description</label>
                <textarea
                    className="input"
                    id="description"
                    name="description"
                    value={businessDetails.description}
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
                    onChange={handleImageChange}
                    accept="image/*"
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
                    value={capitalizeFirstLetters(businessDetails.insuranceCompany)}
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
                    name="insuranceExpiryDate"
                    value={businessDetails.insuranceExpiryDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="business-form-group">
                <label className="business-label" htmlFor="verificationDocument">Business License</label>                
                <input
                    className="input"
                    type="file"
                    id="verificationDocument"
                    name="verificationDocument"
                    onChange={handleImageChange}
                    accept="image/*"
                />
            </div>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="button-container">
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
                <p id="register-error">{errorMessage}</p>
            </div>
        </form>
    );
}

BusinessDetailsForm.propTypes = {
    initialData: PropTypes.object
}

export default BusinessDetailsForm;


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
//                 <label className="business-label" htmlFor="verificationDocument">Business License</label>                
//                 <input
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
