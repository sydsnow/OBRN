import PropTypes from 'prop-types';
import "../scss/components/_testimonialgallery.scss"


function TestimonialGallery ({ testimonials }) {
    return (
        <div className="testimonials-gallery">
        {testimonials.map((testimonial) => (
          <div className="testimonials-card" key={testimonial.id}>
            <div className="testimonials-card-info">
                <p className="testimonials-card-info-rating">
                    {/* need to make sure these work with multiple ratings and not just in 20% increments */}
                {[...Array(5)].map((_, index) => (
                    <i key={index} className={`fas fa-star ${index < testimonial.rating ? 'filled' : ''}`}></i>
                ))}
                </p>
                <p className="testimonials-card-info-description">
                {testimonial.description.length > 100 ? `${testimonial.description.slice(0, 200)}...` : testimonial.description}
                </p>
                <p className="testimonials-card-info-name">{testimonial.name}</p>
            </div>
            <div className="testimonials-card-image-container">
                <img src={testimonial.image} alt="Testimonial Image" className="testimonials-card-image" />
            </div>
          </div>
        ))}
      </div>
    )
}

TestimonialGallery.propTypes = {
    testimonials: PropTypes.array.isRequired
};

export default TestimonialGallery;