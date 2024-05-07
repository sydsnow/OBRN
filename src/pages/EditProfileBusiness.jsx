import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getEmailFromJWT, formatPhoneNumber } from '../utilities/utilities';
import BusinessDetailsForm from '../components/BusinessDetailsForm';
import { NavLink } from "react-router-dom";


function EditProfileBusiness() {
  const navigate = useNavigate();
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [businessDetails, setBusinessDetails] = useState({

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
    insuranceExpiryDate: '',
    verificationDocument: '',
  });  

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const token = localStorage.getItem('token');
        if (token) {
          const email = getEmailFromJWT(token);
          const response = await axios.get(`${apiUrl}/api/Business/get-business-by-email?email=${email}`);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setBusinessDetails(response.data);
        }
      } catch (error) {
        console.error('Error fetching business data: ', error);
      }
    };

    fetchBusinessData();
  }, []); 

  const handleEditBusinessClick = () => {
    navigate('/editprofilebusiness/businessdetails');
    setIsEditingBusiness(true);
  };

  const handleChangePasswordClick = () => {
    navigate('/editprofile/editpassword');
  };

  const handleViewBusinessMembershipClick = () => {
    navigate('/editprofilebusiness/business-membership-details');
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
        <NavLink to="/businessprofile">Go Back</NavLink>
      </div>
      <div className="edit-profile-wrapper">
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
              {/* <p>Description: {businessDetails.description}</p> */}
              {/* <p>Logo: {businessDetails.logo}</p> */}
              <p>Insurance Company: {businessDetails.insuranceCompany}</p>
              {/* <p>Insurance Expiry: {businessDetails.insuranceExpiry}</p> */}
              {/* <p>Business License: {businessDetails.verificationDocument}</p> */}
            </div>
          ) : (
            <BusinessDetailsForm initialData={businessDetails} />
          )}
          <button className="edit-profile-button" onClick={handleEditBusinessClick}>Edit Business Details</button>
        </div>
        <div className="edit-profile-section">
          <h3>Business Membership</h3>
          <p>Manage your business membership</p>
          <button className="edit-profile-button" onClick={handleViewBusinessMembershipClick}>View Membership</button>
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

export default EditProfileBusiness;

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { getEmailFromJWT, formatPhoneNumber } from '../utilities/utilities';
// import BusinessDetailsForm from '../components/BusinessDetailsForm';


// function EditProfileBusiness() {
//   const navigate = useNavigate();
//   const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  
//   // Placeholder data for business details
//   const businessDetails = {
//     contactName: '',
//     businessName: '',
//     address:'',
//     city: '',
//     province: '',
//     postalCode: '',
//     email: '',
//     phone: '',
//     description: '',
//     logo: '',
//     insuranceCompany: '',
//     insuranceExpiry: '',
//     verificationDocument: '',
//   };  

//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         const apiUrl = import.meta.env.VITE_API_BASE_URL;
//         const token = localStorage.getItem('token');
//         if (token) {
//           const email = getEmailFromJWT(token);
//           const response = await axios.get(`${apiUrl}/api/customer/get-customer-by-email?email=${email}`);
//           axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//           setUserDetails(response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching user data: ', error);
//       }
//     };

//     fetchCustomerData();
//   }, []); 

//   const handleEditBusinessClick = () => {
//     navigate('/editprofilebusiness/businessdetails');
//     setIsEditingBusiness(true);
//   };

//   const handleChangePasswordClick = () => {
//     navigate('/editprofile/editpassword');
//   };

//   const handleViewBusinessMembershipClick = () => {
//     navigate('/editprofilebusiness/business-membership-details');
//   };

//   return (
//     <div className="edit-profile">
//       <div className="testimonials-banner">
//         <p className="testimonials-small">EDIT BUSINESS PROFILE</p>
//         <p className="testimonials-large">Edit  Profile</p>
//         <div className="testimonials-path">
//           <i className="fa-solid fa-house"></i>
//           <p>HOME</p>
//           <i className="fa-solid fa-angle-right"></i>
//           <p>EDIT BUSINESS PROFILE</p>
//         </div>
//       </div>
//       <div className="edit-profile-header">
//         <h2>Business Settings</h2>
//         <p>You can manage your account here.</p>
//       </div>
//       <div className="edit-profile-wrapper">
//         <div className="edit-profile-section">
//           <h3>Business Details</h3>
//           {!isEditingBusiness ? (
//             <div>
//               {/* <p>Contact Name: {businessDetails.contactName}</p> */}
//               <p>Business Name: {businessDetails.businessName}</p>
//               <p>Address: {businessDetails.address}</p>
//               {/* <p>City: {businessDetails.city}</p> */}
//               {/* <p>Province: {businessDetails.province}</p>
//               <p>Postal Code: {businessDetails.postalCode}</p> */}
//               <p>Email: {businessDetails.email}</p>
//               <p>Phone: {formatPhoneNumber(businessDetails.phone)}</p>
//               <p>Description: {businessDetails.description}</p>
//               {/* <p>Logo: {businessDetails.logo}</p> */}
//               <p>Insurance Company: {businessDetails.insuranceCompany}</p>
//               <p>Insurance Expiry: {businessDetails.insuranceExpiry}</p>
//               <p>Business License: {businessDetails.verificationDocument}</p>
//             </div>
//           ) : (
//             <BusinessDetailsForm initialData={businessDetails} />
//           )}
//           <button className="edit-profile-button" onClick={handleEditBusinessClick}>Edit Business Details</button>
//         </div>
//         <div className="edit-profile-section">
//           <h3>Business Membership</h3>
//           <p>Manage your business membership</p>
//           <button className="edit-profile-button" onClick={handleViewBusinessMembershipClick}>View Membership</button>
//         </div>
//         <div className="edit-profile-section">
//           <h3>Password</h3>
//           <p>*******</p>
//           <button className="edit-profile-button" onClick={handleChangePasswordClick}>Change Password</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditProfileBusiness;
