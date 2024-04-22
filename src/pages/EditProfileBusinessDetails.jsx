import React from 'react';
import EditProfileBusinessInfo from "../components/EditProfileBusinessInfo";

function EditProfileBusinessDetails() {
    const businessDetails = {
        businessName: "Doe Enterprises",
        insuranceCompany: "Best Coverage, Inc.",
        insuranceExpiry: "2023-12-31",
        businessLicense: "License12345"
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
                <i className="fa-solid fa-angle-right"></i>
                <p>MY BUSINESS DETAILS</p>
            </div>
            </div>
            <div>
            <EditProfileBusinessInfo initialData={businessDetails} />
            </div>
        </div> 
    );
}

export default EditProfileBusinessDetails;
