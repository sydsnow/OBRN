import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminAllCustomers() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [displayedUsers, setDisplayedUsers] = useState([]); // State to manage displayed users   
    const [usersPerPage] = useState(12); // Number of users to display per page

    useEffect(() => {
        // Fetch users from your API when component mounts
        const fetchUsers = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/api/customer/get-customers`);
                setUsers(response.data.$values); // Assuming response.data is an array of users
                setDisplayedUsers(response.data.$values.slice(0, usersPerPage)); // Set displayed users to first two users
            } catch (error) {
                console.error('Failed to fetch users: ', error);
            }
        };

        fetchUsers();

        // Cleanup function
        return () => {
            // Cleanup logic if needed
        };
    }, [usersPerPage]);

    // Function to handle deletion of a customer
    const handleDeleteCustomer = async (customerId) => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            console.log('customerId', customerId);
            const customer = await axios.get(`${apiUrl}/api/Customer/get-customer/${customerId}`);
            console.log('customer', customer.data);
            await axios.delete(`${apiUrl}/api/Customer/delete-customer/${customerId}`);
            // Update local state after successful deletion
            const updatedUsers = users.filter(user => user.pkCustomerId !== customerId);
            setUsers(updatedUsers);
            setDisplayedUsers(updatedUsers.slice(0, usersPerPage)); // Update displayed users
        } catch (error) {
            console.error('Failed to delete customer: ', error);
        }
    };

    // Filter users based on search query
    const filterUsers = (query) => {
        return users.filter(user =>
            user.firstName.toLowerCase().includes(query.toLowerCase()) ||
            user.lastName.toLowerCase().includes(query.toLowerCase()) 
        );
    };

    // Handle search input change
    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filteredUsers = filterUsers(query);
        setDisplayedUsers(filteredUsers.slice(0, usersPerPage)); // Update displayed users with filtered results and reset to first page
        setCurrentPage(1); // Reset to first page when search query changes
    };

    // Handle clear search
    const handleClearSearch = () => {
        setSearchQuery('');
        setDisplayedUsers(users); // Reset displayed services to all services
    };

    // Handler for going to the first page
    const handleGoToFirstPage = () => {
        setCurrentPage(1);
        setDisplayedUsers(users.slice(0, usersPerPage)); // Update displayed users to show first page
    };

    // Handler for going to the last page
    const handleGoToLastPage = () => { 
        const lastPage = Math.ceil(users.length / usersPerPage);
        setCurrentPage(lastPage);
        setDisplayedUsers(users.slice((lastPage - 1) * usersPerPage)); // Update displayed users to show last page
    };

    // Handler for changing current page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setDisplayedUsers(users.slice((pageNumber - 1) * usersPerPage, pageNumber * usersPerPage)); // Update displayed users based on selected page
    };

    // Pagination variables
    const totalPages = Math.ceil(users.length / usersPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="wrapper">
            <div className="admin">
                <Link to="/admin"><button>Back to Admin</button></Link>
                <div className="admin-all-container">
                    <h1>All Customers</h1>
                    <div className="search-bar">
                        <label htmlFor='customer-search'></label>
                        <input
                            type="text"
                            id='customer-search'
                            placeholder="Search businesses..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                        {searchQuery && (
                            <button onClick={handleClearSearch} className='clear-search-button'>x</button>
                        )}
                    </div>
                    <div className="admin-all-users">
                        <p>Showing {displayedUsers.length} of {users.length} Results</p>
                        {displayedUsers.map(user => (
                            <div className="admin-user" key={user.pkCustomerId}>
                                <div className="admin-user-details">
                                    <div className="admin-user-copy">
                                        <h3>{user.firstName} <span>{user.lastName}</span> </h3>
                                        <p>{user.email}</p>
                                    </div>
                                    <div className="admin-user-btns">
                                        <Link to={`/admin-edit-customer/${user.pkCustomerId}`}><button>Edit</button></Link>
                                        <button onClick={() => handleDeleteCustomer(user.pkCustomerId)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button onClick={handleGoToFirstPage} disabled={currentPage === 1}>
                                <i className="fa-solid fa-backward"></i>
                            </button>
                            {pageNumbers.map(number => (
                                <button key={number} onClick={() => handlePageChange(number)} className={currentPage === number ? 'active' : ''}>
                                    {number}
                                </button>
                            ))}
                            <button onClick={handleGoToLastPage} disabled={currentPage === totalPages}>
                                <i className="fa-solid fa-forward"></i>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminAllCustomers;
