import "../scss/components/_testimonials.scss"; 
import kitty from "../assets/kitty.jpg";

function TestimonialsPage() {

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      description: "Lorem ipsum dolor sit amet, ",
      rating: 5,
      image: kitty 
    },
    {
      id: 2,
      name: "Jane Doe",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in quam in odio venenatis luctus. Nullam at luctus enim. Nullam in quam in odio venenatis luctus. Nullam at luctus enim. Nullam in quam in odio venenatis luctus. Nullam at luctus enim.",
      rating: 4,
      image: kitty
    },
    {
      id: 3,
      name: "James Doe",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in quam in odio venenatis luctus. Nullam at luctus enim. Nullam in quam in odio venenatis luctus. Nullam at luctus enim. Nullam in quam in odio venenatis luctus. Nullam at luctus enim.",
      rating: 3,
      image: kitty 
    }
  ];

  return (
    <div className="testimonials">
      <div className="testimonials-banner">
        <p id="testimonials-small">TESTIMONIALS</p>
        <p id="testimonials-large">Testimonials</p>
        <div className="testimonials-path">
          <i className="fa-solid fa-house"></i>
          <p>HOME</p>
          <i className="fa-solid fa-angle-right"></i>
          <p>TESTIMONIALS</p>
        </div>
      </div>
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
    </div>
  );
}

export default TestimonialsPage;
