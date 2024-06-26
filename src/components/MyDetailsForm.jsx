import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../scss/components/_mydetailsform.scss";
import { getEmailFromJWT, capitalizeFirstLetters, formatPhoneNumber } from '../utilities/utilities';
import provinces from '../data/provinces';
import { BlobServiceClient } from '@azure/storage-blob';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

async function fetchCustomerData(token, apiUrl) {
    const email = getEmailFromJWT(token);
    const response = await axios.get(`${apiUrl}/api/customer/get-customer-by-email?email=${email}`);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response.data;
}

async function fetchSasToken() {
    const response = await axios.get(`${apiUrl}/api/sastoken/get-sas-token`);
    return response.data.sasToken;
}

const MyDetailsForm = () => {
    const navigate = useNavigate();
    const account = import.meta.env.VITE_STORAGE_ACCOUNT;
    const containerName = import.meta.env.VITE_STORAGE_CONTAINER;
    const token = localStorage.getItem('token');
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        birthdate: '',
        email: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        vip: false,
        photo: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [file, setFile] = useState(null);
    const [sasToken, setSasToken] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const customerResponse = await fetchCustomerData(token, apiUrl);
                updateUserDetails(customerResponse);
                const sasResponse = await fetchSasToken();
                setSasToken(sasResponse);
            } catch (error) {
                console.error('Fetching customer data failed: ', error);
                setErrorMessage('Failed to fetch user details. Please try again later.');
            }
        }
        fetchData();
    }, [token]);

    const updateUserDetails = (data) => {
        const updatedUserDetails = {
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            phone: data.phone || '',
            birthdate: data.birthdate || '',
            email: data.email || '',
            address: data.address || '',
            city: data.city || '',
            province: data.province || '',
            postalCode: data.postalCode || '',
            vip: data.vip || false,
            photo: data.photo || ''
        };
        setUserDetails(updatedUserDetails);
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
            const namePattern = /^[a-zA-Z\s]*$/;
            if (!namePattern.test(value)) {
                errorMessage = 'Invalid input format. Only letters and spaces are allowed.';
            }
        }

        setUserDetails({ ...userDetails, [e.target.name]:  value });
        setErrorMessage(errorMessage);
    };

    // const handleImageChange = (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         setUserDetails(prevState => ({
    //             ...prevState,
    //             photo: reader.result 
    //         }));
    //     };
    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // };

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
            if (file) {
                const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sasToken}`);
                const containerClient = blobServiceClient.getContainerClient(containerName);
                const blobName = `${new Date().getTime()}-${file.name}`;
                const blobClient = containerClient.getBlockBlobClient(blobName);
                await blobClient.uploadData(file, { blobHTTPHeaders: { blobClientType: file.type } });
                console.log("Blob uploaded successfully: ", blobName);
                // Update userDetails.photo with the blobName
                const updatedUserDetails = { ...userDetails, photo: blobName };
                const response = await axios.post(`${apiUrl}/api/customer/edit-customer`, updatedUserDetails);
                console.log("Response from edit-customer: ", response.data);
                setErrorMessage(response.data);
                setTimeout(() => {
                    navigate('/editprofile');
                    setErrorMessage('');
                }, 2000);
            } else {
                // If no file is selected, directly call axios.post with userDetails
                const response = await axios.post(`${apiUrl}/api/customer/edit-customer`, userDetails);
                console.log("Response from edit-customer: ", response.data);
                setErrorMessage(response.data);
                setTimeout(() => {
                    navigate('/editprofile');
                    setErrorMessage('');
                }, 2000);
            }
        } catch (error) {
            console.error('Updating customer failed: ', error);
            console.log("error.response.data: ", error.response.data);
            if (error.response && error.response.data) {
                setErrorMessage(`Updating customer details failed: ${error.response.data}`);
            } else {
                setErrorMessage('Updating customer details failed. Please try again later.');
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
                    value={capitalizeFirstLetters(userDetails.firstName)}
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
                    value={capitalizeFirstLetters(userDetails.lastName)}
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
                    value={formatPhoneNumber(userDetails.phone)}
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
                    value={capitalizeFirstLetters(userDetails.address)}
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
                    value={capitalizeFirstLetters(userDetails.city)}
                    onChange={handleChange}
                />
            </div>
            <div className="profile-form-group">
                <label htmlFor="province" className="profile-label">Province/Territory</label>
                <select
                    className="input"
                    id="province"
                    name="province"
                    value={userDetails.province}
                    onChange={handleChange}
                >
                    <option value=""></option>
                    {provinces.map((province) => (
                        <option key={province} value={province}>{province}</option>
                    ))}
                </select>
            </div>
            <div className="profile-form-group">
                <label className="profile-label" htmlFor="postalCode">Postal Code</label>
                <input
                    className="input"
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={capitalizeFirstLetters(userDetails.postalCode)}
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
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/*"
                />
            </div>
            <p id="register-error">{errorMessage}</p>
            <div className="button-container">
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
}

MyDetailsForm.propTypes = {
    initialData: PropTypes.object,
}

export default MyDetailsForm;