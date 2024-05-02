import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import "../scss/components/_servicegallery.scss";

function ServiceGallery ({ services }) {
    // State to store discounts for each service
    const [discounts, setDiscounts] = useState([]);

    // Get the current location
    const location = useLocation();
    const isBusinessProfileRoute = location.pathname === '/businessprofile';

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;

                // Fetch discounts for each service
                const promises = services.map(async service => {
                    // Assuming service has a fkDiscountId
                    try {
                        const response = await fetch(`${apiUrl}/discount/${service.fkDiscountId}`);
                        return await response.json();
                    } catch (error) {
                        console.error('Error fetching discount:', error);
                        return null;
                    }
                });

                // Wait for all discount fetch requests to complete
                const discounts = await Promise.all(promises);
                setDiscounts(discounts);
            } catch (error) {
                console.error('Error fetching discounts:', error);
            }
        };

        fetchDiscounts();
    }, [services]);

    return (
        <div className="services-gallery-content">
            {services.map((service, index) => (
                <div className="services-card" key={service.pkServiceId}>
                    <div>
                        <div className="services-card-image-container">
                            <img src={service.image} alt="Service Image" className="services-card-image" />
                        </div>
                        <div className="services-card-info">
                            <div className='services-card-info-container'>
                                <p className="services-card-info-name">{service.service}</p>
                                {isBusinessProfileRoute && (
                                    <NavLink to={`/editservice/${service.pkServiceId}`} className="service-card-info-button">
                                        Edit
                                    </NavLink>
                                )}
                            </div>
                            <div className="services-card-info-prices">
                                <div>
                                    {discounts[index] && (
                                        <p className="services-card-info-total">
                                            {/* Calculate the price with discount */}
                                            ${(service.basePrice * (1 - discounts[index] / 100)).toFixed(2)}
                                        </p>
                                    )}
                                    <p className="services-card-info-price">${service.basePrice}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

ServiceGallery.propTypes = {
    services: PropTypes.array.isRequired
};

export default ServiceGallery;

// import PropTypes from 'prop-types';
// import "../scss/components/_servicegallery.scss"
// import { NavLink, useLocation } from 'react-router-dom';
// import { useEffect } from 'react';

// function ServiceGallery ({ services }) {

//     // Get the current location
//     const location = useLocation();
//     const isBusinessProfileRoute = location.pathname === '/businessprofile';

//     useEffect (() => {
//         const fetchDiscount = async () => { 
//             try {
//                 const apiUrl = import.meta.env.VITE_API_BASE_URL;
//                 const response = await fetch(`${apiUrl}/discount/${id}`);
//             } catch (error) {
//                 console.error(error);
//             } 
//         };  
//         fetchDiscount();
//     }, []);


//     return (
//         <div className="services-gallery-content">
//             {services.map((service) => (
//                 <div className="services-card" key={service.pkServiceId}>
//                     <div>
//                         <div className="services-card-image-container">
//                             <img src={service.image}alt="Service Image" className="services-card-image" />
//                         </div>
//                         <div className="services-card-info">
//                             <div className='services-card-info-container'>
//                                 <p className="services-card-info-name">{service.service}</p>
//                                 {isBusinessProfileRoute && (
//                                     <NavLink to={`/editservice/${service.pkServiceId}`} className="service-card-info-button">
//                                         Edit
//                                     </NavLink>
//                                 )}
//                             </div>
//                             <div className="services-card-info-prices">
//                                 <div>
//                                     {service.discount && (
//                                         <p className="services-card-info-total">
//                                             {/* Calculate the price with discount */}
//                                             ${(service.basePrice * (1 - service.discount / 100)).toFixed(2)}
//                                         </p>
//                                     )}
//                                     <p className="services-card-info-price">${service.basePrice}</p>
//                                 </div>
//                                 {/* {service.discount && (
//                                     <p className="services-card-info-discount">
//                                         {service.discount}% Off!
//                                     </p>
//                                 )} */}
//                             </div>
//                         </div>
//                     </div>
                    
//                 </div>
//             ))}
//         </div>
//     )
// }

// ServiceGallery.propTypes = {
//     services: PropTypes.array.isRequired
// };

// export default ServiceGallery;