// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import axios from 'axios';
// import { getIdFromJWT } from '../utilities/utilities';
// import "../scss/components/_passwordform.scss"; 

// function PasswordForm() {
//     const navigate = useNavigate();
//     const token = localStorage.getItem('token');
//     const userId = getIdFromJWT(token);
//     const [passwordData, setPasswordData] = useState({
//         userId: userId,
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//     });
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setPasswordData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setPasswordData({
//             userId: userId,
//             currentPassword: '',
//             newPassword: '',
//             confirmPassword: ''
//         });

//         if (passwordData.newPassword !== passwordData.confirmPassword) {
//             setErrorMessage('New Password and Confirm Password must match.');
//             setTimeout(() => {
//                 setErrorMessage('');
//             }, 3000);
//             return; 
//         }

//         try {
//             const apiUrl = import.meta.env.VITE_API_BASE_URL;
//             const response = await axios.post(`${apiUrl}/api/customer/updatepassword`, passwordData);
//             console.log("response: ", response.data);
//             setErrorMessage(response.data);
//             setTimeout(() => {
//                 setErrorMessage('');
//             }, 3000);
//         } catch (error) {
//             console.error('Password update failed: ', error);
//             console.log("error.response.data: ", error.response.data);
//             if (error.response && error.response.data) {
//                 // Display the specific error message from the backend
//                 setErrorMessage(`Password update failed: ${error.response.data}`);
//             }
//         }
//     }

//     const handleCancel = () => {
//         navigate('/editprofile'); 
//     };

//   return (
//     <form className="password-form" onSubmit={handleSubmit}>
//                 <div className="password-form-group">
//                     <label htmlFor="password-label">Current Password:</label>
//                     <input
//                     className="input"
//                     type="password"
//                     id="currentPassword"
//                     name="currentPassword"
//                     value={passwordData.currentPassword}
//                     onChange={handleChange}
//                     required
//                     />
//                 </div>
//                 <div className="password-form-group">
//                     <label htmlFor="password-label">New Password:</label>
//                     <input
//                     className="input"
//                     type="password"
//                     id="newPassword"
//                     name="newPassword"
//                     value={passwordData.newPassword}
//                     onChange={handleChange}
//                     required
//                     />
//                 </div>
//                 <div className="password-form-group">
//                     <label htmlFor="password-label">Confirm New Password:</label>
//                     <input
//                     className="input"
//                     type="password"
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     value={passwordData.confirmPassword}
//                     onChange={handleChange}
//                     required
//                     />
//                 </div>
//                 <div className="button-container">
//                     <button type="submit">Save</button>
//                     <button type="button" onClick={handleCancel}>Cancel</button>
//                 </div>
//                 <p id="password-error">{errorMessage}</p>
//                 </form>
//   );
// }

// export default PasswordForm;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { getIdFromJWT } from '../utilities/utilities';
import "../scss/components/_passwordform.scss"; 

function PasswordForm() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = getIdFromJWT(token);
    const [passwordData, setPasswordData] = useState({
        userId: userId,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPasswordData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordData({
            userId: userId,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });

        // Password validation rules
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

        // Check if the new password matches the confirm password
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setErrorMessage('New Password and Confirm Password must match.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return; 
        }

        // Check if the new password meets the password pattern criteria
        if (!passwordPattern.test(passwordData.newPassword)) {
            setErrorMessage('New Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${apiUrl}/api/customer/updatepassword`, passwordData);
            console.log("response: ", response.data);
            setErrorMessage(response.data);
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        } catch (error) {
            console.error('Password update failed: ', error);
            console.log("error.response.data: ", error.response.data);
            if (error.response && error.response.data) {
                // Display the specific error message from the backend
                setErrorMessage(`Password update failed: ${error.response.data}`);
            }
        }
    }

    const handleCancel = () => {
        navigate('/editprofile'); 
    };

    return (
        <form className="password-form" onSubmit={handleSubmit}>
            <div className="password-form-group">
                <label htmlFor="password-label">Current Password:</label>
                <input
                    className="input"
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="password-form-group">
                <label htmlFor="password-label">New Password:</label>
                <input
                    className="input"
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="password-form-group">
                <label htmlFor="password-label">Confirm New Password:</label>
                <input
                    className="input"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="button-container">
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
            <p id="password-error">{errorMessage}</p>
        </form>
    );
}

export default PasswordForm;
