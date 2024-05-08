import '../scss/components/_topnav.scss';

function Topnav () {
    return (
        <div className="header-top-nav">
            <div className="header-socials">
                <a href="https://www.facebook.com/groups/ourbeautysquad/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-facebook-f"></i>
                </a>
                {/* <a href="#" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-twitter"></i>
                    </a> */}
                <a href="https://www.instagram.com/ourbeautyreferralnetwork/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="https://www.youtube.com/channel/UCMqN-gGlNvFDJ0UwExwiirQ" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-youtube"></i>
                </a>
            </div>
            <div className="header-contact">
                <p>PHONE: 604-902-5234</p>
                <p>EMAIL: OURBEAUTY@GMAIL.COM</p>
            </div>
        </div>
    )
}

export default Topnav;
