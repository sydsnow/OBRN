import "../scss/components/_services.scss";
import { useState } from "react";
import hair from "../assets/hair.jpeg";
import nails from "../assets/nails.jpeg";
import facial from "../assets/facial.jpeg";
import botox from "../assets/botox.jpeg";


function ServicesPage () {
    
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

    const services = [
        {
            id: 1,
            service: "Nails",
            price: 80,
            image: nails
        },
        {
            id: 2, 
            service: "Hair",
            price: 120,
            image: hair
        },
        {
            id: 3,
            service: "Botox",
            price: 12,
            image: botox
        },
        {
            id: 4,
            service: "Facial",
            price: 300,
            image: facial
        }
    ]

    return (
        <div className="services">
            <div className="services-search-container">
                <div id="services-title">Search Services/Products</div>
                <div id="services-search-wrapper">
                    <label htmlFor="search" id="search"><i className="fa-solid fa-magnifying-glass"></i></label>
                    <input name="search" placeholder="Search Services & Products..."></input>
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
                    {/* <i className="fa-solid fa-list"></i> */}
                    </div>
                </div>
                <div className="services-gallery-content">
                    {services.map((service) => (
                        <div className="services-card" key={service.id}>
                            <div className="services-card-image-container">
                                <img src={service.image}alt="Service Image" className="services-card-image" />
                            </div>
                            <div className="services-card-info">
                                <p className="services-card-info-name">{service.service}</p>
                                <p className="services-card-info-price">${service.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ServicesPage;