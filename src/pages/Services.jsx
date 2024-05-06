import "../scss/components/_services.scss";
import { useState } from "react";
import hair from "../assets/hair.jpeg";
import nails from "../assets/nails.jpeg";
import facial from "../assets/facial.jpeg";
import botox from "../assets/botox.jpeg";
import ServiceGallery from "../components/ServiceGallery";


function ServicesPage () {

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState(""); // Default sorting option
    const [displayedServices, setDisplayedServices] = useState([]); // State to manage displayed services

    const sortingOptions = ["Price: High to Low", "Price: Low to High", "None"];

    const services = [
        {
            id: 1,
            service: "Nails",
            price: 80,
            image: nails,
            discount: 10,
            businessName: "Nail Salon",
        },
        {
            id: 2,
            service: "Hair",
            price: 120,
            image: hair,
            businessName: "Hair Salon",
            //discount: 25
        },
        {
            id: 3,
            service: "Botox",
            price: 12,
            image: botox,
            discount: 15,
            businessName: "Botox Clinic"
        },
        {
            id: 4,
            service: "Facial",
            price: 300,
            image: facial,
            discount: 50,
            businessName: "Facial Spa"
        }
    ];

    // Initialize displayed services with the services array
    useState(() => {
        setDisplayedServices(services);
    }, []);

    // Filter services based on search query
    const filterServices = (query) => {
        return services.filter(service =>
            service.service.toLowerCase().includes(query.toLowerCase()) ||
            service.businessName.toLowerCase().includes(query.toLowerCase())
        );
    };

    // Handle clear search
    const handleClearSearch = () => {
        setSearchQuery('');
        setDisplayedServices(services); // Reset displayed services to all services
    };

    // Handle search input change
    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filteredServices = filterServices(query);
        setDisplayedServices(filteredServices);
    };

    // Handler for sorting dropdown change
    const handleSortingChange = (e) => {
        const selectedSortOption = e.target.value;
        
        if (selectedSortOption === "None") {
            // Reset displayed services to the original list
            setDisplayedServices(services);
            // Reset the selected option to empty string
            setSelectedOption("");
            return;
        }
        setSelectedOption(selectedSortOption);

        let sortedServices = [...displayedServices]; // Create a copy of displayedServices

        // Perform sorting logic based on the selected sorting option
        if (selectedSortOption === "Price: High to Low") {
            sortedServices.sort((a, b) => b.price - a.price);
        } else if (selectedSortOption === "Price: Low to High") {
            sortedServices.sort((a, b) => a.price - b.price);
        }

        setDisplayedServices(sortedServices); // Update the displayedServices state with the sorted array
    };


    return (
        <div className="services">
            <div className="services-search-container">
                <div className="services-title">Search Businesses/Services</div>
                <div className="services-search">
                    <label htmlFor="search" id="search-label"><i className="fa-solid fa-magnifying-glass"></i></label>
                    <input 
                        name="search" 
                        id="search" 
                        placeholder="Search Businesses and Services..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        >
                    </input>
                    {searchQuery && <button onClick={handleClearSearch} className="services-search-cancel-button">x</button>}
                    <button className="services-search-button">Search</button>
                </div>
            </div>
            <div className="services-gallery-container">
                <div className="services-gallery-header">
                    <div className="services-gallery-header-results">
                        {/* This will need to be dynamic */}
                        <p>Showing {displayedServices.length} Results</p> 
                    </div>
                    <div className="services-gallery-header-filter">
                        {/* <p>Sort By</p> */}
                        {/* Sorting dropdown */}
                        <div>
                            <select
                                value={selectedOption}
                                onChange={handleSortingChange}
                                className="sorting-dropdown"
                                >
                                <option value="" disabled hidden>
                                    Sort By
                                </option>
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
                <ServiceGallery displayedServices={displayedServices}></ServiceGallery>
            </div>
        </div>
    )
}

export default ServicesPage;