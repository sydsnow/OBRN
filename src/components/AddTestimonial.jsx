import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AddTestimonial() {
    
    const [rating, setRating] = useState(0); // State to store the selected rating
    const [testimonial, setTestimonial] = useState({
        fkBusinessId: '',
        // date: '',
        description: '',
        rating: 0,
    });

    const { id } = useParams(); // Fetch the customer ID from the URL params
    const [successMessage, setSuccessMessage] = useState('');
const [errorMessage, setErrorMessage] = useState('');

    // const authenticated = localStorage.getItem('token');
    // console.log('authenticated:', authenticated);

    useEffect(() => {
        // Fetch the token from localStorage
        const token = localStorage.getItem('token');
        console.log('token:', token);

        if (token) {
            // Make a request to your API to fetch the business ID associated with the token
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            axios.get(`${apiUrl}/api/Business/getbusiness/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                const { pkBusinessId } = response.data;
                setTestimonial(prevState => ({ ...prevState, fkBusinessId: pkBusinessId }));
                console.log('businessId:', pkBusinessId);
                console.log(response.data.$values);
            })
            
            .catch(error => {
                console.error('Error fetching business ID:', error);
            });
        }
    }, [id]); // Empty dependency array ensures this effect runs only once after the component mounts

    const handleRatingChange = (value) => {
        setRating(value); // Set the rating value when a radio button is clicked
        setTestimonial({ ...testimonial, rating: value }); // Update testimonial object with selected rating
    };

    const handleChange = (e) => {
        setTestimonial({ ...testimonial, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
    
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${apiUrl}/testimonial/create`, testimonial, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log("response: ", response);
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    
            // Set success message
            setSuccessMessage('Testimonial added successfully!');
        } catch (error) {
            console.error('Testimonial add failed: ', error);
            // Set error message from the server if available or a generic error message
            setErrorMessage(error.response?.data?.message || 'Failed to add testimonial.');
        }
    };
    
    
    return (
<div className="wrapper">
    <div className="testimonial-container">
    {successMessage && <div className="testimonial-success-message">{successMessage}</div>}
            {errorMessage && <div className="testimonial-error-message">{errorMessage}</div>}
        <form className="testimonial-form" onSubmit={handleSubmit}>
            <h2>Add Testimonial For Our Beauty Referral Network</h2>

            <div className="form-group">
                <textarea
                    className='input'
                    required
                    autoComplete='off'
                    id="description"
                    name="description"
                    value={testimonial.description}
                    onChange={handleChange}
                    style={{ height: "auto", resize: "none", overflow: "hidden" }}
                    onInput={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                    }}
                />
                <label className="label" htmlFor="description">
                    <i className="fa-regular fa-comment"></i> Description
                </label>
            </div>
            <div className="form-group">
                <label className="testimonial-label" id="rating">Rating:</label>
                <div className="testimonial-rating-input">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <span
                            key={value}
                            className={`fa-solid fa-star${value <= rating ? ' filled' : ''}`}
                            onClick={() => handleRatingChange(value)}
                        ></span>
                    ))}
                </div>
            </div>
            <button type="submit">Add Testimonial</button>
        </form>
    </div>
</div>

    );
}

export default AddTestimonial;
