import React from "react";
import { Link } from "react-router-dom";

function PrivacyStatement() {
    return (
        <div className="privacy-statement">
            <div className="testimonials-banner">
                <p className="testimonials-small">PRIVACY STATEMENT</p>
                <p className="testimonials-large">Privacy Statement</p>
                <div className="testimonials-path">
                    <i className="fa-solid fa-house"></i>
                    <Link to="/">HOME</Link> 
                    <i className="fa-solid fa-angle-right"></i>
                    <p>PRIVACY STATEMENT</p>
                </div>
            </div>
            <div className="privacy-statement-container">
                <div className="wrapper-info-content">
                    <h3>Privacy Policy</h3>
                    <p>
                        When you purchase anything from our website, as part of the buying and selling process,
                        we collect the personal information you give us such as your name, address and email address.
                        When you browse our website, we also automatically receive your computer’s internet protocol
                        (IP) address in order to provide us with information that helps us learn about your browser
                        and operating system.
                    </p>
                    <h3>Email marketing</h3>
                    <p>
                        With your permission, we may send you emails, when applicable about our company, new products
                        and other updates and you may request to unsubscribe at any time.
                    </p>
                    <h3>Consent</h3>
                    <p>
                        How do we receive your consent? When you provide us with personal information to complete a
                        transaction, verify your credit card, place an order, arrange for a delivery or return a purchase,
                        we infer that you consent to our collecting it and using it for that specific reason only.
                        If we ask for your personal information for a secondary reason, like marketing, we will either
                        ask you directly for your expressed consent, or provide you with an opportunity to say no.
                    </p>
                    <h3>Security</h3>
                    <p>
                        To protect your personal information, we take reasonable precautions and follow industry best
                        practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
                        If you provide us with your credit card information, the information is encrypted using secure
                        socket layer technology (SSL) and stored with 2FA encryption with our trusted merchant providers.
                        Our Beauty Referral Network does not keep or Store your credit card information.
                        Although no method of transmission over the Internet or electronic storage is 100% secure, we
                        follow all PCI-DSS requirements and implement additional generally accepted industry standards.
                    </p>
                    <h3>Age</h3>
                    <p>
                        We require all members of our organization to be above the legal age of 18 years old.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PrivacyStatement;
