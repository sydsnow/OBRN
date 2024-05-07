// import { useState, useEffect } from "react";
// import axios from "axios";
// import { NavLink } from "react-router-dom";

// function AddDiscount() {
//     const [discount, setDiscount] = useState({
//         percentage: '',
//         pkDiscountId: '',
//     });
//     const [errorMessage, setErrorMessage] = useState('');

//     useEffect(() => {
//         // trying to hard code the pkdiscountid to see if it works
//         setDiscount(prevState => ({ ...prevState, pkDiscountId: "DIS21" }));
//     }, []); 

//     const handleChange = (e) => {
//         setDiscount({ ...discount, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validate discount percent
//         if (isNaN(discount.percentage) || discount.percentage < 0 || discount.percentage > 100) {
//             setErrorMessage("Discount percent must be a number between 0 and 100.");
//             return;
//         }

//         try {
//             const apiUrl = import.meta.env.VITE_API_BASE_URL;
//             // Convert percentage to decimal
//             const decimalPercentage = parseFloat(discount.percentage) / 100; // Convert to decimal
//             const dataToSend = { ...discount, percentage: decimalPercentage }; // Update the percentage value
//             console.log("discount: ", dataToSend);
//             //console.log("discount: ", discount);
//             const response = await axios.post(`${apiUrl}/discount/create`, dataToSend);
//             console.log("response: ", response);
//             const { message, token } = response.data;
//             console.log(message);
//             localStorage.setItem('token', token);
//             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         } catch (error) {
//             console.error('Registration failed: ', error);
//             setErrorMessage("Failed to add discount. Please try again later.");
//         }
//     };

//     return (
//         <div className="add-discount">
//             <h2 className="add-discount-title">Add Discount</h2>
//             <form className="add-discount-form" onSubmit={handleSubmit}>
//                 <div className="form-group-discount">
//                     <label className="discount-label" htmlFor="add-percentage">Percent</label>
//                     <input 
//                         className="input" 
//                         type="number" 
//                         id="add-percentage" 
//                         required 
//                         autoComplete="off" 
//                         name="percentage" 
//                         placeholder="Discount Percent"
//                         min="0"
//                         max="100"
//                         value={discount.percentage}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="button-container">
//                     <button><NavLink to="/admin-all-discounts">Cancel</NavLink></button>
//                     <button type="submit">Save</button>
//                 </div>
//                 {errorMessage && <p className="error-message">{errorMessage}</p>}
//             </form>
//         </div>
//     )
// }

// export default AddDiscount;

// // import { useState } from "react";
// // import axios from "axios";
// // import { NavLink } from "react-router-dom";


// // function AddDiscount() {

// //     const [discount, setDiscount] = useState({
// //         amount: '',
// //         percent: '',
// //         startDate: '',
// //         endDate: '',
// //     });

// //     const handleChange = (e) => {
// //         setDiscount({ ...discount, [e.target.name]: e.target.value });
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         console.log("discount: ", discount);

// //         // Convert percent to decimal
// //         const decimalPercent = parseFloat(discount.percent) / 100;

// //         try {
// //             const apiUrl = import.meta.env.VITE_API_BASE_URL;
// //             const response = await axios.post(`${apiUrl}/api/Discount/create`, { ...discount, percent: decimalPercent });
// //             console.log("response: ", response);
// //             const { message, token } = response.data;
// //             console.log(message);
// //             localStorage.setItem('token', token);
// //             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// //         } catch (error) {
// //             console.error('Registration failed: ', error);
// //         }
// //     };

// //     return (
// //         <div className="add-discount">
// //             <h2 className="add-discount-title">Add Discount</h2>
// //             {/* <h5>Choose an Amount or a Percent</h5> */}
// //             <form className="add-discount-form" onSubmit={handleSubmit}>
// //                 {/* <div className="form-group-discount">
// //                     <label className="discount-label" htmlFor="add-amount">Amount</label>
// //                     <input 
// //                         className="input" 
// //                         type="number" 
// //                         id="add-amount" 
// //                         required autoComplete="off" 
// //                         name="amount"
// //                         placeholder="Discount Amount"
// //                         min="0"
// //                         value={discount.amount}
// //                         onChange={handleChange}>
// //                     </input>
// //                 </div> */}
// //                 <div className="form-group-discount">
// //                     <label className="discount-label" htmlFor="add-percent">Percent</label>
// //                     <input 
// //                         className="input" 
// //                         type="number" 
// //                         id="add-percent" 
// //                         required autoComplete="off" 
// //                         name="percent" 
// //                         placeholder="Discount Percent"
// //                         min="0"
// //                         max="100"
// //                         value={discount.percent}
// //                         onChange={handleChange}>
// //                     </input>
// //                 </div>
// //                 {/* <div className="form-group-discount">
// //                     <label className="discount-label" htmlFor="start-date">Start Date</label>
// //                     <input 
// //                         className="input" 
// //                         type="date" 
// //                         id="start-date" 
// //                         required autoComplete="off" 
// //                         name="startDate" 
// //                         value={discount.startDate}
// //                         onChange={handleChange}>
// //                     </input>
// //                 </div>
// //                 <div className="form-group-discount">
// //                     <label className="discount-label" htmlFor="end-date">End Date</label>
// //                     <input 
// //                         className="input" 
// //                         type="date" 
// //                         id="endDate" 
// //                         required autoComplete="off" 
// //                         name="discountEndDate" 
// //                         value={discount.endDate}
// //                         onChange={handleChange}>
// //                     </input>
// //                 </div> */}
// //                 <div className="button-container">
// //                     <button><NavLink to="/admin-all-discounts">Cancel</NavLink></button>
// //                     <button type="submit">Save</button>
// //                 </div>
// //             </form>
// //         </div>
// //     )
// // }

