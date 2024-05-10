import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getEmailFromJWT, formatPhoneNumber, capitalizeFirstLetters } from '../utilities/utilities';
import MyDetailsForm from '../components/MyDetailsForm';
import { NavLink } from 'react-router-dom';
import react from "react";
import { Link } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    birthdate: '',
    email: '',
    address: '',
    city: '',
    province: '',
    postalCode: ''
  });


  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const token = localStorage.getItem('token');
        if (token) {
          const email = getEmailFromJWT(token);
          const response = await axios.get(`${apiUrl}/api/customer/get-customer-by-email?email=${email}`);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setUserDetails(response.data);
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

  const handleChangePasswordClick = () => {
    navigate('/editprofile/editpassword');
  };

  const handleViewCustomerMembershipClick = () => {
    navigate('/editprofile/customer-membership-details');
  };

  return (
    <div className="edit-profile">
      <div className="testimonials-banner">
        <p className="testimonials-small">EDIT PROFILE</p>
        <p className="testimonials-large">Edit Profile</p>
        <div className="testimonials-path">
          <i className="fa-solid fa-house"></i>
          <Link to="/customerprofile">VIEW PROFILE</Link>
          <i className="fa-solid fa-angle-right"></i>
          <p>EDIT PROFILE</p>
        </div>
      </div>
      <div className="edit-profile-header">
        <h2>Customer Settings</h2>
        <p>You can manage your account here.</p>
        <NavLink to="/customerprofile">Go Back</NavLink>
      </div>
      <div className="edit-profile-wrapper">
        <div className="edit-profile-section">
          <h3>My Details</h3>
          {!isEditingDetails ? (
            <div>
              <p>First Name: {capitalizeFirstLetters(userDetails?.firstName)}</p>
              <p>Last Name: {capitalizeFirstLetters(userDetails?.lastName)}</p>
              <p>Email: {userDetails?.email}</p>
              <p>Phone Number: {formatPhoneNumber(userDetails?.phone)}</p>
              <p>Address: {capitalizeFirstLetters((userDetails?.address) ? (userDetails?.address) : 'Unspecified' )}</p>
              <p>City: {capitalizeFirstLetters((userDetails?.city) ? (userDetails?.city) : 'Unspecified' )}</p>
              <p>Province: {(userDetails?.province) ? (userDetails?.province) : 'Unspecified' }</p>
              <p>Postal Code: {capitalizeFirstLetters((userDetails?.postalCode) ? (userDetails?.postalCode) : 'Unspecified' )}</p>
            </div>
          ) : (
            <MyDetailsForm />
          )}
          <button className="edit-profile-button" onClick={handleEditDetailsClick}>Edit My Details</button>
        </div>
        <div className="edit-profile-section">
          <h3>Customer Membership</h3>
          <p>Manage your customer membership</p>
          <button className="edit-profile-button" onClick={handleViewCustomerMembershipClick}>View Membership</button>
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
