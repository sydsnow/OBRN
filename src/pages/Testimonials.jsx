import "../scss/components/_testimonials.scss"; 

function TestimonialsPage() {

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      description: "Lorem ipsum dolor sit amet, ",
      rating: 5,
      //image: 
    },
    {
      id: 2,
      name: "Jane Doe",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in quam in odio venenatis luctus. Nullam at luctus enim. Nullam in quam in odio venenatis luctus. Nullam at luctus enim. Nullam in quam in odio venenatis luctus. Nullam at luctus enim.",
      rating: 4,
    },
    {
      id: 3,
      name: "James Doe",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in quam in odio venenatis luctus. Nullam at luctus enim. Nullam in quam in odio venenatis luctus. Nullam at luctus enim. Nullam in quam in odio venenatis luctus. Nullam at luctus enim.",
      rating: 3,
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
            <p className="testimonials-card-rating">
                {/* need to make sure these work with multiple ratings and not just in 20% increments */}
              {[...Array(5)].map((_, index) => (
                <i key={index} className={`fas fa-star ${index < testimonial.rating ? 'filled' : ''}`}></i>
              ))}
            </p>
            <p className="testimonials-card-description">
              {testimonial.description.length > 100 ? `${testimonial.description.slice(0, 200)}...` : testimonial.description}
            </p>
            <p className="testimonials-card-name">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialsPage;
