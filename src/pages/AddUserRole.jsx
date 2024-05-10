import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function AddUserRole() {
    const [roles, setRoles] = useState([]);
    const { email } = useParams();
    const [userRole, setUserRole] = useState({
        email: email, // Assign the email parameter to userRole.email,
        roleName: ''
    });

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/api/Role/get-roles`);
                setRoles(response.data);
            } catch (error) {
                console.error('Failed to fetch roles: ', error);
            }
        };

        fetchRoles();
    }, []); // Removed roles from the dependency array to prevent infinite loop

    const handleChange = (e) => {
        setUserRole({ ...userRole, [e.target.name]: e.target.value }); // Update userRole instead of category
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            console.log("userRole: ", userRole);
            const response = await axios.post(`${apiUrl}/api/UserRole/add-user-role`, userRole);
            console.log("response: ", response);
        } catch (error) {
            console.error('Failed to add user role: ', error);
        }
    };

    return (
        <div className="wrapper">
            <div className="admin">
                <Link to="/admin-roles"><button>Back to Admin</button></Link>
                <div className="admin-all-container">
                    <h1>Add User Role</h1>
                    <p>User: {email}</p>
                    <form onSubmit={handleSubmit}> {/* Added onSubmit event handler */}
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select name="roleName" id="role" onChange={handleChange} value={userRole.roleName}> {/* Updated name, added onChange and value */}
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.name}>{role.name}</option> 
                                ))}

                            </select>
                        </div>
                        <button type="submit">Add Role</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default AddUserRole;
