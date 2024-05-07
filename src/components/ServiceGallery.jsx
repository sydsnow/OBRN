import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../scss/components/_servicegallery.scss";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// function ServiceGallery() {
    // const { businessId } = useParams();
    function ServiceGallery({ businessId: propBusinessId }) {
        const { businessId: urlBusinessId } = useParams();
        const businessId = propBusinessId || urlBusinessId;
    // State to store services and discounts for each service
    const [services, setServices] = useState([]);
    const [discounts, setDiscounts] = useState([]);

    // Get the current location
    const location = useLocation();
    const isBusinessProfileRoute = location.pathname === '/businessprofile';

    const navigate = useNavigate();
    const handleEditService = (serviceId) => {
        navigate(`/edit-service/${serviceId}`);
    };

    useEffect(() => {
        const fetchServicesAndDiscounts = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
        
                // Fetch services for the businessId
                const serviceResponse = await fetch(`${apiUrl}/service/business/${businessId}`);
                if (!serviceResponse.ok) {
                    console.error('Failed to fetch services:', serviceResponse.statusText);
                    return; // Stop execution if there's an error
                }
                const servicesData = await serviceResponse.json();
                console.log('servicesData:', servicesData);
    
        
                // Since the actual services are within the $values property
                const actualServices = servicesData.$values || [];
                setServices(actualServices);
                console.log('actualServices:', actualServices);
        
                // Fetch discounts for each service
                const promises = actualServices.map(async service => {
                    try {
                        const response = await fetch(`${apiUrl}/discount/${service.fkDiscountId}`);
                        console.log("response", response);
                        console.log("fkDiscount", service.fkDiscount);
                        console.log("fkDiscountId", service.fkDiscountId);
                        if (!response.ok) {
                            console.error('Error fetching discount:', response.statusText);
                            return null;
                        }
                        return await response.json();
                    } catch (error) {
                        console.error('Error fetching discount:', error);
                        return null;
                    }
                });
        
                // Wait for all discount fetch requests to complete
                const discountsData = await Promise.all(promises);
                setDiscounts(discountsData);
            } catch (error) {
                console.error('Error in API operations:', error);
            }
        };

        if (!businessId) {
            console.log('No businessId provided or found.');
            return;
        }

        

        fetchServicesAndDiscounts();
    }, [businessId]);



    const handleDeleteService = async (serviceId) => {
        console.log('serviceId:', serviceId);
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await fetch(`${apiUrl}/api/Service/${serviceId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                console.error('Failed to delete service:', response.statusText);
                return;
            }

            // Remove the deleted service from the list
            setServices(prevServices => prevServices.filter(service => service.pkServiceId !== serviceId));
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    }

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
                                <p className="services-card-info-name">{service.serviceName}</p>
                                
                            </div>
                            <p className="services-card-info-name">{service.service}</p>
                            <div className="services-card-info-prices">
                                <div>
                                    {discounts[index] && (
                                        <p className="services-card-info-total">
                                            {/* Calculate the price with discount */}
                                            ${(service.basePrice * (1 - service.discountPrice)).toFixed(2)}
                                        </p>
                                    )}
                                    <p className="services-card-info-price">${service.basePrice}</p>
                                </div>
                            </div>
                            <div className="services-card-btns">
            {isBusinessProfileRoute && (
                <button className="services-card-info-button" onClick={() => handleEditService(service.pkServiceId)}>
                    Edit
                </button>
            )}
            {isBusinessProfileRoute && (
                <button className="services-card-info-button" onClick={() => handleDeleteService(service.pkServiceId)}>
                    Delete
                </button>
            )}
        </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

ServiceGallery.propTypes = {
    businessId: PropTypes.string
};

export default ServiceGallery;
