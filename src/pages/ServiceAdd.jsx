import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../scss/components/_serviceform.scss";
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';

function ServiceAdd({ serviceObj = {} }) {
    const { id } = useParams(); // Assuming 'id' is relevant for fetching related data, like business ID
    const [service, setService] = useState(serviceObj);
    const [categories, setCategories] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_BASE_URL;


                // Assuming 'id' is relevant for fetching business details
                axios.get(`${apiUrl}/api/Business/getbusiness/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    const pkBusinessId = response.data.pkBusinessId; // Assuming this is the correct path
                    if (pkBusinessId) {
                        setService(prevState => ({ ...prevState, fkBusinessId: pkBusinessId }));
                        console.log('businessId:', pkBusinessId);
                    } else {
                        console.error('No business ID found in the response');
                    }
                })
                
                .catch(error => {
                    console.error('Error fetching business ID:', error);
                    console.error('Error details:', error.response?.data);
                });

        // Fetch categories
        axios.get(`${apiUrl}/Category`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setCategories(response.data.$values);
            console.log('Categories:', response.data.$values)
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
    }, [id]);

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            setService(prevState => ({ ...prevState, [name]: value }));
        } catch (error) {
            console.error("Error handling form input change:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const token = localStorage.getItem('token');
        const serviceUrl = `${apiUrl}/Service/create`;

        try {
            const response = await axios({
                method: 'post',
                url: serviceUrl,
                data: service,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            console.log('Service added:', response.data);
            setSuccessMessage('Service added successfully!');
        } catch (error) {
            console.error('Failed to add service: ', error);
            setErrorMessage(error.response?.data?.message || 'Failed to add service.');
        }
    };

    return (
        <div className="wrapper">
            <div className="service-container">
                <form className="service-form" onSubmit={handleSubmit}>
                    <h2>Add Service</h2>
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="form-group">
                <input
                    className='input'
                    required
                    autoComplete='off'
                    id="serviceName"
                    name="serviceName"
                    value={service.serviceName || ''}
                    onChange={handleChange}
                />
                <label className="label" htmlFor="serviceName">Service Name</label>
            </div>
            <div className="form-group">

                <textarea
                    className='input'
                    required
                    autoComplete='off'
                    id="description"
                    name="description"
                    value={service.description || ''}
                    onChange={handleChange}
                />
                <label className="label" htmlFor="description">Description</label>
            </div>

<div className="form-group">

    <input
        className='input'
        type="text"
        required
        autoComplete='off'
        id="image"
        name="image"
        value={service.image || ''}
        onChange={handleChange}
    />
        <label className="label" htmlFor="image">Image URL</label>
</div>
            <div className="form-group">

                <input
                    type="number"
                    className='input'
                    required
                    autoComplete='off'
                    id="basePrice"
                    name="basePrice"
                    min="0"
                    value={service.basePrice || ''}
                    onChange={handleChange}
                />
                <label className="label" htmlFor="basePrice">Base Price</label>
            </div>

            <div className="form-group">
            <select
    className='input2'
    required
    id="fkCategoryId"
    name="fkCategoryId"
    value={service.fkCategoryId}
    onChange={handleChange}
>
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
    <select
        className='input'
        id="fkDiscountId"
        name="fkDiscountId"
        value={service.fkDiscountId}
        onChange={handleChange}
    >
        <option value="">Select Discount</option>
        {discounts.map(discount => (
            <option key={discount.pkDiscountId} value={discount.pkDiscountId}>
                {`${(discount.percentage * 100).toFixed(0)}% OFF`} {/* Convert to percentage and round */}
            </option>
        ))}
    </select>
    <label className="label" htmlFor="fkDiscountId">Discount</label>
</div>
            <div className="button-container">
                <button><NavLink to="/businessprofile">Cancel</NavLink></button>
                <button type="submit">Save</button>

            </div>
                </form>
            </div>
        </div>
    );
}

ServiceAdd.propTypes = {
    serviceObj: PropTypes.shape({
        serviceName: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string,
        basePrice: PropTypes.number,
        fkCategoryId: PropTypes.string,
        fkDiscountId: PropTypes.string,
    }),
};

export default ServiceAdd;
