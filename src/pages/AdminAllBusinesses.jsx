import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminAllBusinesses() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [business, setBusiness] = useState([]);
    const [businessDeleted, setBusinessDeleted] = useState(false); // State to track if a business has been deleted successfully

    useEffect(() => {
        console.log('Fetching businesses...');
        const fetchBusinesses = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/api/Business/get-businesses`);
                setBusiness(response.data.$values);
            } catch (error) {
                console.error('Failed to fetch businesses: ', error);
            }
        };

        fetchBusinesses();

        return () => {
            // Cleanup logic if needed
        };
    }, []);

    const handleDeleteBusiness = async (businessId) => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            console.log('businessId', businessId);
            await axios.delete(`${apiUrl}/api/Business/delete-business/${businessId}`);
            // Update local state after successful deletion
            const updatedBusiness = business.filter(b => b.pkBusinessId !== businessId);
            setBusiness(updatedBusiness);
            setBusinessDeleted(true); // Set businessDeleted to true to display success message
        } catch (error) {
            console.error('Failed to delete business: ', error);
        }
    };
    
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page when search query changes
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setCurrentPage(1); // Reset to first page when search query is cleared
    };
    // Pagination variables
    const businessesPerPage = 10;
    const totalPages = Math.ceil(business.length / businessesPerPage);
    const indexOfLastBusiness = currentPage * businessesPerPage;
    const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;
    
    const currentBusiness = business
        .filter(item =>
            item.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.pkBusinessId.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(indexOfFirstBusiness, indexOfLastBusiness);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="wrapper">
            <div className="admin">
                <Link to="/admin"><button>Back to Admin</button></Link>
                <div className="admin-all-container">
                    <h1>All Businesses</h1>
                    {businessDeleted && (
                        <div className="success-message">Business has been successfully deleted.</div>
                    )}
                    <div className="search-bar">
                        <label htmlFor='business-search' ></label>
                        <input
                            type="text"
                            id='business-search'
                            placeholder="Search businesses..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                        {searchQuery && (
                            <button onClick={handleClearSearch} className='clear-search-button'>x</button>
                        )}
                    </div>
                    <div className="admin-all-users">
                        {currentBusiness.map(business => (
                            <div className="admin-user" key={business.pkBusinessId}>
                                <div className="admin-user-details">
                                    <div className="admin-user-copy">
                                        <h3>{business.businessName} </h3>
                                        <p>{business.email}</p>
                                    </div>
                                    <div className="admin-user-btns">
                                        <Link to={`/admin-edit-business/${business.pkBusinessId}`}><button>Edit</button></Link>
                                        <button onClick={() => handleDeleteBusiness(business.pkBusinessId)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                <i className="fa-solid fa-backward"></i>
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
                                    {i + 1}
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

export default AdminAllBusinesses;
