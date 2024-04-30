import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../scss/components/_serviceform.scss";


function CreateService() {
    const { id } = useParams(); // Assuming 'id' here would be the business ID or relevant identifier
    const [service, setService] = useState({
        fkBusinessId: '',
        serviceName: '',
        description: '',
        basePrice: 0,
        fkCategoryId: '',
        fkDiscountId: '',
        image: '',
    });
    const [categories, setCategories] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('token:', token);
        const apiUrl = import.meta.env.VITE_API_BASE_URL;

        if (token) {

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
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                
            })
    
            .then(response => {
                setCategories(response.data.$values);
            }).catch(error => {
                console.error('Error fetching categories:', error);
            });

            // Fetch discounts
            axios.get(`${apiUrl}/discount`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(response => {
                setDiscounts(response.data.$values);
            }).catch(error => {
                console.error('Error fetching discounts:', error);
            });

            // Optionally fetch business ID if needed
        }
    }, [id]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setService(prevState => ({ ...prevState, [name]: value }));
    // };
    const handleChange = (e) => {
        try {
            const { name, type } = e.target;
            const value = type === 'file' ? e.target.files[0] : e.target.value;
            setService(prevState => ({ ...prevState, [name]: value }));
        } catch (error) {
            console.error("Error handling form input change:", error);
        }
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const token = localStorage.getItem('token');
        // Before sending the request, check if businessID is set
if (!service.fkBusinessId) {
    setErrorMessage("Business ID is required.");
    return; // Prevent form submission
}

        try {
            const response = await axios.post(`${apiUrl}/Service/create`, service, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'  // Set content type as JSON
                },
            });
            console.log('Service added:', response.data);   
            setSuccessMessage('Service added successfully!');
        } catch (error) {
            console.error('Service add failed: ', error);
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

            <div className="form-group-service">

                <input
                    className='input'
                    required
                    autoComplete='off'
                    id="serviceName"
                    name="serviceName"
                    value={service.serviceName}
                    onChange={handleChange}
                />
                <label className="label" htmlFor="serviceName">Service Name</label>
            </div>
            <div className="form-group-service">

                <textarea
                    className='input'
                    required
                    autoComplete='off'
                    id="description"
                    name="description"
                    value={service.description}
                    onChange={handleChange}
                />
                <label className="label" htmlFor="description">Description</label>
            </div>

<div className="form-group-service">
    <label className="service-label" htmlFor="image">Image URL</label>
    <input
        className='input'
        type="text"
        required
        autoComplete='off'
        id="image"
        name="image"
        value={service.image}
        onChange={handleChange}
    />
</div>

            {/* <div className="form-group-service">
                <label className="service-label" htmlFor="image">Image</label>
                <input
                    className='input'
                    type="file"
                    required
                    autoComplete='off'
                    id="image"
                    name="image"
                    // value={service.image}
                    onChange={handleChange}
                />
            </div> */}
            <div className="form-group-service">

                <input
                    type="number"
                    className='input'
                    required
                    autoComplete='off'
                    id="basePrice"
                    name="basePrice"
                    value={service.basePrice}
                    onChange={handleChange}
                />
                <label className="label" htmlFor="basePrice">Base Price</label>
            </div>

            <div className="form-group-service">
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
            <div className="form-group-service">
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

            <button type="submit">Add Service</button>
        </form>
    </div>
</div>
    );
}

export default CreateService;
