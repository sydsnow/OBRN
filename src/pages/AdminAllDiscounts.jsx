import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddDiscount from "./AddDiscount";

function AdminAllDiscounts() {

    const [discount, setDiscount] = useState([]);
    const [showAddDiscount, setShowAddDiscount] = useState(false);
    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/discount`);
                setDiscount(response.data.$values.sort((a, b) => a.percentage - b.percentage)); // Sort discounts by percentage
                //console.log(discount)
            } catch (error) {
                console.error('Failed to fetch discounts: ', error);
            }
        }
        fetchDiscounts();

        return () => {
            // Cleanup logic if needed
        };
    }, [discount]);

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
        if (discount.percentage !== null) {
            return `${(parseFloat(discount.percentage) * 100).toFixed(2)}%`;
        }
        return '';
    };

        // Function to update the list of categories
        const updateDiscounts = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/category`);
                setDiscount(response.data.$values);
            } catch (error) {
                console.error('Failed to fetch categories: ', error);
            }
        };


    return (
        <div className="wrapper">
            <div className="admin">
                <Link to="/admin"><button>Back to Admin</button></Link>
                <div className="admin-category-container">
                    <h1>All Discounts</h1>

                    {/* <Link to="/add-discount"><button>Add Discount</button></Link>
                    <AddDiscount /> */}

<button onClick={() => setShowAddDiscount(!showAddDiscount)}>Add Discount</button>
                    {showAddDiscount && (
                        <div className="admin-category-box">
                            <AddDiscount onDiscountAdded={updateDiscounts} />
                        </div>
                    )}
                    <div className="admin-all-categories">
                        {discount.map((discount) => (
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