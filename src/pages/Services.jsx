import "../scss/components/_services.scss";
import { useEffect, useState } from "react";
import ServiceGallery from "../components/ServiceGallery";
import axios from "axios";

function ServicesPage () {
    const [services, setServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState(""); // Default sorting option
    const [currentPage, setCurrentPage] = useState(1); // Current page of pagination
    const [servicesPerPage] = useState(12); // Number of services to display per page
   
    const sortingOptions = ["Price: High to Low", "Price: Low to High", "None"];

    const [displayedServices, setDisplayedServices] = useState([]); // State to manage displayed services   

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/services`);
                const fetchedServices = response.data.$values;
    
                // Fetch business information for each service
                const servicesWithBusiness = await Promise.all(
                    fetchedServices.map(async (service) => {
                        // Fetch business data for the service
                        const businessResponse = await axios.get(`${apiUrl}/api/Business/get-business/${service.fkBusinessId}`);
                        const businessData = businessResponse.data; // Assuming business data is returned in a certain format, adjust as needed
    
                        // Add the business data to the service object
                        return {
                            ...service,
                            business: businessData
                        };
                    })
                );
    
                setServices(servicesWithBusiness);
                setDisplayedServices(servicesWithBusiness.slice(0, servicesPerPage));
            } catch (error) {
                console.error('Failed to fetch services: ', error);
            }
        };
    
        fetchServices();
    }, [servicesPerPage]);
    
    // Filter services based on search query
    const filterServices = (searchQuery) => {
        return services.filter(service =>
            service.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.business.businessName.toLowerCase().includes(searchQuery.toLowerCase())
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
        const filteredServices = filterServices(searchQuery);
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
                const priceA = a.discountPrice ? a.basePrice * (1 - a.discountPrice / 100) : a.basePrice;
                const priceB = b.discountPrice ? b.basePrice * (1 - b.discountPrice / 100) : b.basePrice;
                return priceB - priceA;
            });
        } else if (selectedSortOption === "Price: Low to High") {
            sortedServices.sort((a, b) => {
                // Sort by discounted price if discount exists, otherwise use base price
                const priceA = a.discountPrice ? a.basePrice * (1 - a.discountPrice / 100) : a.basePrice;
                const priceB = b.discountPrice ? b.basePrice * (1 - b.discountPrice / 100) : b.basePrice;
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
    console.log("current", currentServices);
    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(displayedServices.length / servicesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="services">
            <div className="services-search-container">
                <div className="services-title">Search Businesses/Services</div>
                <div className="services-search">
                    <label htmlFor="services-search" id="search-label"><i className="fa-solid fa-magnifying-glass"></i></label>
                    <input 
                        name="search" 
                        id="services-search" 
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
                        <p>Showing {currentServices.length} of {displayedServices.length} Results</p> 
                    </div>
                    <div className="services-gallery-header-filter">
                        {/* Sorting dropdown */}
                        <div>
                            <label htmlFor="sorting-dropdown"></label>
                            <select
                                id="sorting-dropdown"
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
                    </div>
                </div>
                {currentServices && currentServices.length > 0 && (
                    <ServiceGallery displayedServices={currentServices}></ServiceGallery>
                )}
            </div>
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
