import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfileInfo from '../components/EditProfileInfo';
import EditProfileBusinessInfo from '../components/EditProfileBusinessInfo';

function EditProfile() {
  const navigate = useNavigate();
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);

  // Placeholder data for user details
  const userDetails = {
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890",
    location: "City, Country"
  };

  // Placeholder data for business details
  const businessDetails = {
    businessName: "Doe Enterprises",
    insuranceCompany: "Best Coverage, Inc.",
    insuranceExpiry: "2023-12-31",
    businessLicense: "License12345"
  };

  const handleEditDetailsClick = () => {
    navigate('/editprofile/mydetails');
    setIsEditingDetails(true);
  };

  const handleEditBusinessClick = () => {
    navigate('/editprofile/businessdetails');
    setIsEditingBusiness(true);
  };

  const handleChangePasswordClick = () => {
    navigate('/editprofile/editpassword');
  };

  return (
    <div className="edit-profile">
      <div className="testimonials-banner">
        <p className="testimonials-small">EDIT PROFILE</p>
        <p className="testimonials-large">Edit Profile</p>
        <div className="testimonials-path">
          <i className="fa-solid fa-house"></i>
          <p>HOME</p>
          <i className="fa-solid fa-angle-right"></i>
          <p>EDIT PROFILE</p>
        </div>
      </div>
      <div>
        <h2>My Details</h2>
        {!isEditingDetails ? (
          <div>
            <p>Name: {userDetails.name}</p>
            <p>Email: {userDetails.email}</p>
            <p>Phone Number: {userDetails.phoneNumber}</p>
            <p>Location: {userDetails.location}</p>
            <button onClick={handleEditDetailsClick}>Edit My Details</button>
          </div>
        ) : (
          <EditProfileInfo initialData={userDetails} />
        )}
      </div>
      <div>
        <h2>Business Details</h2>
        {!isEditingBusiness ? (
          <div>
            <p>Business Name: {businessDetails.businessName}</p>
            <p>Insurance Company: {businessDetails.insuranceCompany}</p>
            <p>Insurance Expiry: {businessDetails.insuranceExpiry}</p>
            <p>Business License: {businessDetails.businessLicense}</p>
            <button onClick={handleEditBusinessClick}>Edit Business Details</button>
          </div>
        ) : (
          <EditProfileBusinessInfo initialData={businessDetails} />
        )}
      </div>
      <div>
        <h2>Password</h2>
        <p>Password: *******</p>
        <button onClick={handleChangePasswordClick}>Change Password</button>
      </div>
    </div>
  );
}

export default EditProfile;

