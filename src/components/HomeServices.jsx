import service1 from '../assets/men-haircut.jpg';
import service2 from '../assets/wellness.jpg';
function HomeServices() {
    return (
        <div className="home">
            <div className="wrapper">
                <div className="home-services-container">

                    <h2>Our Network</h2>
                    <div className="home-services">
                        <div className="home-services-copy">
                            <h3>Hair</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <button>View More</button>
                        </div>
                        <div className="home-services-img">
                            <img src={service1} alt="service 1"></img>
                        </div>
                    </div>
                    <div className="home-services">
                        <div className="home-services-copy">
                            <h3>Wellness</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <button>View More</button>

                        </div>
                        <div className="home-services-img">
                            <img src={service2} alt="service 2"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomeServices;