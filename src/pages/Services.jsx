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
    const [currentPage, setCurrentPage] = useState(1); // Current page of pagination
    const [servicesPerPage] = useState(12); // Number of services to display per page
   

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
        },
        // Additional services
        {
            id: 5,
            service: "Massage",
            price: 90,
            image: hair,
            discount: 20,
            businessName: "Massage Spa"
        },
        {
            id: 6,
            service: "Pedicure",
            price: 60,
            image: nails,
            businessName: "Pedicure Salon"
        },
        {
            id: 7,
            service: "Manicure",
            price: 50,
            image: nails,
            discount: 10,
            businessName: "Manicure Salon"
        },
        {
            id: 8,
            service: "Hair Coloring",
            price: 150,
            image: hair,
            businessName: "Hair Color Salon"
        },
        {
            id: 9,
            service: "Waxing",
            price: 40,
            image: facial,
            businessName: "Waxing Studio"
        },
        {
            id: 10,
            service: "Eyebrow Threading",
            price: 20,
            image: facial,
            businessName: "Eyebrow Threading Salon"
        },
        {
            id: 11,
            service: "Eyelash Extensions",
            price: 200,
            image: facial,
            discount: 30,
            businessName: "Eyelash Studio"
        },
        {
            id: 12,
            service: "Permanent Makeup",
            price: 180,
            image: facial,
            businessName: "Permanent Makeup Studio"
        },
        {
            id: 13,
            service: "Teeth Whitening",
            price: 100,
            image: botox,
            businessName: "Teeth Whitening Clinic"
        },
        {
            id: 14,
            service: "Tattoo Removal",
            price: 250,
            image: botox,
            discount: 20,
            businessName: "Tattoo Removal Clinic"
        }
    ];
    const [displayedServices, setDisplayedServices] = useState(services); // State to manage displayed services   

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
            sortedServices.sort((a, b) => {
                // Sort by discounted price if discount exists, otherwise use base price
                const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
                const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
                return priceB - priceA;
            });
        } else if (selectedSortOption === "Price: Low to High") {
            sortedServices.sort((a, b) => {
                // Sort by discounted price if discount exists, otherwise use base price
                const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
                const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
                return priceA - priceB;
            });
        }

        setDisplayedServices(sortedServices); // Update the displayedServices state with the sorted array
    };

    // Handler for going back to the first page
    const handleGoToFirstPage = () => {
        setCurrentPage(1);
    };

    const handleGoToLastPage = () => { 
        setCurrentPage(Math.ceil(displayedServices.length / servicesPerPage)); 
    };
    
    // Pagination logic
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = displayedServices.slice(indexOfFirstService, indexOfLastService);
    //setDisplayedServices(currentServices);
    //console.log("displayed", displayedServices);
    //console.log("current", currentServices);
    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(displayedServices.length / servicesPerPage); i++) {
        pageNumbers.push(i);
    }

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
                        <p>Showing {currentServices.length} of {displayedServices.length} Results</p> 
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
                {currentServices && (
                    <ServiceGallery displayedServices={currentServices}></ServiceGallery>
                )}
            </div>
            {/* Pagination */}
            {/* <div className="pagination">
            {displayedServices.length > servicesPerPage && (
        <button onClick={handleGoToFirstPage}>Go to First Page</button>
    )}
                {displayedServices.length > servicesPerPage && (
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                )}
                {displayedServices.length > servicesPerPage && (
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastService >= displayedServices.length}>
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                )}
            </div> */}
            <div className="pagination">
                <button onClick={handleGoToFirstPage} disabled={currentPage === 1}>
                    <i className="fa-solid fa-backward"></i>
                </button>
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => setCurrentPage(number)} className={currentPage === number ? 'active' : ''}>
                        {number}
                    </button>
                ))}
                <button onClick={handleGoToLastPage} disabled={currentPage === Math.ceil(displayedServices.length / servicesPerPage)}>
                    <i className="fa-solid fa-forward"></i>
                </button>
            </div>
        </div>
    )
}

export default ServicesPage;
