import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import haircut from '../assets/hair.jpeg';

function ServiceDetailPage() {
  const { businessId, serviceId } = useParams();
  const [service, setService] = useState(null);
  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const [serviceResponse, businessResponse] = await Promise.all([
          axios.get(`${apiUrl}/service/${businessId}/${serviceId}`),
          axios.get(`${apiUrl}/api/Business/get-business/${businessId}`)
        ]);
        setService(serviceResponse.data.$values[0]);
        setBusiness(businessResponse.data);
      } catch (error) {
        console.error('Failed to fetch details:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServiceDetails();
  }, [businessId, serviceId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading details. Please try again later.</div>;
  }

  if (!service) {
    return <div>No service data available.</div>;
  }

  return (
    <div className="banner">
      <div className="testimonials-banner">
        <p className="testimonials-small">SERVICE DETAIL</p>
        <p className="testimonials-large">Service Detail</p>
        <div className="testimonials-path">
          <i className="fa-solid fa-house"></i>
          <p onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>GO BACK</p>
          <i className="fa-solid fa-angle-right"></i>
          <p>SERVICE DETAIL</p>
        </div>
      </div>
      <div className="service-detail">
        <div className="service-detail-content">
          <div className="service-detail-image">
            <img src={haircut} alt="Service" />
          </div>
          <div className="service-detail-info">
            <h2>{service.serviceName}</h2>
            {business && <h3 style={{ cursor: 'pointer' }} onClick={() => navigate(`/${business.pkBusinessId}`)}>{business.businessName}</h3>}
            <p>{service?.description}</p>
            <div className="services-card-info-prices">
              <div>
                <p className="services-card-info-total">
                  ${(service.basePrice * (1 - service.discountPrice)).toFixed(2)}
                </p>
                <p className="services-card-info-price">${service.basePrice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetailPage;
