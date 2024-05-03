import "../scss/components/_services.scss";
import { useEffect, useState } from "react";
import axios from "axios";
// import hair from "../assets/hair.jpeg";
// import nails from "../assets/nails.jpeg";
// import facial from "../assets/facial.jpeg";
// import botox from "../assets/botox.jpeg";
import ServiceGallery from "../components/ServiceGallery";


function ServicesPage () {

    const [services, setServices] = useState([]);

    useEffect (() => {
        const fetchServices = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/services`); 
                setServices(response.data.$values);
            } catch (error) {
                console.error('Failed to fetch services:', error);
            }
        }
        fetchServices();
    }, []);
    
    // Define your sorting options
    const sortingOptions = ["Newest", "Oldest", "Price: High to Low", "Price: Low to High"];

    // State to manage the selected sorting option
    const [selectedOption, setSelectedOption] = useState(sortingOptions[0]);

    // Handler for sorting dropdown change
    const handleSortingChange = (e) => {
        setSelectedOption(e.target.value);
        // Perform sorting logic based on the selected sorting option
        // For example:
        // if (e.target.value === "Latest") { ... }
        // else if (e.target.value === "Oldest") { ... }
    };

    // const services = [
    //     {
    //         id: 1,
    //         service: "Nails",
    //         price: 80,
    //         image: nails,
    //         discount: 10
    //     },
    //     {
    //         id: 2, 
    //         service: "Hair",
    //         price: 120,
    //         image: hair,
    //         //discount: 25
    //     },
    //     {
    //         id: 3,
    //         service: "Botox",
    //         price: 12,
    //         image: botox,
    //         discount: 15,
    //     },
    //     {
    //         id: 4,
    //         service: "Facial",
    //         price: 300,
    //         image: facial,
    //         discount: 50
    //     }
    // ]

    return (
        <div className="services">
            <div className="services-search-container">
                <div className="services-title">Search Services/Products</div>
                <div className="services-search-wrapper">
                    <label htmlFor="search" id="search-label"><i className="fa-solid fa-magnifying-glass"></i></label>
                    <input name="search" id="search" placeholder="Search Services & Products..."></input>
                    <button>Search</button>
                </div>
            </div>
            <div className="services-gallery-container">
                <div className="services-gallery-header">
                    <div className="services-gallery-header-results">
                        {/* This will need to be dynamic */}
                        <p>Showing 12-60 Results</p> 
                    </div>
                    <div className="services-gallery-header-filter">
                        <p>Sort By</p>
                        {/* Sorting dropdown */}
                        <div>
                            <select
                                value={selectedOption}
                                onChange={handleSortingChange}
                                className="sorting-dropdown"
                                >
                                {sortingOptions.map((option) => (
                                    <option key={option} value={option}>
                                    {option}
                                    </option>
                                ))}
                            </select> 
                        </div>
                   
                    {/* <i className="fa-solid fa-list"></i> */}
                    </div>
                </div>
                <ServiceGallery services={services}></ServiceGallery>
            </div>
        </div>
    )
}

export default ServicesPage;