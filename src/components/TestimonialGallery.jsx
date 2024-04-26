// import PropTypes from 'prop-types';
// import "../scss/components/_testimonialgallery.scss"
// import { createRoot } from 'react-dom';
// import ModalComponent from './ModalComponent';

// const root = document.getElementById('root');
// createRoot(root).render(<ModalComponent />);

// function TestimonialGallery ({ testimonials }) {
//     return (
//         <div className="testimonials-gallery">
//         {testimonials.map((testimonial) => (
//           <div className="testimonials-card" key={testimonial.id}>
//             <div className="testimonials-card-info">
//                 <p className="testimonials-card-info-rating">
//                     {/* need to make sure these work with multiple ratings and not just in 20% increments */}
//                 {[...Array(5)].map((_, index) => (
//                     <i key={index} className={`fas fa-star ${index < testimonial.rating ? 'filled' : ''}`}></i>
//                 ))}
//                 </p>
//                 <p className="testimonials-card-info-description">
//                 {testimonial.description.length > 100 ? `${testimonial.description.slice(0, 200)}...` : testimonial.description}
//                 </p>
//                 <p className="testimonials-card-info-name">{testimonial.name}</p>
//             </div>
//             <div className="testimonials-card-image-container">
//                 <img src={testimonial.image} alt="Testimonial Image" className="testimonials-card-image" />
//             </div>
//           </div>
//         ))}
//       </div>
//     )
// }

// TestimonialGallery.propTypes = {
//     testimonials: PropTypes.array.isRequired
// };

// export default TestimonialGallery;
import { useState } from 'react';
import PropTypes from 'prop-types';
import ModalComponent from '../components/Modal';
import "../scss/components/_testimonialgallery.scss";

function TestimonialGallery({ testimonials }) {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const openModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
  };

  const closeModal = () => {
    setSelectedTestimonial(null);
  };

  return (
    <div className="testimonials-gallery">
      {testimonials.map((testimonial) => (
        <div className="testimonials-card" key={testimonial.pkTestimonialId}>
          <div className="testimonials-card-info">
            <p className="testimonials-card-info-rating">
              {[...Array(5)].map((_, index) => (
                <i
                  key={index}
                  className={`fas fa-star ${index < testimonial.rating ? 'filled' : ''}`}
                ></i>
              ))}
            </p>
            <p className="testimonials-card-info-description">
              {testimonial.description.length > 100
                ? `${testimonial.description.slice(0, 175)}...`
                : testimonial.description}
            </p>
            {testimonial.description.length > 100 && ( // Add condition here
              <button onClick={() => openModal(testimonial)} className="testimonials-card-info-button">Show More</button>
            )}
            <p className="testimonials-card-info-name">{testimonial.business.businessName}</p>
          </div>
          {/* <div className="testimonials-card-image-container">
          {testimonial.business.logo && ( // Check if logo is available
              <img src={testimonial.business.logo} alt="Testimonial Image" className="testimonials-card-image" />
            )}
          </div> */}
        </div>
      ))}
      {selectedTestimonial && (
        <ModalComponent
          isOpen={true}
          onRequestClose={closeModal}
          description={selectedTestimonial.description}
          closeModal={closeModal}
          businessName={selectedTestimonial.business.businessName}
        />
      )}
    </div>
  );
}

TestimonialGallery.propTypes = {
  testimonials: PropTypes.array.isRequired,
};

export default TestimonialGallery;
