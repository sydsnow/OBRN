import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminRoles() {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState({ name: '' });

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
  }, []);

  const handleChange = (e) => {
    setRole({ ...role, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${apiUrl}/api/Role/add-role`, { roleName: role.name });
      console.log("response: ", response);
      // Handle the response as needed

      // Clear the input field after successful submission
      setRole({ ...role, name: '' });
    } catch (error) {
      console.error('Role creation failed: ', error);
    }
  };

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
                name='name'
                autoComplete='off'
                placeholder='Role Name'
                value={role.name}
                onChange={handleChange}
              />
            </div>
            <div className="button-container">
              <button type="submit">Save</button>
            </div>
          </form>
          <div className='admin-all-roles'>
            {roles.map((role) => (
              <div key={role.id} className='admin-role'>
                <p>{role.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRoles;
