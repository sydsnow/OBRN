import AddTestimonial from "../components/AddTestimonial";
import react from "react";
import { Link } from 'react-router-dom';

function TestimonialsPage() {

  

  return (
    <div className="testimonials">
      <div className="testimonials-banner">
        <p className="testimonials-small">TESTIMONIALS</p>
        <p className="testimonials-large">Testimonials</p>
        <div className="testimonials-path">
          <i className="fa-solid fa-house"></i>
          <Link to="/">HOME</Link> 
          <i className="fa-solid fa-angle-right"></i>
          <Link to="/testimonials">TESTIMONIALS</Link>
          <i className="fa-solid fa-angle-right"></i>
          <p>ADD NEW TESTIMONIAL</p>
        </div>
      </div>
      <AddTestimonial></AddTestimonial>
    </div>
  );
}

export default TestimonialsPage;
