import { useState, useEffect } from 'react';
import axios from 'axios';
import { json, useParams } from 'react-router-dom';

function AddTestimonial() {
    const [rating, setRating] = useState(0); // State to store the selected rating
    const [testimonial, setTestimonial] = useState({
        fkBusinessId: '',
        date: '',
        description: '',
        rating: 0,
    });

    const { id } = useParams(); // Fetch the customer ID from the URL params
    const authenticated = localStorage.getItem('token');
    console.log('authenticated:', authenticated);

    useEffect(() => {
        // Fetch the token from localStorage
        const token = localStorage.getItem('token');

        if (token) {
            // Make a request to your API to fetch the business ID associated with the token
            const emailAddress = JSON.parse(token).email;
            console.log('emailAddress:', emailAddress);
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            axios.get(`${apiUrl}/api/Business/getcustomerbyemail`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
    
            .then(response => {
                const { businessId } = response.data;
                setTestimonial(prevState => ({ ...prevState, fkBusinessId: businessId }));
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
        console.log("testimonial: ", testimonial);

        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${apiUrl}/testimonial/create`, testimonial);
            console.log("response: ", response);

            const { message, token } = response.data;
            console.log(message);

            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            console.error('Testimonial add failed: ', error);
        }
        const storedToken = localStorage.getItem('token');
        console.log('storedToken:', storedToken);
    };

    return (
        <div className="wrapper">
            <div className="testimonial-container">
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
                        <label className="testimonial-label">Rating:</label>
                        <div className="testimonial-rating-input">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <label key={value} htmlFor="rating" className="rating-label">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={value}
                                        checked={rating === value}
                                        onChange={() => handleRatingChange(value)}
                                    />
                                    {value}
                                </label>
                            ))}
                        </div>
                    </div>
                    <button>Add Testimonial</button>
                </form>
            </div>
        </div>
    );
}

export default AddTestimonial;
