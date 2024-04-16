import "../scss/components/_services.scss"

function ServicesPage () {
    return (
        <div className="services">
            <div className="services-search-container">
                <div id="services-title">Search Services/Products</div>
                <div id="services-search-wrapper">
                    <label htmlFor="search"><i className="fa-solid fa-magnifying-glass"></i></label>
                    <input name="search" placeholder="Search Services & Products..."></input>
                    <button>Search</button>
                </div>
            </div>
            <div className="services-gallery-container">some images</div>
        </div>
    )
}

export default ServicesPage;