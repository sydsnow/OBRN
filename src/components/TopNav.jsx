import '../scss/components/_topnav.scss';

function Topnav () {
    return (
        <div className="header-top-nav">
            <div className="header-socials">
                <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#"><i className="fa-brands fa-twitter"></i></a>
                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                <a href="#"><i className="fa-brands fa-youtube"></i></a>
            </div>
            <div className="header-contact">
                <p>PHONE: (+92) 3012699778</p>
                <p>EMAIL: OURBEAUTY@GMAIL.COM</p>
            </div>
        </div>
    )
}

export default Topnav;