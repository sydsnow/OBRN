import "../scss/components/_testimonials.scss"; 
import kitty from "../assets/kitty.jpg";
import TestimonialGallery from "../components/TestimonialGallery";

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
        <p className="testimonials-small">TESTIMONIALS</p>
        <p className="testimonials-large">Testimonials</p>
        <div className="testimonials-path">
          <i className="fa-solid fa-house"></i>
          <p>HOME</p>
          <i className="fa-solid fa-angle-right"></i>
          <p>TESTIMONIALS</p>
        </div>
      </div>
      <TestimonialGallery testimonials={testimonials}></TestimonialGallery>
    </div>
  );
}

export default TestimonialsPage;
