import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminRoles() {
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState({ roleName: '' });
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('All Users');
    const [searchQuery, setSearchQuery] = useState('');
    const [displayedUsers, setDisplayedUsers] = useState([]); // State to manage displayed users   
    const [usersPerPage] = useState(10); // Number of users to display per page
    const [currentPage, setCurrentPage] = useState(1);

    const fetchRoles = async () => {
      try {
          const apiUrl = import.meta.env.VITE_API_BASE_URL;
          const response = await axios.get(`${apiUrl}/api/Role/get-roles`);
          setRoles(response.data);
      } catch (error) {
          console.error('Failed to fetch roles: ', error);
      }
    };

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/api/User/get-all-users`);
                const usersData = response.data.$values;
    
                // Fetch roles for each user and update the users state
                const updatedUsers = await Promise.all(usersData.map(async (user) => {
                    const roleResponse = await axios.get(`${apiUrl}/api/UserRole/get-user-roles/${user.email}`);
                    const userRole = roleResponse.data.$values; // Assuming each user has only one role
                    const updatedUser = { ...user, role: userRole ? userRole : 'N/A' };
                    return updatedUser;
                }));
    
                setUsers(updatedUsers);
            } catch (error) {
                console.error('Failed to fetch users: ', error);
            }
        };
    
        fetchRoles();
        fetchAllUsers();
    }, []); // Empty dependency array to run once on mount
    
    useEffect(() => {
        // Update displayed users when users or currentPage changes
        const startIndex = (currentPage - 1) * usersPerPage;
        const endIndex = Math.min(startIndex + usersPerPage, users.length);
        const newDisplayedUsers = users.slice(startIndex, endIndex);
        setDisplayedUsers(newDisplayedUsers);
    }, [users, currentPage, usersPerPage]);
    

    const handleChange = (e) => {
        setRole({ ...role, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${apiUrl}/api/Role/add-role`, { roleName: role.roleName });
            console.log("response: ", response);
            // Handle the response as needed

            // Clear the input field after successful submission
            setRole({ ...role, roleName: '' });

            // Fetch roles again to update the list after adding a new role
            fetchRoles();
        } catch (error) {
            console.error('Role creation failed: ', error);
        }
    };
    // Filter users based on search query
    const filterUsers = (query) => {
        return users.filter(user =>
            user.email.toLowerCase().includes(query.toLowerCase()),
            console.log("user", users)
        );
    };

    // Handle search input change
    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        console.log("query", query);
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
        setCurrentPage(pageNumber); // Update currentPage state
        const startIndex = (pageNumber - 1) * usersPerPage;
        const endIndex = Math.min(startIndex + usersPerPage, users.length);
        const newDisplayedUsers = users.slice(startIndex, endIndex);
        console.log("newDisplayedUsers", newDisplayedUsers);
        console.log("startIndex", startIndex);
        console.log("endIndex", endIndex);
        console.log("current page", pageNumber); // Log the updated currentPage state
        setDisplayedUsers(newDisplayedUsers);
    };

    // Pagination variables
    const totalPages = Math.ceil(users.length / usersPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    // Filter users based on the selected role name or display all users
    // const filteredUsers = filter === 'All Users' 
    //     ? users 
    //     : users.filter(user => user.role && user.role.includes(filter));

    return (
        <div className="wrapper">
            <div className="admin">
                <Link to="/admin"><button>Back to Admin</button></Link>
                <div className='admin-all-container'>
                    <h1>Roles</h1>
                    <form className='add-role-form' onSubmit={handleSubmit}>
                        <div className='add-role-form-input'>
                            <label htmlFor='roleName'>Role Name</label>
                            <input
                                className='input'
                                type='text'
                                id='roleName'
                                name='roleName'
                                autoComplete='off'
                                placeholder='Role Name'
                                value={role.roleName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="button-container">
                            <button type="submit">Save</button>
                        </div>
                    </form>
                    <div className='admin-all-roles'>
                        <button className={filter === 'All Users' ? 'admin-role-button active' : 'admin-role-button'} onClick={() => setFilter("All Users")}>
                            All Users
                        </button>
                        {roles.map((role) => (
                            <div key={role.id} className='admin-role'>
                                <button className={filter === role.name ? 'admin-role-button active' : 'admin-role-button'} onClick={() => setFilter(role.name)}>
                                    {role.name.charAt(0).toUpperCase() + role.name.slice(1).toLowerCase()}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h1>Users</h1>
                        <div className="search-bar">
                        <label htmlFor='customer-search'></label>
                        <input
                            type="text"
                            id='customer-search'
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                        {searchQuery && (
                            <button onClick={handleClearSearch} className='clear-search-button'>x</button>
                        )}
                    </div>
                    <div className='admin-all-users'>
                        <p>Showing {displayedUsers.length} of {users.length} Results</p>
                        
                        {displayedUsers.length > 0 ? (
                                                        //  console.log("displayed users currently", displayedUsers),

                            displayedUsers.map((user) => (
                                <div key={user.id} className='admin-user'>
                                    <div className='admin-user-div'>
                                        <p className='admin-user-button'>{user.email} - Roles:     
                                            {user.role && user.role.map((role, index) => {
                                                // console.log(role); // Log each role to the console for debugging
                                                return (
                                                    <span key={index}>
                                                        {role}
                                                        {index !== user.role.length - 1 && ','}
                                                    </span>
                                                );
                                            })}
                                        </p>
                                        <NavLink to={`/admin-add-role/${user.email}`}><button>Add Role</button></NavLink>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No users for that filter.</p>
                        )}
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
        </div>
    );
}

export default AdminRoles;
