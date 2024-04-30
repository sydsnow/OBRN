import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getEmailFromJWT, formatPhoneNumber } from '../utilities/utilities';
// import EditProfileInfo from '../components/EditProfileInfo';
// import EditProfileBusinessInfo from '../components/EditProfileBusinessInfo';
// import MyDetailsForm from '../components/MyDetailsForm';
import BusinessDetailsForm from '../components/BusinessDetailsForm';


function EditProfileBusiness() {
  const navigate = useNavigate();
  // const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  // const [userDetails, setUserDetails] = useState({
  //   firstName: '',
  //   lastName: '',
  //   phone: '',
  //   birthdate: '',
  //   email: '',
  //   address: '',
  //   city: '',
  //   province: '',
  //   postalCode: ''
  // });

  // Placeholder data for business details
  const businessDetails = {
    contactName: '',
    businessName: '',
    address:'',
    city: '',
    province: '',
    postalCode: '',
    email: '',
    phone: '',
    description: '',
    logo: '',
    insuranceCompany: '',
    insuranceExpiry: '',
    verificationDocument: '',
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
          setUserDetails(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchCustomerData();
  }, []); 

  // const handleEditDetailsClick = () => {
  //   navigate('/editprofile/mydetails');
  //   setIsEditingDetails(true);
  // };

  const handleEditBusinessClick = () => {
    navigate('/editprofile/businessdetails');
    setIsEditingBusiness(true);
  };

  const handleChangePasswordClick = () => {
    navigate('/editprofile/editpassword');
  };

  // const handleViewCustomerMembershipClick = () => {
  //   navigate('/editprofile/customer-membership-details');
  // };

  const handleViewBusinessMembershipClick = () => {
    navigate('/editprofile/business-membership-details');
  };

  return (
    <div className="edit-profile">
      <div className="testimonials-banner">
        <p className="testimonials-small">EDIT BUSINESS PROFILE</p>
        <p className="testimonials-large">Edit  Profile</p>
        <div className="testimonials-path">
          <i className="fa-solid fa-house"></i>
          <p>HOME</p>
          <i className="fa-solid fa-angle-right"></i>
          <p>EDIT BUSINESS PROFILE</p>
        </div>
      </div>
      <div className="edit-profile-header">
        <h2>Business Settings</h2>
        <p>You can manage your account here.</p>
      </div>
      <div className="edit-profile-wrapper">
        {/* <div className="edit-profile-section">
          <h3>My Details</h3>
          {!isEditingDetails ? (
            <div>
              <p>First Name: {userDetails?.firstName}</p>
              <p>Last Name: {userDetails?.lastName}</p>
              <p>Email: {userDetails?.email}</p>
              <p>Phone Number: {formatPhoneNumber(userDetails?.phone)}</p>
              <p>Address: {(userDetails?.address) ? (userDetails?.address) : 'Unspecified' }</p>
              <p>City: {(userDetails?.city) ? (userDetails?.city) : 'Unspecified' }</p>
              <p>Province: {(userDetails?.province) ? (userDetails?.province) : 'Unspecified' }</p>
              <p>Postal Code: {(userDetails?.postalCode) ? (userDetails?.postalCode) : 'Unspecified' }</p>
            </div>
          ) : (
            <MyDetailsForm />
          )}
          <button className="edit-profile-button" onClick={handleEditDetailsClick}>Edit My Details</button>
        </div> */}
        <div className="edit-profile-section">
          <h3>Business Details</h3>
          {!isEditingBusiness ? (
            <div>
              {/* <p>Contact Name: {businessDetails.contactName}</p> */}
              <p>Business Name: {businessDetails.businessName}</p>
              <p>Address: {businessDetails.address}</p>
              {/* <p>City: {businessDetails.city}</p> */}
              {/* <p>Province: {businessDetails.province}</p>
              <p>Postal Code: {businessDetails.postalCode}</p> */}
              <p>Email: {businessDetails.email}</p>
              <p>Phone: {formatPhoneNumber(businessDetails.phone)}</p>
              <p>Description: {businessDetails.description}</p>
              {/* <p>Logo: {businessDetails.logo}</p> */}
              <p>Insurance Company: {businessDetails.insuranceCompany}</p>
              <p>Insurance Expiry: {businessDetails.insuranceExpiry}</p>
              <p>Business License: {businessDetails.verificationDocument}</p>
            </div>
          ) : (
            <BusinessDetailsForm initialData={businessDetails} />
          )}
          <button className="edit-profile-button" onClick={handleEditBusinessClick}>Edit Business Details</button>
        </div>
        <div className="edit-profile-section">
          <h3>Password</h3>
          <p>*******</p>
          <button className="edit-profile-button" onClick={handleChangePasswordClick}>Change Password</button>
        </div>
        {/* <div className="edit-profile-section">
          <h3>Customer Membership</h3>
          <p>Manage your customer membership</p>
          <button className="edit-profile-button" onClick={handleViewCustomerMembershipClick}>View Customer Membership</button>
        </div> */}
        <div className="edit-profile-section">
          <h3>Business Membership</h3>
          <p>Manage your business membership</p>
          <button className="edit-profile-button" onClick={handleViewBusinessMembershipClick}>View Business Membership</button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileBusiness;
