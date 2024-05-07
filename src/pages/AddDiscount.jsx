import { useState, useEffect } from "react";
import axios from "axios";
//import { useHistory } from "react-router-dom";


function AddDiscount() {
    //const history = useHistory(); // Initialize useHistory hook
    const [discount, setDiscount] = useState({
        percentage: '',
        pkDiscountId: '',
    });
    const [discounts, setDiscounts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/discount`);
                const discountsData = response.data.$values;
                setDiscounts(discountsData);

                // Generate pkDiscountId based on the length of discounts array
                const newPkDiscountId = `DIS${discounts.length + 1}`;
                setDiscount(prevState => ({ ...prevState, pkDiscountId: newPkDiscountId }));
            } catch (error) {
                console.error('Failed to fetch discounts: ', error);
            }
        }
        fetchDiscounts();
    }, [discounts.length]); // Include 'discounts.length' as a dependency

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
            // Convert percentage to decimal
            const decimalPercentage = parseFloat(discount.percentage) / 100; // Convert to decimal
            const dataToSend = { ...discount, percentage: decimalPercentage }; // Update the percentage value
            console.log("discount: ", dataToSend);
            const response = await axios.post(`${apiUrl}/discount/create`, dataToSend);
            console.log("response: ", response);
            const { message, token } = response.data;
            console.log(message);
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Update discounts array with the newly created discount
            setDiscounts(prevDiscounts => [...prevDiscounts, response.data]); // Assuming response.data contains the newly created discount

            // Redirect to the admin-all-discounts page
            //history.push('/admin-all-discounts');
        } catch (error) {
            console.error('Registration failed: ', error);
            setErrorMessage("Failed to add discount. Please try again later.");
        }
    };

    return (
        <div className="add-category">
            <h2 className="add-category-title">Add Discount</h2>
            <form className="add-category-form" onSubmit={handleSubmit}>
                <div className="form-group-category">
                    {/* <label className="discount-label" htmlFor="add-percentage">Percent</label> */}
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

export default AddDiscount;
