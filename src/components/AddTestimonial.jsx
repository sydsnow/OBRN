import { useState } from 'react';
import axios from 'axios';

function AddTestimonial() {
    const [rating, setRating] = useState(0); // State to store the selected rating
    const [testimonial, setTestimonial] = useState({
        pkTestimonialId: '',
        fkBusinessId: '',
        date: '',
        description: '',
        rating: 0,
    });

    const handleRatingChange = (value) => {
        setRating(value); // Set the rating value when a radio button is clicked
        setTestimonial({ ...testimonial, rating: value }); // Update testimonial object with selected rating
    };
    const handleChange = (e) => {
        setTestimonial({ ...testimonial, [e.target.name]: e.target.value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log("testimonial: ", testimonial);
    //     try {
    //         const apiUrl = import.meta.env.VITE_API_BASE_URL;
    //         const response = await axios.post(`${apiUrl}/testimonial/create`, testimonial);
    //         console.log("response: ", response);
    //         const { message, token } = response.data;
    //         console.log(message);
    //         localStorage.setItem('token', token);
    //         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //     } catch (error) {
    //         console.error('Testimonial add failed: ', error);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("testimonial: ", testimonial);
    
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(`${apiUrl}/testimonial/create`, testimonial);
            console.log("response: ", response);
    
            // Log response data to check if the token is present
            console.log("response data: ", response.data);
    
            const { message, token } = response.data;
            console.log(message);
    
            // Log the token before setting it in the local storage
            console.log("token before setting in local storage: ", token);
    
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            console.error('Testimonial add failed: ', error);
        }
    
        // Log the token after the try-catch block
        const storedToken = localStorage.getItem('token');
        console.log('storedToken:', storedToken);
    };
    
    


    return (
        <div className="wrapper">
            <div className="testimonial-container">
                <form className="testimonial-form" onSubmit={handleSubmit}>
                <h2>Add Testimonial For Our Beauty Referral Network</h2>
                <div className="form-group">
                        <input className='input' type="hidden" required autoComplete='off' id="pkTestimonialId"
                        value={testimonial.pkTestimonialId} name="pkTestimonialId" onChange={handleChange} />
                        {/* <label className="label" htmlFor="pkTestimonialId"><i className="fa-regular fa-user"></i> TestimonialId</label> */}
                    </div>
                    <div className="form-group">
                        <input className='input' type="hidden" required autoComplete='off' id="fkBusinessId"
                        value={testimonial.fkBusinessId} name="fkBusinessId" onChange={handleChange} />
                        {/* <label className="label" htmlFor="fkBusinessId"><i className="fa-regular fa-user"></i> BusinessId</label> */}
                    </div>
                    <div className="form-group">
                        <input className='input2 input-date' type="hidden" required autoComplete='off' id="date" name="date" value={testimonial.date}
                        onChange={handleChange} />
                        {/* <label className="label" htmlFor="date"><i className="fa-regular fa-calendar"></i> Date</label> */}
                    </div>
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
                    {/* <div className="form-group">
                        <label className="testimonial-label" id="rating">Rating:</label>
                        <div className="testimonial-rating-input">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                    key={value}
                                    className={`fa-solid fa-star${value <= rating ? ' filled' : ''}`}
                                    onClick={() => handleRatingChange(value)}
                                    id="rating"
                                    name="rating"
                                    value={testimonial.rating}
                                    onChange={handleChange}
                                ></span>
                            ))}
                        </div>
                    </div> */}
                     <div className="form-group">
                        <label className="testimonial-label">Rating:</label>
                        <div className="testimonial-rating-input">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <label key={value} htmlFor="rating"className="rating-label">
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
