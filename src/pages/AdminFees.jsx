import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function AdminFees() {
    const [fees, setFees] = useState([]);
    // const [showAddFees, setShowAddFees] = useState(false); // State to control visibility

    useEffect(() => {
        const fetchFees = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/fee`);
                setFees(response.data);
            } catch (error) {
                console.error('Failed to fetch categories: ', error);
            }
        }
        fetchFees();
    }, []);

    const handleDeleteCategory = async (feeId) => {
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            await axios.delete(`${apiUrl}/fee/${feeId}`);
            setFees(fees.filter(fees => fees.pkFeeId !== feeId));
        } catch (error) {
            console.error('Failed to delete fee/commission: ', error);
        }
    };

    return (
        <div className="wrapper">
            <div className="admin">
                <Link to="/admin"><button>Back to Admin</button></Link>
                <div className="admin-fees-container">
                    <h1>Fees & Commissions</h1>
                    {/* <button onClick={() => setShowAddFees(!showAddFees)}>Add Fees</button>
                    {showAddFees && (
                        <div className="admin-category-box">
                            <AddCategory />
                        </div>
                    )} */}
                    <div className="admin-all-fees">
                        {fees.map((fees) => (
                            <div key={fees.pkFeeId} className="admin-fees">
                                <h3>{fees.description}</h3>
                                <div className="admin-fees-btns">
                                <button>Edit</button>
                                <button onClick={() => handleDeleteCategory(fees.pkFeeId)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminFees;
