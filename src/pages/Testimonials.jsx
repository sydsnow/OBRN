import "../scss/components/_testimonials.scss"; 
//import kitty from "../assets/kitty.jpg";
import TestimonialGallery from "../components/TestimonialGallery";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

function TestimonialsPage() {
  

  const [testimonials, setTestimonials] = useState([]);

  // useEffect(() => {
  //   const fetchTestimonials = async () => {
  //       try {
  //           const apiUrl = import.meta.env.VITE_API_BASE_URL;
  //           const response = await axios.get(`${apiUrl}/testimonial`);
  //           setTestimonials(response.data); // Assuming response.data is an array of testimonials
  //       } catch (error) {
  //           console.error('Failed to fetch testimonials: ', error);
  //       }
  //   };

  //   fetchTestimonials();

  //   return () => {
  //       // Cleanup logic if needed
  //   };
  // }, []);
  useEffect(() => {
    const fetchTestimonials = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.get(`${apiUrl}/testimonial`);
            const fetchedTestimonials = response.data.$values;

            // Fetch business information for each testimonial
            const updatedTestimonials = await Promise.all(
                fetchedTestimonials.map(async testimonial => {
                    const businessId = testimonial.fkBusinessId;
                    const businessResponse = await axios.get(`${apiUrl}/api/Business/getbusiness/${businessId}`);
                    const business = businessResponse.data.$values;
                    
                    // Merge testimonial object with business information
                    return {
                        ...testimonial,
                        business: business // Assuming businessResponse.data contains the business information
                    };
                })
            );

            setTestimonials(updatedTestimonials);
        } catch (error) {
            console.error('Failed to fetch testimonials: ', error);
        }
    };

    fetchTestimonials();

    return () => {
        // Cleanup logic if needed
    };
}, []);

  return (
    <div className="testimonials">
      <div className="testimonials-banner">
        <p className="testimonials-small">TESTIMONIALS</p>
        <p className="testimonials-large">Testimonials</p>
        <div className="testimonials-path">
          <i className="fa-solid fa-house"></i>
          <NavLink to="/" className="testimonials-links">HOME</NavLink>
          <i className="fa-solid fa-angle-right"></i>
          <NavLink to="/testimonials" className="testimonials-links">TESTIMONIALS</NavLink>
        </div>
      </div>
      <div className="testimonials-add">

      </div>
      <TestimonialGallery testimonials={testimonials}></TestimonialGallery>
    </div>
  );
}

export default TestimonialsPage;
