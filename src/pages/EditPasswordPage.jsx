import React, { useState } from 'react';
import PasswordForm from '../components/PasswordForm';

function EditPasswordPage() {
    return (
        <div className="edit-profile">
            <div className="testimonials-banner">
                <p className="testimonials-small">EDIT PROFILE</p>
                <p className="testimonials-large">Edit Password</p>
                <div className="testimonials-path">
                    <i className="fa-solid fa-house"></i>
                    <p>HOME</p>
                    <i className="fa-solid fa-angle-right"></i>
                    <p>EDIT PROFILE</p>
                    <i className="fa-solid fa-angle-right"></i>
                    <p>CHANGE PASSWORD</p>
                </div>
            </div>
            <div className="edit-password-container">
            <h2 className="edit-password-title">Update My Password</h2>
                <PasswordForm initialData={PasswordForm} />

            </div>
        </div>
    );
}

export default EditPasswordPage;

