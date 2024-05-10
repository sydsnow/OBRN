import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [successMessage, setSuccessMessage] = useState('');


    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/testimonial`);
                setTestimonials(response.data.$values); // Assuming response.data is an array of testimonials
            } catch (error) {
                console.error('Failed to fetch testimonials: ', error);
            }
        };

        fetchTestimonials();

        return () => {
            // Cleanup logic if needed
        };
    }, []);

    const handleDeleteTestimonial = async (testimonialId) => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            await axios.delete(`${apiUrl}/api/Testimonial/${testimonialId}`);
            setTestimonials(testimonials.filter(testimonial => testimonial.pkTestimonialId !== testimonialId));
            setSuccessMessage('Testimonial deleted successfully!');
    
            // Clear the success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 10000);
    
        } catch (error) {
            console.error('Failed to delete testimonial: ', error);
            // Optionally, handle error message display here
        }
    };
    

    const testimonialsPerPage = 5;
    const indexOfLastTestimonial = currentPage * testimonialsPerPage;
    const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
    const currentTestimonials = testimonials.slice(indexOfFirstTestimonial, indexOfLastTestimonial);

    return (
        <div className="wrapper">
            <div className="admin">
                <Link to="/admin"><button>Back to Admin</button></Link>
                <div className="admin-testimonials-container">
                {successMessage && <div className="testimonial-error-message">{successMessage}</div>}
                    <div className="admin-testimonials-copy">
                        <h1>Testimonials</h1>
                    </div>
                    <div className="admin-testimonials-btns">
                        {/* Add button to add testimonial if needed */}
                    </div>
                    <div className="admin-testimonials">
                        {currentTestimonials.map(testimonial => (
                            <div className="admin-testimonial" key={testimonial.pkTestimonialId}>
                                <div className="admin-testimonial-details">
                                    <div className="admin-testimonial-copy">
                                        <h3>{testimonial.fkBusinessId}</h3>
                                        <h4>Date: {testimonial.testimonialDate}</h4>
                                        <p>{testimonial.description}</p>
                                    </div>
                                    <div className="admin-testimonial-btns">
                                        <button onClick={() => handleDeleteTestimonial(testimonial.pkTestimonialId)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {testimonials.length > 10 && (
                        <div className="admin-pagination">
                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        <span>{currentPage}</span>
                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentTestimonials.length < testimonialsPerPage}>Next</button>
                    </div>
                    )}
                    
                </div>
            </div>
        </div>
    );
}

export default AdminTestimonials;
