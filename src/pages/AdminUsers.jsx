import { Link } from 'react-router-dom'; // Import Link from React Router
import { useState } from 'react';

function AdminUsers() {
    // State variables for pagination and search
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Dummy data for users (replace this with your actual data)
    const users = [
        { id: 1, firstName: 'John', lastName: 'Doe', username: 'johndoe123', userRole: 'Customer'},
        { id: 2, firstName: 'Jane', lastName: 'Smith', username: 'janesmith456', userRole: 'Admin'},
        // Add more users as needed
    ];

    // Pagination variables
    const usersPerPage = 10; // Change this to the desired number of users per page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Handle search input change
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    // Filter users based on search query
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
                    <h1>Admin Users</h1>

                    {/* Search input */}
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />

                    {/* Display users */}
                    <div className="admin-all-users">
                        {filteredUsers.map(user => (
                            <div className="admin-user" key={user.id}>
                                <div className="admin-user-details">
                                    <div className="admin-user-copy">
                                        <h3>{user.firstName} <span>{user.lastName}</span> </h3>
                                        <p>{user.username}</p>
                                        <p>{user.userRole}</p>
                                    </div>
                                    <div className="admin-user-btns">
                                        <button>Edit</button>
                                        <button>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
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

export default AdminUsers;
