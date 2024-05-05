import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import provinces from '../data/provinces';

function AdminEditBusiness() {
    const { id } = useParams(); // Fetch the customer ID from the URL params
    const [business, setBusiness] = useState(null);
    const [editing, setEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Fetch customer details when component mounts
        const fetchBusiness = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/api/Business/get-business/${id}`);
                setBusiness(response.data); // Assuming response.data is the customer details
            } catch (error) {
                console.error('Failed to fetch business: ', error);
            }
        };

        fetchBusiness();

        // Cleanup function
        return () => {
            // Cleanup logic if needed
        };
    }, [id]);

    const handleInputChange = (e) => {
        setBusiness({ ...business, [e.target.name]: e.target.value });
    };
    const handleIsVerifiedChange = () => {
        setBusiness({ ...business, isVerified: !business.isVerified });
    };

    const validateInput = () => {
        if (!business.businessName || !business.contactName || !business.email || !business.phone || !business.address || !business.city || !business.province || !business.postalCode || !business.insuranceCompany || !business.insuranceExpiryDate || !business.verificationDocument) {
            setErrorMessage('All fields are required.');
            return false;
        }

        if (!validateEmail(business.email)) {
            setErrorMessage('Invalid email format.');
            return false;
        }

        if (!validatePhone(business.phone)) {
            setErrorMessage('Invalid phone number format.');
            return false;
        }

        if (!validatePostalCode(business.postalCode)) {
            setErrorMessage('Invalid postal code format.');
            return false;
        }

        // Additional validation logic for other fields can be added here

        return true;
    };

    const validateEmail = (email) => {
        // Regular expression for validating email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        // Regular expression for validating phone number format
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const validatePostalCode = (postalCode) => {
        // Regular expression for validating postal code format
        const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        return postalCodeRegex.test(postalCode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInput()) {
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.put(`${apiUrl}/api/Customer/updatecustomer/${id}`, business);
            console.log('Business updated:', response.data);
            setEditing(false);
        } catch (error) {
            console.error('Failed to update business: ', error);
        }
    };

    if (!business) {
        return <div>Loading...</div>;
    }

    return (
        <div className="wrapper">
            <div className="admin">
                <Link to="/admin-all-businesses"><button>Back to Businesses</button></Link>
                <div className="admin-edit-container">
                    <h1>Edit Business Details</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div className="admin-customer-details">
                        <div className="admin-customer-info">
                            <label>Is Verified?</label>
                            {editing ? (
                                <input
                                    type="checkbox"
                                    name="isVerified"
                                    checked={business.isVerified}
                                    onChange={handleIsVerifiedChange}
                                />
                            ) : (
                                <p>{business.isVerified ? 'Yes' : 'No'}</p>
                            )}
                         </div>      
                        <div className="admin-customer-info">
                            <label>Business Name:</label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="businessName"
                                    value={business.businessName}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{business.businessName}</p>
                            )}
                        </div>
                        <div className="admin-customer-info">
                            <label>Contact Name:</label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="contactName"
                                    value={business.contactName}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{business.contactName}</p>
                            )}
                        </div>
                        <div className="admin-customer-info">
                            <label>Email:</label>
                            {editing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={business.email}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{business.email}</p>
                            )}
                        </div>
                        <div className="admin-customer-info">
                            <label>Phone:</label>
                            {editing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={business.phone}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{business.phone}</p>
                            )}
                            </div>
                            <div className="admin-customer-info">
                            <label>Username:</label>
                            {editing ? (
                                <input
                                    className='readonly-input'
                                    type="text"
                                    name="username"
                                    readOnly
                                    value={business.pkBusinessId}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{business.pkBusinessId}</p>
                            )}
                        </div>

                        <div className="admin-customer-info">
                            <label>Street Address:</label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="address"          
                                    value={business.address}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{business.address}</p>
                            )}
                        </div>
                        <div className="admin-customer-info">
                            <label>City:</label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="city"
                                    value={business.city}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{business.city}</p>
                            )}
                        </div>
                        <div className="admin-customer-info">
                            <label htmlFor="province">Province/Territory:</label>
                            {editing ? (
                                <select 
                                    name="province" 
                                    id="province"
                                    value={business.province}
                                    onChange={handleInputChange}
                                >
                                    <option value=""></option>
                                    {provinces.map((province) => (
                                        <option key={province} value={province}>{province}</option>
                                    ))}
                                </select>
                            ) : (
                                <p>{business.province}</p>
                            )}
                        </div>
                        <div className="admin-customer-info">
                            <label>Postal Code:</label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={business.postalCode}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{business.postalCode}</p>
                            )}
                        </div>
                        <div className="admin-customer-info">
                            <label>Insurance Company:</label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="insuranceCompany"
                                    value={business.insuranceCompany}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{business.insuranceCompany}</p>
                            )}
                        </div>
                        <div className="admin-customer-info">
                            <label>Insurance Expiry:</label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="insuranceExpiryDate"
                                    value={business.insuranceExpiryDate}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{business.insuranceExpiryDate}</p>
                            )}
                        </div>
                        <div className="admin-customer-info">
                            <label>Verification Document:</label>
                            {editing ? (
                                <input
                                    className="readonly-input"
                                    type="text"
                                    name="verificationDocument"
                                    readOnly
                                    value={business.verificationDocument}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{business.verificationDocument}</p>
                            )}
                        </div>
                    </div>

                    <div className="admin-edit-btns">
                        {editing ? (
                            <button onClick={handleSubmit}>Save</button>
                        ) : (
                            <button onClick={() => setEditing(true)}>Edit</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminEditBusiness;

// import { Link,  useParams } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import provinces from '../data/provinces';

// function AdminEditBusiness() {
//     const { id } = useParams(); // Fetch the customer ID from the URL params
//     const [business, setBusiness] = useState(null);
//     const [editing, setEditing] = useState(false);

//     useEffect(() => {
//         // Fetch customer details when component mounts
//         const fetchBusiness = async () => {
//             try {
//                 const apiUrl = import.meta.env.VITE_API_BASE_URL;
//                 const response = await axios.get(`${apiUrl}/api/Business/get-business/${id}`);
//                 setBusiness(response.data); // Assuming response.data is the customer details
//             } catch (error) {
//                 console.error('Failed to fetch business: ', error);
//             }
//         };

//         fetchBusiness();

//         // Cleanup function
//         return () => {
//             // Cleanup logic if needed
//         };
//     }, [id]);

//     const handleInputChange = (e) => {
//         setBusiness({ ...business, [e.target.name]: e.target.value });
//     };
//     const handleIsVerifiedChange = () => {
//         setBusiness({ ...business, isVerified: !business.isVerified });
//     };
    

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const apiUrl = import.meta.env.VITE_API_BASE_URL;
//             const response = await axios.put(`${apiUrl}/api/Customer/updatecustomer/${id}`, business);
//             console.log('Business updated:', response.data);
//             setEditing(false);
//         } catch (error) {
//             console.error('Failed to update business: ', error);
//         }
//     };

//     if (!business) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="wrapper">
//             <div className="admin">
//                 <Link to="/admin-all-businesses"><button>Back to Businesses</button></Link>
//                 <div className="admin-edit-container">
//                     <h1>Edit Business Details</h1>

//                     <div className="admin-customer-details">
//                         <div className="admin-customer-info">
//                             <label>Is Verified?</label>
//                             {editing ? (
//                                 <input
//                                     type="checkbox"
//                                     name="isVerified"
//                                     checked={business.isVerified}
//                                     onChange={handleIsVerifiedChange}
//                                 />
//                             ) : (
//                                 <p>{business.isVerified ? 'Yes' : 'No'}</p>
//                             )}
//                          </div>      
//                         <div className="admin-customer-info">
//                             <label>Business Name:</label>
//                             {editing ? (
//                                 <input
//                                     type="text"
//                                     name="businessName"
//                                     value={business.businessName}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : (
//                                 <p>{business.businessName}</p>
//                             )}
//                         </div>
//                         <div className="admin-customer-info">
//                             <label>Contact Name:</label>
//                             {editing ? (
//                                 <input
//                                     type="text"
//                                     name="lastName"
//                                     value={business.contactName}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : (
//                                 <p>{business.contactName}</p>
//                             )}
//                         </div>
//                         <div className="admin-customer-info">
//                             <label>Email:</label>
//                             {editing ? (
//                                 <input
//                                     type="text"
//                                     name="email"
//                                     value={business.email}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : (
//                                 <p>{business.email}</p>
//                             )}
//                         </div>
//                         <div className="admin-customer-info">
//                             <label>Phone:</label>
//                             {editing ? (
//                                 <input
//                                     type="text"
//                                     name="phone"
//                                     value={business.phone}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : (
//                                 <p>{business.phone}</p>
//                             )}
//                             </div>
//                             <div className="admin-customer-info">
//                             <label>Username:</label>
//                             {editing ? (
//                                 <input
//                                 className='readonly-input'
//                                     type="text"
//                                     name="username"
//                                     readOnly
//                                     value={business.pkBusinessId}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : (
//                                 <p>{business.pkBusinessId}</p>
//                             )}
//                         </div>

//                         <div className="admin-customer-info">
//                             <label>Street Address:</label>
//                             {editing ? (
//                                 <input
//                                     type="text"
//                                     name="address"          
//                                     value={business.address}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : (
//                                 <p>{business.address}</p>
//                             )}
//                         </div>
//                         <div className="admin-customer-info">
//                             <label>City:</label>
//                             {editing ? (
//                                 <input
//                                     type="text"
//                                     name="city"
//                                     value={business.city}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : (
//                                 <p>{business.city}</p>
//                             )}
//                         </div>
//                         <div className="admin-customer-info">
//                             <label htmlFor="province">Province/Territory:</label>
//                             {editing ? (
//                                 <select 
//                                     name="province" 
//                                     id="province"
//                                     value={business.province}
//                                     onChange={handleInputChange}
//                                 >
//                                     <option value=""></option>
//                                     {provinces.map((province) => (
//                                         <option key={province} value={province}>{province}</option>
//                                     ))}
//                                 </select>
//                             ) : (
//                                 <p>{business.province}</p>
//                             )}
//                         </div>
//                         <div className="admin-customer-info">
//                             <label>Postal Code:</label>
//                             {editing ? (
//                                 <input
//                                     type="text"
//                                     name="postal"
//                                     value={business.postalCode}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : (
//                                 <p>{business.postalCode}</p>
//                             )}
//                         </div>
//                         <div className="admin-customer-info">
//                             <label>Insurance Company:</label>
//                             {editing ? (
//                                 <input
//                                     type="text"
//                                     name="insuranceCompany"
//                                     value={business.insuranceCompany}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : (
//                                 <p>{business.insuranceCompany}</p>
//                             )}
//                         </div>
//                         <div className="admin-customer-info">
//                             <label>Insurance Expiry:</label>
//                             {editing ? (
//                                 <input
//                                     type="text"
//                                     name="insuranceExpiry"
//                                     value={business.insuranceExpiryDate}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : (
//                                 <p>{business.insuranceExpiryDate}</p>
//                             )}
//                         </div>
//                         <div className="admin-customer-info">
//                             <label>Verification Document:</label>
//                             {editing ? (
//                                 <input
//                                     className="readonly-input"
//                                     type="text"
//                                     name="verificationDocument"
//                                     readOnly
//                                     value={business.verificationDocument}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : (
//                                 <p>{business.verificationDocument}</p>
//                             )}
//                         </div>
                            


//                         {/* <div className="admin-customer-info">
//                             <label>Is Over the Age of 18?</label>
//                             <p>{customer.confirm18 ? 'Yes' : 'No'}</p>
//                         </div> */}

//                     </div>

//                     <div className="admin-edit-btns">
//                         {editing ? (
//                             <button onClick={handleSubmit}>Save</button>
//                         ) : (
//                             <button onClick={() => setEditing(true)}>Edit</button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AdminEditBusiness;
