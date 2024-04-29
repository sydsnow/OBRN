import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
// import "../scss/pages/_addcategory.scss";

function AddCategoryPage () {
    // state to manage the category object
    const [category, setCategory] = useState({
        categoryName: ''
    });

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("category: ", category);

        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${apiUrl}/Category/create`, category);
            console.log("response: ", response);
            const { message, token } = response.data;
            console.log("message: ", message);
            console.log("token:", token);
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            console.error('Registration failed: ', error);
        }
    };

    return (
        <div className="add-category">
            <h2 className="add-category-title">Add Category</h2>
            <form className="add-category-form" onSubmit={handleSubmit}>
                <div className="form-group-category">
                    {/* <label className="category-label" htmlFor="add-category">Name</label> */}
                    <input 
                        className="input" 
                        type="text" 
                        id="add-category" 
                        required autoComplete="off" 
                        name="categoryName" 
                        placeholder="Category Name"
                        value={category.categoryName}
                        onChange={handleChange}>
                    </input>
                </div>
                <div className="button-container">
                    <button><NavLink to="/admin-all-categories">Cancel</NavLink></button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddCategoryPage;