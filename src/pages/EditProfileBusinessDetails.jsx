import BusinessDetailsForm from "../components/BusinessDetailsForm";
import React from "react";
import { Link } from "react-router-dom";

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
                <Link to="/">HOME</Link> 
                <i className="fa-solid fa-angle-right"></i>
                <Link to="/editprofilebusiness">EDIT PROFILE</Link>
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
