import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import "../scss/components/_serviceform.scss";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function EditService() {
    const { serviceId } = useParams(); // Assuming 'serviceId' is the ID of the service to edit
    const [service, setService] = useState({});
    const [categories, setCategories] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/businessprofile');
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_BASE_URL;

        const fetchServiceById = async () => {
            try {

                const response = await axios.get(`${apiUrl}/Service/${serviceId}`);
                console.log('Service data:', response.data);
                setService(response.data);  // Assuming the data is the service object directly
            } catch (error) {
                console.error('Failed to fetch service: ', error);
            }
        };
        fetchServiceById();

        // // Fetch service details to edit
        // axios.get(`${apiUrl}/Service/${serviceId}`, {
        //     headers: { Authorization: `Bearer ${token}` }
        // })
        // .then(response => {
        //     setService(response.data);
        // }).catch(error => {
        //     console.error('Error fetching service details:', error);
        // });

        // Fetch categories
        axios.get(`${apiUrl}/Category`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setCategories(response.data.$values);
        }).catch(error => {
            console.error('Error fetching categories:', error);
        });

        // Fetch discounts
        axios.get(`${apiUrl}/discount`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setDiscounts(response.data.$values);
        }).catch(error => {
            console.error('Error fetching discounts:', error);
        });
    }, [serviceId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService(prevState => ({ ...prevState, [name]: value }));
    };

   const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem('token');
    const serviceUrl = `${apiUrl}/api/Service/${serviceId}`;

    console.log("Service Data being sent:", service);  // Debug the service data

    if (!service.fkBusinessId || !service.fkCategoryId) {
        console.error('Required fields are missing');
        setErrorMessage('Business ID and Category ID are required.');
        return;  // Prevent submission if required fields are missing
    }

    try {
        const response = await axios({
            method: 'put',
            url: serviceUrl,
            data: service,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        console.log('Service updated:', response.data);
        setSuccessMessage('Service updated successfully!');
    } catch (error) {
        console.error('Failed to update service: ', error);
        setErrorMessage(error.response?.data?.message || 'Failed to update service.');
    }
};

    return (
   
        <div className="edit-service">
            <div className="testimonials-banner">
                <p className="testimonials-small">EDIT BUSINESS SERVICE</p>
                <p className="testimonials-large">Edit Service</p>
                <div className="testimonials-path">
                <i className="fa-solid fa-house"></i>
                <p>BUSINESS PROFILE</p>
                <i className="fa-solid fa-angle-right"></i>
                <p>EDIT BUSINESS SERVICE</p>
                </div>
            </div>
            <div className="wrapper">
                <form className="service-form" onSubmit={handleSubmit}>
                    {/* <h2>Edit Service</h2> */}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="form-group">
                        <input className='input' required autoComplete='off' id="serviceName" name="serviceName" value={service.serviceName || ''} onChange={handleChange} />
                        <label className="label" htmlFor="serviceName">Service Name</label>
                    </div>
                    <div className="form-group">
                        <textarea className='input' required autoComplete='off' id="description" name="description" value={service.description || ''} onChange={handleChange} />
                        <label className="label" htmlFor="description">Description</label>
                    </div>
                    <div className="form-group">
                        <input className='input' type="text" required autoComplete='off' id="image" name="image" value={service.image || ''} onChange={handleChange} />
                        <label className="label" htmlFor="image">Image URL</label>
                    </div>
                    <div className="form-group">
                        <input type="number" className='input' required autoComplete='off' id="basePrice" name="basePrice" min="0" value={service.basePrice || ''} onChange={handleChange} />
                        <label className="label" htmlFor="basePrice">Base Price</label>
                    </div>
                    <div className="form-group">
                        <select className='input2' required id="fkCategoryId" name="fkCategoryId" value={service.fkCategoryId} onChange={handleChange}>
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.pkCategoryId} value={category.pkCategoryId}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                        <label className="label" htmlFor="fkCategoryId">Category</label>
                    </div>
                    <div className="form-group">
                        <select className='input' id="fkDiscountId" name="fkDiscountId" value={service.fkDiscountId} onChange={handleChange}>
                            <option value="">Select Discount</option>
                            {discounts.map(discount => (
                                <option key={discount.pkDiscountId} value={discount.pkDiscountId}>
                                    {`${(discount.percentage * 100).toFixed(0)}% OFF`}
                                </option>
                            ))}
                        </select>
                        <label className="label" htmlFor="fkDiscountId">Discount</label>
                    </div>
                    <div className="button-container">
            <button onClick={handleGoBack}>Go Back</button>
            <button type="submit">Save</button>
        </div>
                </form>
            </div>
            </div>
        
    );
}

EditService.propTypes = {
    serviceObj: PropTypes.shape({
        serviceName: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        basePrice: PropTypes.number,
        fkCategoryId: PropTypes.string,
        fkDiscountId: PropTypes.string,
    }),
};

export default EditService;
