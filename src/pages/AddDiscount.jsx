import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

function AddDiscount({ onDiscountAdded }) {
    const [discount, setDiscount] = useState({
        percentage: '',
        pkDiscountId: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [discountAdded, setDiscountAdded] = useState(false);

    useEffect(() => {
        generateNewPkId(); // Call generateNewPkId function when component mounts
    }, []);

    // Function to generate a new pkDiscountId
    const generateNewPkId = () => {
        // Example logic for generating pkDiscountId
        const newPkDiscountId = `DIS${Math.floor(Math.random() * 1000)}`;
        setDiscount(prevState => ({ ...prevState, pkDiscountId: newPkDiscountId }));
    };

    const handleChange = (e) => {
        setDiscount({ ...discount, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate discount percent
        if (isNaN(discount.percentage) || discount.percentage < 0 || discount.percentage > 100) {
            setErrorMessage("Discount percent must be a number between 0 and 100.");
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const decimalPercentage = parseFloat(discount.percentage) / 100;
            const dataToSend = { ...discount, percentage: decimalPercentage };
            const response = await axios.post(`${apiUrl}/discount/create`, dataToSend);
            const { message, token } = response.data;
            console.log(message);
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setDiscountAdded(true);

            // Update discounts array with the newly created discount
            if (onDiscountAdded) {
                onDiscountAdded(); // Call the callback function to update discounts
            }

            // Clear input fields
            setDiscount({ percentage: '', pkDiscountId: '' });
            setErrorMessage('');
        } catch (error) {
            console.error('Failed to add discount: ', error);
            setErrorMessage("Failed to add discount. Please try again later.");
        }
    };

    return (
        <div className="add-category">
            <h2 className="add-category-title">Add Discount</h2>
            {discountAdded && <p className="success-message">Discount added successfully!</p>}
            <form className="add-category-form" onSubmit={handleSubmit}>
                <div className="form-group-category">
                    <input 
                        className="input" 
                        type="number" 
                        id="add-percentage" 
                        required 
                        autoComplete="off" 
                        name="percentage" 
                        placeholder="Discount Percent"
                        min="0"
                        max="100"
                        value={discount.percentage}
                        onChange={handleChange}
                    />
                </div>
                <div className="button-container">  
                    <button type="submit">Save</button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    )
}

AddDiscount.propTypes = {
    onDiscountAdded: PropTypes.func
};

export default AddDiscount;
