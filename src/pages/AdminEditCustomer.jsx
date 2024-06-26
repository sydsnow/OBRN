// import { Link,  useParams } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// function AdminEditCustomer() {
//     const { id } = useParams(); // Fetch the customer ID from the URL params
//     const [customer, setCustomer] = useState(null);
//     const [editing, setEditing] = useState(false);

//     useEffect(() => {
//         // Fetch customer details when component mounts
//         const fetchCustomer = async () => {
//             try {
//                 const apiUrl = import.meta.env.VITE_API_BASE_URL;
//                 const response = await axios.get(`${apiUrl}/api/Customer/get-customer/${id}`);
//                 setCustomer(response.data); // Assuming response.data is the customer details
//             } catch (error) {
//                 console.error('Failed to fetch customer: ', error);
//             }
//         };

//         fetchCustomer();

//         // Cleanup function
//         return () => {
//             // Cleanup logic if needed
//         };
//     }, [id]);

//     const handleInputChange = (e) => {
//         setCustomer({ ...customer, [e.target.name]: e.target.value });
//     };

//     const handleIsVip = () => {
//         setCustomer({ ...customer, vip: !customer.vip });
//     };
    

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const apiUrl = import.meta.env.VITE_API_BASE_URL;
//             const response = await axios.post(`${apiUrl}/api/Customer/edit-customer/`, customer);
//             console.log('Customer updated:', response.data);
//             setEditing(false);
//         } catch (error) {
//             console.error('Failed to update customer: ', error);
//         }
//     };

//     if (!customer) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="wrapper">
//             <div className="admin">
//                 <Link to="/admin-all-customers"><button>Back to Customers</button></Link>
//                 <div className="admin-edit-container">
//                     <h1>Edit Customer Details</h1>

//                     <div className="admin-customer-details">
//                     <div className="admin-customer-info">
//                             <label>VIP</label>
//                             {editing ? (
//                                 <input
//                                     type="checkbox"
//                                     name="vip"
//                                     checked={customer.isVerified}
//                                     onChange={handleIsVip}
//                                 />
//                             ) : (
//                                 <p>{customer.vip ? 'Yes' : 'No'}</p>
//                             )}
//                          </div>    
//                         <div className="admin-customer-info">
//                             <label>First Name:</label>
//                             {editing ? (
//                                 <input
//                                     type="text"
//                                     name="firstName"
//                                     value={customer.firstName}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : (
//                                 <p>{customer.firstName}</p>
//                             )}
//                         </div>
//                         <div className="admin-customer-info">
//                             <label>Last Name:</label>
//                             {editing ? (
//                                 <input
//                                     type="text"
//                                     name="lastName"
//                                     value={customer.lastName}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : (
//                                 <p>{customer.lastName}</p>
//                             )}
//                         </div>
//                         <div className="admin-customer-info">
//                             <label>Email:</label>
//                             {editing ? (
//                                 <input
//                                     type="text"
//                                     name="email"
//                                     value={customer.email}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : (
//                                 <p>{customer.email}</p>
//                             )}
//                         </div>



//                         <div className="admin-customer-info">
//                             <label>Phone:</label>
//                             {editing ? (
//                                 <input
//                                     type="text"
//                                     name="phone"
//                                     value={customer.phone}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : (
//                                 <p>{customer.phone}</p>
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
//                                     value={customer.pkCustomerId}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : (
//                                 <p>{customer.pkCustomerId}</p>
//                             )}
//                         </div>

//                         <div className="admin-customer-info">
//                             <label>Birthdate:</label>
//                             {editing ? (
//                                 <input
//                                 className='readonly-input'
//                                     type="text"
//                                     name="birthdate"
//                                     readOnly
//                                     value={customer.birthdate}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : (
//                                 <p>{customer.birthdate}</p>
//                             )}
//                         </div>
                        
//                         {/* <div className="admin-customer-info">
//                             <label>VIP</label>
//                             <p>{customer.vip ? 'Yes' : 'No'}</p>
//                         </div> */}
//                         <div className="admin-customer-info">
//                             <label>Is Over the Age of 18?</label>
//                             <p>{customer.confirm18 ? 'Yes' : 'No'}</p>
//                         </div>

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

