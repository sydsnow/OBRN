import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "../scss/components/_passwordform.scss"; 

function PasswordForm() {
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
                </form>
  );
}

export default PasswordForm;
