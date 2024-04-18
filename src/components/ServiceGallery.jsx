import PropTypes from 'prop-types';
import "../scss/components/_servicegallery.scss"

function ServiceGallery ({services}) {
    return (
        <div className="services-gallery-content">
            {services.map((service) => (
                <div className="services-card" key={service.id}>
                    <div>
                        <div className="services-card-image-container">
                            <img src={service.image}alt="Service Image" className="services-card-image" />
                        </div>
                        <div className="services-card-info">
                            <p className="services-card-info-name">{service.service}</p>
                            <div className="services-card-info-prices">
                                <div>
                                    {service.discount && (
                                        <p className="services-card-info-total">
                                            {/* Calculate the price with discount */}
                                            ${(service.price * (1 - service.discount / 100)).toFixed(2)}
                                        </p>
                                    )}
                                    <p className="services-card-info-price">${service.price}</p>
                                </div>
                                {/* {service.discount && (
                                    <p className="services-card-info-discount">
                                        {service.discount}% Off!
                                    </p>
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
    services: PropTypes.array.isRequired
};

export default ServiceGallery;