import { Link } from 'react-router-dom';

function HomeBanner() {
    return (
        <div className="home">
        <div className="home-banner">
            <div className="home-banner-container">
            <div className="home-banner-copy">
            <h1>The World&apos;s Largest Online Referral Network</h1>
            <p>World&apos;s No.1 Referral Portal</p>
            </div>
            <div className="home-btns">
            <Link to="/registerbusiness">
    <button className="home-btn">Join as a Business</button>
</Link>
<Link to="/registercustomer">
    <button className="home-btn">Join as a Customer</button>
</Link>
            </div>
            </div>
        </div>
        </div>
    );
}
export default HomeBanner;