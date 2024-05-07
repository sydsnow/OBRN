import { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

function AddCategoryPage({ onCategoryAdded }) {
    const [category, setCategory] = useState({
        categoryName: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate categoryName using regular expression
        const categoryNameRegex = /^[a-zA-Z0-9\s']+$/; // Allow letters, numbers, spaces, and apostrophes
        if (!categoryNameRegex.test(category.categoryName)) {
            setError('Category name can only contain letters, numbers, spaces, and apostrophes.');
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${apiUrl}/Category/create`, category);
            console.log("response: ", response);
            const { message, token } = response.data;
            console.log("message: ", message);
            console.log("token:", token);
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Call the callback function to update the list of categories
            if (onCategoryAdded) {
                onCategoryAdded();
            }
        } catch (error) {
            console.error('Registration failed: ', error);
        }
    };

    return (
        <div className="add-category">
            <h2 className="add-category-title">Add Category</h2>
            <form className="add-category-form" onSubmit={handleSubmit}>
                <div className="form-group-category">
                    <input
                        className="input"
                        type="text"
                        id="add-category"
                        required
                        autoComplete="off"
                        name="categoryName"
                        placeholder="Category Name"
                        value={category.categoryName}
                        onChange={handleChange}>
                    </input>
                    {error && <p className="error-message">{error}</p>}
                </div>
                <div className="button-container">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}
// PropTypes validation
AddCategoryPage.propTypes = {
    onCategoryAdded: PropTypes.func // Validate that onCategoryAdded is a function
};

export default AddCategoryPage;
