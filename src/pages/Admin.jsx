import { Link } from 'react-router-dom'; // Import Link from React Router

function Admin() {
  return (
    <div className="wrapper">
      <div className="admin">
        <div className="admin-container">
          <div className="admin-copy">
            <h1>Admin</h1>
          </div>
          <div className="admin-btns">
            <Link to="/admin-all-customers"><button>View All Customers</button></Link>
            <Link to="/admin-all-businesses"><button>View All Businesses</button></Link>

            <Link to="/admin-users"><button>View All Admin Users</button></Link>
            <Link to="/admin-deals"><button>View All Deals</button></Link>
            <Link to="/admin-testimonials"><button>View Testimonials</button></Link>
            <Link to="/admin-all-categories"><button>View All Categories</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}   

export default Admin;
