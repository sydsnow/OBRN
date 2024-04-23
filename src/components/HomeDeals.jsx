import Countdown from "./Countdown";

function HomeDeals() {
    return (
        <div className="home">
        <div className="home-deals">
            <div className="home-deals-container">
            <div className="home-deals-copy">
            <h3>Deals of the Week</h3>
            <h3>Get Up to 60% Off</h3>
            <p>Get up to 60% off on all services. Limited time offer. Hurry up!</p>

            <div className="home-countdown">
            <Countdown end="2024-05-22" />
            </div>
            <button>Shop Now</button>
            </div>
            <div className="home-deals-img">
            <img src="https://via.placeholder.com/400x300" alt="deal"></img>
            </div>
            </div>
        </div>
        </div>
    );
}
export default HomeDeals;