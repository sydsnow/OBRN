import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import axios from 'axios';

import "../scss/components/_serviceform.scss";

function ServiceForm ({ service }) {
    // state to manage the service passed to the form
    const [serviceData, setServiceData] = useState(service);

    //const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setServiceData({ ...serviceData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("serviceData: ", serviceData);

        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${apiUrl}/api/Service/addservice`, serviceData);
            console.log("response: ", response);
            const { message, token } = response.data;
            console.log(message);
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            console.error('Service creation failed: ', error);
        }
    };

    // Soon will dynamically get all the categories 
    const categories = ["Nails", "Hair", "Eyelashes", "Wellness", "Eyebrows", "Facials"];

    // state to manage selected category 
    const [selectedCategory, setSelectedCategory] = useState("");

    //handler for sorting categories
    const handleCategoryOption = (e) => {
        setSelectedCategory(e.target.value);
    };
     // Get the current location
     const location = useLocation();
     const isEditServicePage = location.pathname.includes("/editservice");

    return (
        <form className="service-form" onSubmit={handleSubmit}>
                <div className="form-group-service">
                    <label className="service-label" htmlFor="category">Category</label>
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryOption}
                        className="input"
                        id="category"
                        required
                        name="category"
                    >    
                        <option value="" disabled>Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group-service">
                    <label className="service-label" htmlFor="servicename">Service Name</label>
                    <input 
                        className="input" 
                        type="text" 
                        id="servicename" 
                        required 
                        autoComplete="off" 
                        name="servicename" 
                        placeholder="Service Name"
                        value={service.name}
                        onChange={handleChange}>
                    </input>
                </div>
                <div className="form-group-service">
                    <label className="service-label" htmlFor="description">Description</label>
                    <input 
                        className="input" 
                        type="text" 
                        id="description" 
                        required 
                        autoComplete="off" 
                        name="description"
                        placeholder="Description"
                        value={service.description}
                        onChange={handleChange}>
                    </input>
                </div>
                <div className="form-group-service">
                    <label className="service-label" htmlFor="price">Price</label>
                    <input 
                        className="input" 
                        type="number" 
                        id="price"
                        required 
                        name="price"
                        placeholder="Price"
                        min="0"
                        value={service.price}
                        onChange={handleChange}>
                    </input>
                </div>
                <div className="form-group-service">
                    <label className="service-label" htmlFor="image">Image</label>
                    <input 
                        className="input" 
                        type="file" 
                        id="image" 
                        name="image"
                        required
                        value={service.image}
                        onChange={handleChange}>
                    </input>
                </div>
                <div className="form-group-service">
                    <label className="service-label" htmlFor="discount">Discount <p>*optional</p></label>
                    <input 
                        className="input" 
                        type="number" 
                        id="discount" 
                        name="discount"
                        placeholder="Discount"
                        min="0">
                    </input>
                </div>
                {/* <div className="form-group-service">
                    <label className="service-label" htmlFor="start-date">Start Date</label>
                    <input 
                        className="input" 
                        type="date" 
                        id="start-date" 
                        name="start-date">
                    </input>
                </div>
                <div className="form-group-service">
                    <label className="service-label" htmlFor="end-date">End Date</label>
                    <input 
                        className="input" 
                        type="date" 
                        id="end-date" 
                        name="end-date">
                    </input>
                </div> */}
                <div className="button-container">
                    <button><NavLink to="/businessprofile">Cancel</NavLink></button>
                    <button type="submit">Save</button>
                    {/* Conditionally render delete button */}
                    {isEditServicePage && (
                        <button className="delete-button">Delete</button>
                    )}
                </div>
            </form>
    )
}
ServiceForm.propTypes = {
    service: PropTypes.shape({
        pkServiceId: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        price: PropTypes.number,
    }).isRequired,
};

export default ServiceForm;