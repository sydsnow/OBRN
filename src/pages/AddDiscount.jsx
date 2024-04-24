// import { useState } from "react";
// import axios from "axios";
// import { NavLink } from "react-router-dom";


// function AddDiscount() {

//     const [discount, setDiscount] = useState({
//         amount: '',
//         percent: '',
//         startDate: '',
//         endDate: '',
//     });

//     const handleChange = (e) => {
//         setDiscount({ ...discount, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("discount: ", discount);

//         try {
//             const apiUrl = import.meta.env.VITE_API_BASE_URL;
//             const response = await axios.post(`${apiUrl}/api/Discount/create`, discount);
//             console.log("response: ", response);
//             const { message, token } = response.data;
//             console.log(message);
//             localStorage.setItem('token', token);
//             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         } catch (error) {
//             console.error('Registration failed: ', error);
//         }
//     };

//     return (
//         <div className="add-discount">
//             <h2 className="add-discount-title">Add Discount</h2>
//             <h5>Choose an Amount or a Percent</h5>
//             <form className="add-discount-form" onSubmit={handleSubmit}>
                // <div className="form-group-discount">
                //     <label className="discount-label" htmlFor="add-amount">Amount</label>
                //     <input 
                //         className="input" 
                //         type="number" 
                //         id="add-amount" 
                //         required autoComplete="off" 
                //         name="amount"
                //         placeholder="Discount Amount"
                //         min="0"
                //         value={discount.amount}
                //         onChange={handleChange}>
                //     </input>
                // </div>
                // <div className="form-group-discount">
                //     <label className="discount-label" htmlFor="add-percent">Percent</label>
                //     <input 
                //         className="input" 
                //         type="number" 
                //         id="add-percent" 
                //         required autoComplete="off" 
                //         name="percent" 
                //         placeholder="Discount Percent"
                //         min="0"
                //         value={discount.percent}
                //         onChange={handleChange}>
                //     </input>
                // </div>
//                 <div className="form-group-discount">
//                     <label className="discount-label" htmlFor="start-date">Start Date</label>
//                     <input 
//                         className="input" 
//                         type="date" 
//                         id="start-date" 
//                         required autoComplete="off" 
//                         name="startDate" 
//                         value={discount.startDate}
//                         onChange={handleChange}>
//                     </input>
//                 </div>
//                 <div className="form-group-discount">
//                     <label className="discount-label" htmlFor="end-date">End Date</label>
//                     <input 
//                         className="input" 
//                         type="date" 
//                         id="endDate" 
//                         required autoComplete="off" 
//                         name="discountEndDate" 
//                         value={discount.endDate}
//                         onChange={handleChange}>
//                     </input>
//                 </div>
//                 <div className="button-container">
//                     <button><NavLink to="/admin-all-discounts">Cancel</NavLink></button>
//                     <button type="submit">Save</button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default AddDiscount; 
import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../scss/components/_adddiscount.scss";

function AddDiscount() {
    const [discount, setDiscount] = useState({
        discountType: '', // To store the type of discount (percent or amount)
        percent: '', // To store the percent discount value
        amount: '', // To store the fixed amount discount value
        startDate: '',
        endDate: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDiscount({ ...discount, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("discount: ", discount);

        // Check if end date is before start date
        if (new Date(discount.endDate) < new Date(discount.startDate)) {
            console.error("End date cannot be before start date");
            return; // Prevent submission if validation fails
        }

        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            const formattedDiscountValue = discount.discountType === 'percent' ? parseFloat(discount.percent) / 100 : parseFloat(discount.amount);
            const response = await axios.post(`${apiUrl}/api/Discount/create`, { ...discount, discountValue: formattedDiscountValue });
            console.log("response: ", response);
            const { message, token } = response.data;
            console.log(message);
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            console.error('Registration failed: ', error);
        }
    };

    return (
        <div className="add-discount">
            <h2 className="add-discount-title">Add Discount</h2>
            <form className="add-discount-form" onSubmit={handleSubmit}>
                <div className="form-group-discount">
                    <label className="discount-label" htmlFor="discount-type">Discount Type</label>
                    <select 
                        className="input" 
                        id="discount-type" 
                        name="discountType"
                        value={discount.discountType}
                        onChange={handleChange}
                    >
                        <option value="">Select Discount Type</option>
                        <option value="percent">Percentage</option>
                        <option value="amount">Amount</option>
                    </select>
                </div>
                {discount.discountType === 'percent' && (
                    <div className="form-group-discount">
                        <label className="discount-label" htmlFor="percent">Percentage</label>
                        <input 
                            className="input" 
                            type="number" 
                            id="percent" 
                            required 
                            autoComplete="off" 
                            name="percent" 
                            placeholder="Discount Percentage"
                            min="0"
                            max="100"
                            value={discount.percent}
                            onChange={handleChange}
                        />
                    </div>
                )}
                {discount.discountType === 'amount' && (
                    <div className="form-group-discount">
                        <label className="discount-label" htmlFor="amount">Amount</label>
                        <input 
                            className="input" 
                            type="number" 
                            id="amount" 
                            required 
                            autoComplete="off" 
                            name="amount" 
                            placeholder="Discount Amount"
                            min="0"
                            value={discount.amount}
                            onChange={handleChange}
                        />
                    </div>
                )}
                <div className="form-group-discount">
                    <label className="discount-label" htmlFor="start-date">Start Date</label>
                    <input 
                        className="input" 
                        type="date" 
                        id="start-date" 
                        required autoComplete="off" 
                        name="startDate" 
                        value={discount.startDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group-discount">
                    <label className="discount-label" htmlFor="end-date">End Date</label>
                    <input 
                        className="input" 
                        type="date" 
                        id="end-date" 
                        required autoComplete="off" 
                        name="endDate" 
                        value={discount.endDate}
                        onChange={handleChange}
                    />
                </div>
                <div className="button-container">
                    <button><NavLink to="/admin-all-discounts">Cancel</NavLink></button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddDiscount;
