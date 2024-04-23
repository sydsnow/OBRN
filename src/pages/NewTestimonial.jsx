import AddTestimonial from "../components/AddTestimonial";

function TestimonialsPage() {

  

  return (
    <div className="testimonials">
      <div className="testimonials-banner">
        <p className="testimonials-small">TESTIMONIALS</p>
        <p className="testimonials-large">Testimonials</p>
        <div className="testimonials-path">
          <i className="fa-solid fa-house"></i>
          <p>HOME</p>
          <i className="fa-solid fa-angle-right"></i>
          <p>TESTIMONIALS</p>
          <i className="fa-solid fa-angle-right"></i>
          <p>ADD NEW TESTIMONIAL</p>
        </div>
      </div>
      <AddTestimonial></AddTestimonial>
    </div>
  );
}

export default TestimonialsPage;
