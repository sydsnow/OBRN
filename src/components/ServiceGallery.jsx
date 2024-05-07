import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../scss/components/_servicegallery.scss";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
    
        const fetchServicesAndDiscounts = async () => {
            if (!businessId) {
                console.log('No businessId provided or found.');
                return;
            }
    
            try {
                // Fetch services for the businessId using axios
                const serviceResponse = await axios.get(`${apiUrl}/service/business/${businessId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const servicesData = serviceResponse.data;
                console.log('servicesData:', servicesData);
    
                // Assuming the actual services are within the $values property
                const actualServices = servicesData.$values || [];
                setServices(actualServices);
                console.log('actualServices:', actualServices);
    
                // Fetch discounts for each service
                const discountPromises = actualServices.map(service => axios.get(`${apiUrl}/discount/${service.fkDiscountId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }));
    
                const discountsResponses = await Promise.all(discountPromises);
                const discountsData = discountsResponses.map(response => response.data);
                setDiscounts(discountsData);
            } catch (error) {
                console.error('Error in API operations:', error);
            }
        };
    
        fetchServicesAndDiscounts();
    }, [businessId]);
    
    const handleDeleteService = async (serviceId) => {
        const token = localStorage.getItem('token');
        console.log('serviceId:', serviceId);
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            await axios.delete(`${apiUrl}/Service/${serviceId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Make sure token is accessible here, or fetch again as needed
                },
            });
    
            // Remove the deleted service from the list
            setServices(prevServices => prevServices.filter(service => service.pkServiceId !== serviceId));
        } catch (error) {
            console.error('Failed to delete service:', error);
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
