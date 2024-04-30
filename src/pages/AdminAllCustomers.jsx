import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminAllCustomers() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from your API when component mounts
        const fetchUsers = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/api/customer/getcustomers`);
                setUsers(response.data.$values); // Assuming response.data is an array of users
            } catch (error) {
                console.error('Failed to fetch users: ', error);
            }
        };

        fetchUsers();

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
     const usersPerPage = 10; // Change this to the desired number of users per page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const filteredUsers = currentUsers.filter(user =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="wrapper">
            <div className="admin">
                <Link to="/admin"><button>Back to Admin</button></Link>
                <div className="admin-all-container">
                    <h1>All Customers</h1>

                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />

                    <div className="admin-all-users">
                        {filteredUsers.map(user => (
                            <div className="admin-user" key={user.pkCustomerId}>
                                <div className="admin-user-details">
                                    <div className="admin-user-copy">
                                        <h3>{user.firstName} <span>{user.lastName}</span> </h3>
                                        <p>{user.email}</p>

                                    </div>
                                    <div className="admin-user-btns">
                                    <Link to={`/admin-edit-customer/${user.pkCustomerId}`}><button>Edit</button></Link>
                                        <button>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="admin-pagination">
                        <span>{currentPage}</span>
                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentUsers.length < usersPerPage}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminAllCustomers;
