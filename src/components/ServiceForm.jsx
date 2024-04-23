import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../scss/components/_serviceform.scss";

function ServiceForm () {
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
        <form className="service-form">
                <div className="form-group-service">
                    <label className="service-label" htmlFor="category">Category</label>
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryOption}
                        className="input"
                        id="category"
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
                        type="text" id="servicename" 
                        required autoComplete="off" 
                        name="servicename" 
                        placeholder="Service Name">
                    </input>
                </div>
                <div className="form-group-service">
                    <label className="service-label" htmlFor="description">Description</label>
                    <input 
                        className="input" 
                        type="text" 
                        id="description" 
                        required autoComplete="off" 
                        name="description"
                        placeholder="Description">
                    </input>
                </div>
                <div className="form-group-service">
                    <label className="service-label" htmlFor="price">Price</label>
                    <input 
                        className="input" 
                        type="number" 
                        id="price" 
                        name="price"
                        placeholder="Price"
                        min="0">
                    </input>
                </div>
                <div className="form-group-service">
                    <label className="service-label" htmlFor="image">Image</label>
                    <input 
                        className="input" 
                        type="file" 
                        id="image" 
                        name="image">
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
                <div className="form-group-service">
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
                </div>
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

export default ServiceForm;