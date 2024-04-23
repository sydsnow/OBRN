import React from 'react';
import BusinessDetailsForm from "../components/BusinessDetailsForm";

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
            <div className="edit-business-container">
            <h2 className="edit-business-title">Update My Business Details</h2>
            <div>
                <BusinessDetailsForm initialData={businessDetails} />
            </div>
        </div>
        </div> 
    );
}

export default EditProfileBusinessDetails;
