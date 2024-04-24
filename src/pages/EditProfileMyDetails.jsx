import { useState, useEffect } from 'react';
import { getEmailFromJWT } from '../utilities/utilities';
import axios from 'axios';
// import EditProfileInfo from "../components/EditProfileInfo";
import MyDetailsForm from "../components/MyDetailsForm";


function EditProfileMyDetails() {
  const [userDetails, setUserDetails] = useState(null);
  // const userDetails = {
  //   name: "John Doe",
  //   email: "johndoe@example.com",
  //   phoneNumber: "123-456-7890",
  //   location: "City, Country"
  // };

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
            <i className="fa-solid fa-angle-right"></i>
            <p>MY DETAILS</p>
          </div>
        </div>
        <div className="edit-profile-container">
          <h2 className="edit-profile-title">Update My Details</h2>
          <div>
            <MyDetailsForm initialData={userDetails} />
          </div>
        </div>
    </div> 
  );
}

export default EditProfileMyDetails;
