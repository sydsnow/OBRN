import "../scss/components/_nav.scss";

function Nav () {
    return (
        <nav className="header-main-nav">
            <div className="header-logo">
                <img src="../assets/obrn-logo.png" alt="obrn logo" ></img>
            </div>
            <div className="header-nav-links">
                <ul>
                    <li><a href="#">HOME</a></li>
                    <li><a href="#">SERVICES</a></li>
                    <li><a href="#">SHOP</a></li>
                    <li><a href="#">COMMUNITY <i className="fa-solid fa-angle-down"></i></a></li>
                    <li><a href="#">BLOG</a></li>
                    <li><a href="#">JOB</a></li>
                    <li><a href="#">CONTACT US</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;