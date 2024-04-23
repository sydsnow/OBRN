import { Link } from 'react-router-dom'; // Import Link from React Router
import { useState } from 'react';


function AdminTestimonials(){

    // Dummy testimonials data (replace this with your actual data)
    const testimonials = [
        { id: 1, name: 'Customer/Company Name 1', date: 'April 22, 2024', content: 'Testimonial content 1' },
        { id: 2, name: 'Customer/Company Name 2', date: 'April 22, 2024', content: 'Testimonial content 2' },
        // Add more testimonials as needed
    ];

    // State variables for pagination and search
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    // Pagination variables
    const testimonialsPerPage = 5; // Change this to the desired number of testimonials per page
    const indexOfLastTestimonial = currentPage * testimonialsPerPage;
    const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
    const currentTestimonials = testimonials.slice(indexOfFirstTestimonial, indexOfLastTestimonial);

    // Handle search input change
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    // Filter testimonials based on search query
    const filteredTestimonials = currentTestimonials.filter(testimonial =>
        testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimonial.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="wrapper">
        <div className="admin">
                            <Link to="/admin"><button>Back to Admin</button></Link>
            <div className="admin-testimonials-container">
                    {/* Search input */}
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                <div className="admin-testimonials-copy">
                    <h1>Testimonials</h1>
                </div>
                <div className="admin-testimonials-btns">
                {/* <Link to="/admin-add-testimonial"><button>Add Testimonial</button></Link> */}
                </div>
                <div className="admin-testimonials">
                    <div className="admin-testimonial">
                        <div className="admin-testimonial-details">
                            <div className="admin-testimonial-copy">
                            <h3>Customer/Company Name</h3>
                            <h4>Date: April 22, 2024</h4>
                            <p>
                                &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.&quot;
                            </p>
                            </div>
                        <div className="admin-testimonial-btns">
                            {/* <button>Edit</button> */}
                            <button>Delete</button>
                        </div>
                </div>
                </div>                 {/* end of testimonial */}
                                    <div className="admin-testimonial">
                        <div className="admin-testimonial-details">
                            <div className="admin-testimonial-copy">
                            <h3>Customer/Company Name</h3>
                            <h4>Date: April 22, 2024</h4>
                            <p>
                                &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.&quot;
                            </p>
                            </div>
                        <div className="admin-testimonial-btns">
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                </div>
                </div>                 {/* end of testimonial */}

            </div>
                                {/* Pagination */}
                    <div className="admin-pagination">
                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        <span>{currentPage}</span>
                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={filteredTestimonials.length < testimonialsPerPage}>Next</button>
                    </div>
        </div>
    </div>
</div>
    );
}

export default AdminTestimonials;