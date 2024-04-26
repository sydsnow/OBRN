import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminAllDiscounts() {

    const [discount, setDiscount] = useState([]);

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/api/Discount/discount`);
                setDiscount(response.data); // Assuming response.data is an array of discounts 
            } catch (error) {
                console.error('Failed to fetch discounts: ', error);
            }
        }
        fetchDiscounts();

        return () => {
            // Cleanup logic if needed
        };
    }, []);

    // Function to handle deletion of a discount
    const handleDeleteDiscount = async (discountId) => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            await axios.delete(`${apiUrl}/api/Discount/${discountId}`);
            // Update local state after successful deletion
            setDiscount(discount.filter(discount => discount.id !== discountId));
        } catch (error) {
            console.error('Failed to delete discount: ', error);
        }
    };

     // Function to format discount value
     const formatDiscountValue = (discount) => {
        if (discount.amount !== null) {
            return `$${parseFloat(discount.amount).toFixed(2)}`;
        } else if (discount.percent !== null) {
            return `${(parseFloat(discount.percent) * 100).toFixed(2)}%`;
        }
        return '';
    };

    return (
        <div className="wrapper">
            <div className="admin">
                <Link to="/admin"><button>Back to Admin</button></Link>
                <Link to="/add-discount"><button>Add Discount</button></Link>
                <div className="admin-all-container">
                    <h2>All Discounts</h2>
                    <div className="admin-all-discounts">
                        {discount.map((discount) => (
                            <div key={discount.pkDiscountId} className="admin-discount">
                                <p>Discount Value: {formatDiscountValue(discount)}</p>
                                <button onClick={() => handleDeleteDiscount(discount.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAllDiscounts;