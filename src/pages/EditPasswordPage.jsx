import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function EditPasswordPage() {
    const navigate = useNavigate();  
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPasswordData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        console.log('Password Change Data:', passwordData);
    };

    const handleCancel = () => {
        navigate('/editprofile'); 
    };

    return (
        <div className="edit-profile">
            <div className="testimonials-banner">
                <p className="testimonials-small">EDIT PROFILE</p>
                <p className="testimonials-large">Edit Password</p>
                <div className="testimonials-path">
                    <i className="fa-solid fa-house"></i>
                    <p>HOME</p>
                    <i className="fa-solid fa-angle-right"></i>
                    <p>EDIT PROFILE</p>
                    <i className="fa-solid fa-angle-right"></i>
                    <p>CHANGE PASSWORD</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="password-form">
                <div>
                    <label htmlFor="currentPassword">Current Password:</label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm New Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Password</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}

export default EditPasswordPage;

