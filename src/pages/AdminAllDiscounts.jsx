import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddDiscount from "./AddDiscount";

function AdminAllDiscounts() {
    const [discounts, setDiscounts] = useState([]);
    const [showAddDiscount, setShowAddDiscount] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/discount`);
                setDiscounts(response.data.$values.sort((a, b) => a.percentage - b.percentage));
                console.log("discounts: ", discounts);
            } catch (error) {
                console.error('Failed to fetch discounts: ', error);
            }
        }
        fetchDiscounts();
    }, [discounts]);

    const handleDeleteDiscount = async (discountId) => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            await axios.delete(`${apiUrl}/api/Discount/${discountId}`);
            setDiscounts(discounts.filter(discount => discount.pkDiscountId !== discountId));
            setDeleteSuccess(true); // Set delete success message
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage("Discount is in use and cannot be deleted.");
            } else {
                console.error('Failed to delete discount: ', error);
            }
        }
    };

    const formatDiscountValue = (discount) => {
        if (discount.percentage !== null) {
            const percentage = parseFloat(discount.percentage) * 100;
            return percentage % 1 === 0 ? `${percentage}%` : `${percentage.toFixed(2)}%`;
        }
        return '';
    };

    const updateDiscounts = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.get(`${apiUrl}/discount`);
            setDiscounts(response.data.$values.sort((a, b) => a.percentage - b.percentage));
        } catch (error) {
            console.error('Failed to fetch discounts: ', error);
        }
    };

    return (
        <div className="wrapper">
            <div className="admin">
                <Link to="/admin"><button>Back to Admin</button></Link>
                <div className="admin-category-container">
                    <h1>All Discounts</h1>
                    {/* Display delete success message */}
                    {deleteSuccess && <div className="success-message">Discount has been successfully deleted.</div>}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <button onClick={() => setShowAddDiscount(!showAddDiscount)}>Add Discount</button>
                    {showAddDiscount && (
                        <div className="admin-category-box">
                            <AddDiscount onDiscountAdded={updateDiscounts} />
                        </div>
                    )}
                    <div className="admin-all-categories">
                        {discounts.map((discount) => (
                            <div key={discount.pkDiscountId} className="admin-category">
                                <p>Discount Value: {formatDiscountValue(discount)}</p>
                                <button onClick={() => handleDeleteDiscount(discount.pkDiscountId)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAllDiscounts;
