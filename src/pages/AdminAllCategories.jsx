import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddCategory from "../components/AddCategory";

function AdminAllCategories() {
    const [category, setCategory] = useState([]);
    const [showAddCategory, setShowAddCategory] = useState(false); // State to control visibility

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/category`);
                setCategory(response.data.$values);
            } catch (error) {
                console.error('Failed to fetch categories: ', error);
            }
        }
        fetchCategories();
    }, []);

    const handleDeleteCategory = async (categoryId) => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            await axios.delete(`${apiUrl}/api/Category/${categoryId}`);
            setCategory(category.filter(category => category.pkCategoryId !== categoryId));
        } catch (error) {
            console.error('Failed to delete category: ', error);
        }
    };

    return (
        <div className="wrapper">
            <div className="admin">
                <Link to="/admin"><button>Back to Admin</button></Link>
                <div className="admin-category-container">
                    <h1>All Categories</h1>
                    <button onClick={() => setShowAddCategory(!showAddCategory)}>Add Category</button>
                    {showAddCategory && (
                        <div className="admin-category-box">
                            <AddCategory />
                        </div>
                    )}
                    <div className="admin-all-categories">
                        {category.map((category) => (
                            <div key={category.pkCategoryId} className="admin-category">
                                <h3>{category.categoryName}</h3>
                                <button onClick={() => handleDeleteCategory(category.pkCategoryId)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminAllCategories;
