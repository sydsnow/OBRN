import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import haircut from '../assets/hair.jpeg';

function ServiceDetailPage() {
  const { businessId, serviceId } = useParams();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${apiUrl}/service/${businessId}/${serviceId}`);
        // Set the first item from the $values array
        setService(response.data.$values[0]); // This will correctly set the service object
      } catch (error) {
        console.error('Failed to fetch service details:', error);
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

  if (!service) {
    return <div>No service data available.</div>;
  }  

  if (error) {
    return <div>Error loading service details. Please try again later.</div>;
  }

  return (
    <div className="service-detail">
      <h2>{service.serviceName}</h2>
        <div>
            {<img src={haircut} alt="Service" />}
            {/* <img src={service?.image} alt="Service" /> */}
            <p>Description: {service?.description}</p>
            <p>Base Price: ${service?.basePrice?.toFixed(2) ?? 'N/A'}</p>
            <p>Discount: ${(service.basePrice * (1 - service.discountPrice)).toFixed(2)}</p>
        </div>
    </div>
  );
}

export default ServiceDetailPage;

