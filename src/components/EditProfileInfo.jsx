import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function EditProfileInfo({ initialData }) {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        name: initialData.name,
        email: initialData.email,
        phoneNumber: initialData.phoneNumber,
        location: initialData.location,
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData);
    };

    const handleCancel = () => {
        navigate('/editprofile');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Phone Number:</label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Location:</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Update My Details</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
    );
}

export default EditProfileInfo;
