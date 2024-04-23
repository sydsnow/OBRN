import { useState } from 'react';
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
    phoneNumber: "1234567890",
    address: "123 Main Street",
    city: "Vancouver",
    province: "BC",
    postalCode: "V2T 5R7"
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
      <div className="edit-profile-header">
        <h2>Settings</h2>
        <p>You can manage your account here.</p>
      </div>
      <div className="edit-profile-wrapper">
        <div className="edit-profile-section">
          <h3>My Details</h3>
          {!isEditingDetails ? (
            <div>
              <p>Name: {userDetails.name}</p>
              <p>Email: {userDetails.email}</p>
              <p>Phone Number: {userDetails.phoneNumber}</p>
              <p>Address: {userDetails.address}</p>
              <p>City: {userDetails.city}</p>
              <p>Province: {userDetails.province}</p>
              <p>Postal Code: {userDetails.postalCode}</p>
            </div>
          ) : (
            <EditProfileInfo initialData={userDetails} />
          )}
          <button className="edit-profile-button" onClick={handleEditDetailsClick}>Edit My Details</button>
        </div>
        <div className="edit-profile-section">
          <h3>Business Details</h3>
          {!isEditingBusiness ? (
            <div>
              <p>Business Name: {businessDetails.businessName}</p>
              <p>Insurance Company: {businessDetails.insuranceCompany}</p>
              <p>Insurance Expiry: {businessDetails.insuranceExpiry}</p>
              <p>Business License: {businessDetails.businessLicense}</p>
            </div>
          ) : (
            <EditProfileBusinessInfo initialData={businessDetails} />
          )}
          <button className="edit-profile-button" onClick={handleEditBusinessClick}>Edit Business Details</button>
        </div>
        <div className="edit-profile-section">
          <h3>Password</h3>
          <p>*******</p>
          <button className="edit-profile-button" onClick={handleChangePasswordClick}>Change Password</button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
