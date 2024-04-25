import { useState } from 'react';

function AddTestimonial() {
    const [rating, setRating] = useState(0); // State to store the selected rating

    // Function to handle changes in the rating
    const handleRatingChange = (value) => {
        setRating(value); // Set the rating value when a star is clicked
    };

    return (
        <div className="wrapper">
            <div className="testimonial-container">

                <form className="testimonial-form">
                <h2>Add Testimonial For Our Beauty Referral Network</h2>
                    <div className="form-group">
                        <input className='input' type="text" required autoComplete='off' id="name" name="name" />
                        <label className="label" htmlFor="name"><i className="fa-regular fa-user"></i> Your Name</label>
                    </div>
                    <div className="form-group">
                        <input className='input2 input-date' type="date" required autoComplete='off' id="date" name="date" />
                        <label className="label" htmlFor="date"><i className="fa-regular fa-calendar"></i> Date</label>
                    </div>
                    <div className="form-group">
                        <textarea
                            className='input'
                            required
                            autoComplete='off'
                            id="content"
                            name="content"
                            style={{ height: "auto", resize: "none", overflow: "hidden" }}
                            onInput={(e) => {
                                e.target.style.height = "auto";
                                e.target.style.height = e.target.scrollHeight + "px";
                            }}
                        />
                        <label className="label" htmlFor="content">
                            <i className="fa-regular fa-comment"></i> Testimonial
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="testimonial-label">Rating:</label>
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
                    <button>Add Testimonial</button>
                </form>
            </div>
        </div>
    );
}

export default AddTestimonial;
