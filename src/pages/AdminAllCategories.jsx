import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminAllCategories() {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/api/Category/getcategories`);
                setCategory(response.data); // Assuming response.data is an array of categories 
            } catch (error) {
                console.error('Failed to fetch categories: ', error);
            }
        }
        fetchCategories();

        return () => {
            // Cleanup logic if needed
        };
    }, []);

    // Function to handle deletion of a category
    const handleDeleteCategory = async (categoryId) => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            await axios.delete(`${apiUrl}/api/Category/${categoryId}`);
            // Update local state after successful deletion
            setCategory(category.filter(category => category.id !== categoryId));
        } catch (error) {
            console.error('Failed to delete category: ', error);
        }
    };

  return (
    <div className="wrapper">
        <div className="admin">
            <Link to="/admin"><button>Back to Admin</button></Link>
            <Link to="/add-category"><button>Add Category</button></Link>
            <div className="admin-all-container">
                <h2>All Categories</h2>
                <div className="admin-all-categories">
                    {category.map((category) => (
                        <div key={category.id} className="admin-category">
                            <h3>{category.name}</h3>
                            <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}

export default AdminAllCategories;