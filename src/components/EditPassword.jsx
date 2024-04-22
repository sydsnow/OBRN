import React, { useState } from 'react';

function EditPassword() {
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
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
      <div className="form-group">
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
      <div className="form-group">
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
      <button type="submit">Change Password</button>
    </form>
  );
}

export default EditPassword;
