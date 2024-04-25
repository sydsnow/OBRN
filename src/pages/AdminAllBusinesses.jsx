import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminAllBusinesses() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [business, setBusiness] = useState([]);

    useEffect(() => {
        // Fetch users from your API when component mounts
        const fetchBusinesses = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/api/Business/getbusinesses`);
                setBusiness(response.data); // Assuming response.data is an array of users
            } catch (error) {
                console.error('Failed to fetch users: ', error);
            }
        };

        fetchBusinesses();

        // Cleanup function
        return () => {
            // Cleanup logic if needed
        };
    }, []);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

     // Pagination variables
     const businessesPerPage = 10; // Change this to the desired number of users per page

    const indexOfLastBusiness = currentPage * businessesPerPage;
    const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;
    const currentBusiness = business.slice(indexOfFirstBusiness, indexOfLastBusiness);

    const filteredBusinesses = currentBusiness.filter(business =>
        business.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.pkBusinessId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="wrapper">
            <div className="admin">
                <Link to="/admin"><button>Back to Admin</button></Link>
                <div className="admin-all-container">
                    <h1>All Businesses</h1>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />

                    <div className="admin-all-users">
                        {filteredBusinesses.map(business => (
                            <div className="admin-user" key={business.pkBusinessId}>
                                <div className="admin-user-details">
                                    <div className="admin-user-copy">
                                        <h3>{business.businessName} </h3>
                                        <p>{business.email}</p>
                                    </div>
                                    <div className="admin-user-btns">
                                    <Link to={`/admin-edit-business/${business.pkBusinessId}`}><button>Edit</button></Link>
                                        <button>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="admin-pagination">
                        <span>{currentPage}</span>
                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentBusiness.length < businessesPerPage}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminAllBusinesses;