// // export default AddDiscount; 
// // import { useState } from "react";
// // import axios from "axios";
// // import { NavLink } from "react-router-dom";
// // import "../scss/components/_adddiscount.scss";

// // function AddDiscount() {
// //     const [discount, setDiscount] = useState({
// //         discountType: '', // To store the type of discount (percent or amount)
// //         percent: '', // To store the percent discount value
// //         amount: '', // To store the fixed amount discount value
// //         startDate: '',
// //         endDate: '',
// //     });

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setDiscount({ ...discount, [name]: value });
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         console.log("discount: ", discount);

// //         // Check if end date is before start date
// //         if (new Date(discount.endDate) < new Date(discount.startDate)) {
// //             console.error("End date cannot be before start date");
// //             return; // Prevent submission if validation fails
// //         }

// //         try {
// //             const apiUrl = import.meta.env.VITE_API_BASE_URL;
// //             const formattedDiscountValue = discount.discountType === 'percent' ? parseFloat(discount.percent) / 100 : parseFloat(discount.amount);
// //             const response = await axios.post(`${apiUrl}/api/Discount/create`, { ...discount, discountValue: formattedDiscountValue });
// //             console.log("response: ", response);
// //             const { message, token } = response.data;
// //             console.log(message);
// //             localStorage.setItem('token', token);
// //             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// //         } catch (error) {
// //             console.error('Registration failed: ', error);
// //         }
// //     };

// //     return (
// //         <div className="add-discount">
// //             <h2 className="add-discount-title">Add Discount</h2>
// //             <form className="add-discount-form" onSubmit={handleSubmit}>
// //                 <div className="form-group-discount">
// //                     <label className="discount-label" htmlFor="discount-type">Discount Type</label>
// //                     <select 
// //                         className="input" 
// //                         id="discount-type" 
// //                         name="discountType"
// //                         value={discount.discountType}
// //                         onChange={handleChange}
// //                     >
// //                         <option value="">Select Discount Type</option>
// //                         <option value="percent">Percentage</option>
// //                         <option value="amount">Amount</option>
// //                     </select>
// //                 </div>
// //                 {discount.discountType === 'percent' && (
// //                     <div className="form-group-discount">
// //                         <label className="discount-label" htmlFor="percent">Percentage</label>
// //                         <input 
// //                             className="input" 
// //                             type="number" 
// //                             id="percent" 
// //                             required 
// //                             autoComplete="off" 
// //                             name="percent" 
// //                             placeholder="Discount Percentage"
// //                             min="0"
// //                             max="100"
// //                             value={discount.percent}
// //                             onChange={handleChange}
// //                         />
// //                     </div>
// //                 )}
// //                 {discount.discountType === 'amount' && (
// //                     <div className="form-group-discount">
// //                         <label className="discount-label" htmlFor="amount">Amount</label>
// //                         <input 
// //                             className="input" 
// //                             type="number" 
// //                             id="amount" 
// //                             required 
// //                             autoComplete="off" 
// //                             name="amount" 
// //                             placeholder="Discount Amount"
// //                             min="0"
// //                             value={discount.amount}
// //                             onChange={handleChange}
// //                         />
// //                     </div>
// //                 )}
// //                 {/* <div className="form-group-discount">
// //                     <label className="discount-label" htmlFor="start-date">Start Date</label>
// //                     <input 
// //                         className="input" 
// //                         type="date" 
// //                         id="start-date" 
// //                         required autoComplete="off" 
// //                         name="startDate" 
// //                         value={discount.startDate}
// //                         onChange={handleChange}
// //                     />
// //                 </div>
// //                 <div className="form-group-discount">
// //                     <label className="discount-label" htmlFor="end-date">End Date</label>
// //                     <input 
// //                         className="input" 
// //                         type="date" 
// //                         id="end-date" 
// //                         required autoComplete="off" 
// //                         name="endDate" 
// //                         value={discount.endDate}
// //                         onChange={handleChange}
// //                     />
// //                 </div> */}
// //                 <div className="button-container">
// //                     <button><NavLink to="/admin-all-discounts">Cancel</NavLink></button>
// //                     <button type="submit">Save</button>
// //                 </div>
// //             </form>
// //         </div>
// //     )
// // }

// // export default AddDiscount;

import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
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
        <div className="add-discount">
            <h2 className="add-discount-title">Add Discount</h2>
            <form className="add-discount-form" onSubmit={handleSubmit}>
                <div className="form-group-discount">
                    <label className="discount-label" htmlFor="add-percentage">Percent</label>
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
                    <button><NavLink to="/admin-all-discounts">Cancel</NavLink></button>
                    <button type="submit">Save</button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    )
}

export default AddDiscount;