import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminEditCustomer() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [editing, setEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/api/Customer/get-customer/${id}`);
                setCustomer(response.data);
            } catch (error) {
                console.error('Failed to fetch customer: ', error);
                setErrorMessage('Failed to load customer details.');
            }
        };
        fetchCustomer();
    }, [id]);

    const handleInputChange = (e) => {
        // Clear messages when the user starts editing
        setErrorMessage('');
        setSuccessMessage('');
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleIsVip = () => {
        // Clear messages when the user toggles VIP status
        setErrorMessage('');
        setSuccessMessage('');
        setCustomer({ ...customer, vip: !customer.vip });
    };

    const validateInput = () => {
        if (!customer.firstName || !customer.lastName || !customer.email || !customer.phone) {
            setErrorMessage('All fields are required.');
            return false;
        }

        if (!validateEmail(customer.email)) {
            setErrorMessage('Invalid email format.');
            return false;
        }

        if (!validatePhone(customer.phone)) {
            setErrorMessage('Invalid phone number format.');
            return false;
        }

        return true;
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!validateInput()) {
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${apiUrl}/api/Customer/edit-customer/`, customer);
            console.log('Customer updated:', response.data);
            setEditing(false);
            setSuccessMessage('Your updates have been saved successfully.');
        } catch (error) {
            console.error('Failed to update customer: ', error);
            setErrorMessage('Your update has not been saved successfully.');
        }
    };

    if (!customer) {
        return <div>Loading...</div>;
    }


    return (
        <div className="wrapper">
            <div className="admin">
                <Link to="/admin-all-customers"><button>Back to Customers</button></Link>
                <div className="admin-edit-container">
                    <h1>Edit Customer Details</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}                    
                    <div className="admin-customer-details">
                        <div className="admin-customer-info">
                            <label htmlFor='vip'>VIP</label>
                            {editing ? (
                                <input
                                    type="checkbox"
                                    name="vip-checkbox"
                                    id='vip'
                                    checked={customer.isVerified}
                                    onChange={handleIsVip}
                                />
                            ) : (
                                <p>{customer.vip ? 'Yes' : 'No'}</p>
                            )}
                        </div>
                        <div className="admin-customer-info">
                            <label htmlFor='firstName'>First Name:</label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="firstName"
                                    id='firstName'
                                    value={customer.firstName}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{customer.firstName}</p>
                            )}
                        </div>
                        <div className="admin-customer-info">
                            <label htmlFor='lastName'>Last Name:</label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="lastName"
                                    id='lastName'
                                    value={customer.lastName}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{customer.lastName}</p>
                            )}
                        </div>
                        <div className="admin-customer-info">
                            <label htmlFor='email'>Email:</label>
                            {editing ? (
                                <input
                                    type="email"
                                    name="email"
                                    id='email'
                                    value={customer.email}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{customer.email}</p>
                            )}
                        </div>
                        <div className="admin-customer-info">
                            <label htmlFor='phone'>Phone:</label>
                            {editing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    id='phone'
                                    value={customer.phone}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{customer.phone}</p>
                            )}
                        </div>
                        <div className="admin-customer-info">
                            <label htmlFor='userName'>Username:</label>
                            {editing ? (
                                <input
                                    className='readonly-input'
                                    type="text"
                                    name="username"
                                    id='userName'
                                    readOnly
                                    value={customer.pkCustomerId}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{customer.pkCustomerId}</p>
                            )}
                        </div>
                        <div className="admin-customer-info">
                            <label htmlFor='birthdate'>Birthdate:</label>
                            {editing ? (
                                <input
                                    type="text"
                                    name="birthdate"
                                    id='birthdate'
                                    value={customer.birthdate}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{customer.birthdate}</p>
                            )}
                        </div>
                        <div className="admin-customer-info">
                            <label >Is Over the Age of 18?</label>
                            <p>{customer.confirm18 ? 'Yes' : 'No'}</p>
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

export default AdminEditCustomer;