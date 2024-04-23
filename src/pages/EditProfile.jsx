import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmailFromJWT, formatPhoneNumber } from '../utilities/utilities';
import EditProfileInfo from '../components/EditProfileInfo';
import EditProfileBusinessInfo from '../components/EditProfileBusinessInfo';
import axios from 'axios';

function EditProfile() {
  const navigate = useNavigate();
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [customer, setCustomer] = useState(null);

  // Placeholder data for user details
  // const userDetails = {
  //   name: "John Doe",
  //   email: "johndoe@example.com",
  //   phoneNumber: "1234567890",
  //   address: "123 Main Street",
  //   city: "Vancouver",
  //   province: "BC",
  //   postalCode: "V2T 5R7"
  // };

  // Placeholder data for business details
  const businessDetails = {
    businessName: "Doe Enterprises",
    insuranceCompany: "Best Coverage, Inc.",
    insuranceExpiry: "2023-12-31",
    businessLicense: "License12345"
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
        try {
          const apiUrl = import.meta.env.VITE_API_BASE_URL;
          const token = localStorage.getItem('token');
          if (token) {
            const email = getEmailFromJWT(token);
            const response = await axios.get(`${apiUrl}/api/customer/getcustomerbyemail?email=${email}`);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setCustomer(response.data);
          }
        } catch (error) {
            console.error('Error fetching user data: ', error);
        }
      };
      fetchCustomerData();
    }, []);

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
              <p>First Name: {customer?.firstName}</p>
              <p>Last Name: {customer?.lastName}</p>
              <p>Email: {customer?.email}</p>
              <p>Phone Number: {formatPhoneNumber(customer?.phone)}</p>
              <p>Address: {(customer?.address) ? (customer?.address) : 'Unspecified' }</p>
              <p>City: {(customer?.city) ? (customer?.city) : 'Unspecified' }</p>
              <p>Province: {(customer?.province) ? (customer?.province) : 'Unspecified' }</p>
              <p>Postal Code: {(customer?.postalCode) ? (customer?.postalCode) : 'Unspecified' }</p>
            </div>
          ) : (
            <EditProfileInfo initialData={customer} />
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
