import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddCategory from "../components/AddCategory";

function AdminAllCategories() {
    const [category, setCategory] = useState([]);
    const [showAddCategory, setShowAddCategory] = useState(false); // State to control visibility
    const [searchQuery, setSearchQuery] = useState('');
    const [displayedCategories, setDisplayedCategories] = useState([]); // State to manage displayed categories
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriesPerPage] = useState(12); // Number of categories to display per page
    const [categoryDeleted, setCategoryDeleted] = useState(false); // State to track if a category was successfully deleted

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/category`);
                setCategory(response.data.$values);
                setDisplayedCategories(response.data.$values.slice(0, categoriesPerPage));
            } catch (error) {
                console.error('Failed to fetch categories: ', error);
            }
        };
        fetchCategories();
    }, [categoriesPerPage]);

    // Function to refresh categories list
    const refreshCategories = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.get(`${apiUrl}/category`);
            setCategory(response.data.$values);
            setDisplayedCategories(response.data.$values.slice(0, categoriesPerPage));
        } catch (error) {
            console.error('Failed to refresh categories: ', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            await axios.delete(`${apiUrl}/api/Category/${categoryId}`);
            // Set categoryDeleted to true to display success message
            setCategoryDeleted(true);
            // Refresh categories after deletion
            refreshCategories();
        } catch (error) {
            console.error('Failed to delete category: ', error);
        }
    };

    // Pagination variables
    const totalPages = Math.ceil(category.length / categoriesPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Handle pagination
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setDisplayedCategories(category.slice((pageNumber - 1) * categoriesPerPage, pageNumber * categoriesPerPage));
    };

    return (
        <div className="wrapper">
            <div className="admin">
                <Link to="/admin"><button>Back to Admin</button></Link>
                <div className="admin-all-container">
                    <h1>All Categories</h1>
                    {categoryDeleted && (
                        <div className="success-message">Category has been successfully deleted.</div>
                    )}
                    <button onClick={() => setShowAddCategory(!showAddCategory)}>
                        {showAddCategory ? "Hide Add Category" : "Add Category"}
                    </button>
                    {showAddCategory && (
                        <div className="admin-category-box">
                            {/* Pass refreshCategories function as a prop */}
                            <AddCategory onCategoryAdded={refreshCategories} />
                        </div>
                    )}
                    <div className="search-bar">
                        <label htmlFor="category-search"></label>
                        <input
                            type="text"
                            placeholder="Search categories..."
                            id="category-search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className='clear-search-button'>x</button>
                        )}
                    </div>
                    <div className="admin-all-categories">
                        <p>Showing {displayedCategories.length} of {category.length} Results</p>
                        {displayedCategories.map((category) => (
                            <div key={category.pkCategoryId} className="admin-category">
                                <h3>{category.categoryName}</h3>
                                <button onClick={() => handleDeleteCategory(category.pkCategoryId)}>Delete</button>
                            </div>
                        ))}
                    </div>
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                <i className="fa-solid fa-backward"></i>
                            </button>
                            {pageNumbers.map(number => (
                                <button key={number} onClick={() => handlePageChange(number)} className={currentPage === number ? 'active' : ''}>
                                    {number}
                                </button>
                            ))}
                            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                <i className="fa-solid fa-forward"></i>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminAllCategories;
