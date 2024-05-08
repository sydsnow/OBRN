import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import "../scss/components/_servicegallery.scss";
import { useNavigate } from 'react-router-dom';
import ImagePlaceholder from '../assets/image-placeholder.jpg';

function ServiceGallery({ displayedServices }) {

    // Get the current location
    const location = useLocation();
    const isBusinessProfileRoute = location.pathname === '/businessprofile';

    const navigate = useNavigate();
    const handleEditService = (serviceId) => {
        navigate(`/edit-service/${serviceId}`);
    };

    return (
        <div className="services-gallery-content">
            {displayedServices.map((service) => (
                <div className="services-card" key={service.pkServiceId}>
                    <div>
                        <div className="services-card-image-container">
                            <img src={ImagePlaceholder} alt="Service Image" className="services-card-image"/>
                            {/* <img src={service.image} alt="Service Image" className="services-card-image" /> */}
                        </div>
                        <div className="services-card-info">
                            <div className='services-card-info-container'>
                                {/* <p className="services-card-info-name">{service.business.businessName}</p> */}
                                {!isBusinessProfileRoute && (
                                    <NavLink to={`/${service.business.pkBusinessId}/${service.pkServiceId}`} className="services-card-link">
                                        {service.business.businessName}
                                    </NavLink>
                                    // <NavLink to={`/${service.business.pkBusinessId}`} className="services-card-info-business">{service.business.businessName}</NavLink>
                                )}
                                {isBusinessProfileRoute && (
                                    <button className="services-card-info-button" onClick={() => handleEditService(service.pkServiceId)}>
                                        Edit
                                    </button>
                                )}
                            </div>
                            <p className="services-card-info-name">{service.serviceName}</p>
                            <div className="services-card-info-prices">
                                <div>
                                        <p className="services-card-info-total">
                                            {/* Calculate the price with discount */}
                                            ${(service.basePrice * (1 - service.discountPrice)).toFixed(2)}
                                        </p>
                                    <p className="services-card-info-price">${service.basePrice}</p>
                                </div>
                            </div>
                            <div className="services-card-btns">
            
            {/* {isBusinessProfileRoute && (
                <button className="services-card-info-button" onClick={() => handleDeleteService(service.pkServiceId)}>
                    Delete
                </button>
            )} */}
        </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

ServiceGallery.propTypes = {
    displayedServices: PropTypes.array
};

export default ServiceGallery;
