import '../scss/components/_topnav.scss';

function Topnav () {
    return (
        <div className="header-top-nav">
            <div className="header-socials">
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-youtube"></i>
            </div>
            <div className="header-contact">
                <p>PHONE: (+92) 3012699778</p>
                <p>EMAIL: OURBEAUTY@GMAIL.COM</p>
            </div>
        </div>
    )
}

export default Topnav;