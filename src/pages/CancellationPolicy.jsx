import "../scss/pages/_termscondition.scss";
import React from "react";
import { Link } from "react-router-dom";

function CancellationPolicy() {
    return (
        <div className="terms-condition">
            <div className="testimonials-banner">
                <p className="testimonials-small">CANCELLATION POLICY</p>
                <p className="testimonials-large">Cancellation Policy</p>
                <div className="testimonials-path">
                    <i className="fa-solid fa-house"></i>
                    <Link to="/">HOME</Link> 
                    <i className="fa-solid fa-angle-right"></i>
                    <p>CANCELLATION POLICY</p>
                </div>
            </div>
            <div className="terms-condition-container">
                <div className="wrapper-info-content">
                    <p>
                        Our Beauty Referral Network Inc. stands behind every member of our community and is committed to authentic business practices. Our relationships inside our organization and partnerships are very valuable. We will not tolerate any Bullying, taking advantage of our affiliate community. We expect fair practices and treat our members with respect.  Independent affiliate customers and affiliate membership businesses are all independent businesses. Any grounds for termination of membership will be given a written warning and 15 days notice to make changes necessary before terminating their membership,                         
                    </p>
                    <p>
                        VIP Customer Cancellations- 30 day written notice to our office for any cancellation of your Free or VIP Customer Membership. Email  you user name, ID,  full name, phone, and Referral ID membership number.  Please include written consent to cancel the membership : info@ourbeautyreferralnetwork.com
                    </p>
                    <h3>BUSINESS MEMBERSHIPS</h3>
                    <p>
                        Any person in Canada who is 18 years of age or of legal age in their country may apply to become a Partner of Our Beauty Referral Network. Anyone under the legal age to contract must have the consent of his or her parent/guardian. Upon receipt of a signed application, emailed application or on-line application, Our Beauty Referral Network at its sole discretion, can accept or reject an application.
                    </p>
                    <p>
                        Once the application has been accepted, the person officially becomes an Independent Affiliate of Our Beauty referral Network and will be sent a Welcome Letter email containing login information and instructions as well as VISA will be shipped to the address on file at the time of registration.
                    </p>
                    <h2>Cancellation of Membership</h2>
                    <h3>CANCELLATION OF MEMBERSHIP (10 day Cooling Off Period)</h3>
                    <p>
                        Membership cancellations will be accepted provided that Our Beauty Referral Network office is advised of the cancellation in writing via a support ticket or email within the 10 Day cooling off period.  Once the 10 day cancellation cooling off period has ended no refunds are issued. 
                    </p>
                    <h3>Cancellation of Service booked</h3>
                    <p>
                        Customers must cancel 24 hours prior to the appointment booked. If an appointment is canceled the customer will have 30 days to rebook with that business before their credit expires. Customers will be issued a credit to be used within 30 days then will not be able to be used. There will be no extensions given or written warning.  No refunds are issued by Our Beauty Referral Network. 
                    </p>
                    <h3>Refunds on Services Completed </h3>
                        <p>
                        Contact the service provider for a refund. It is not Our Beauty Referral Networks responsibility. If a service is completed and the customer is not happy with the service it is up to the business and staff to make it right with the customer. Our Beauty Referral Network is not responsible for any liabilities or service being completed by the businesses. If the problem does not get resolved please email the details to Our Customer service staff at info@ourbeautyreferralnetwork.com . 
                        </p>
                    <div className="cancellation-policy-basic">
                        <h3>Basic Business Membership $249.99 ( Student Package) </h3>
                        <p>10 Day cooling off period.</p>
                        <h3>To cancel your subscription:</h3>
                        <p>
                            THERE WILL BE NO REFUND ISSUED AFTER THE 10 DAY COOLING OFF PERIOD.  
                        </p>
                        <p>
                        You must give a 30 day written notice to our office for any cancellation of your Free or VIP Customer Membership. Email  you user name, ID,  full name, phone, and Referral ID membership number.  Please include written consent to cancel the membership : info@ourbeautyreferralnetwork.com
                        </p>
                    </div>
                    <div className="cancellation-policy-vip">
                        <h3>VIP Business Membership $649.99 </h3>
                        <p>10 Day cooling off period.</p>
                        <h3>To cancel your subscription:</h3>
                        <p>
                            THERE WILL BE NO REFUND ISSUED AFTER THE 10 DAY COOLING OFF PERIOD.  
                        </p>
                        <p>
                            You must give a 30 day written notice to our office for any cancellation of your Free or VIP Customer Membership. Email  you user name, ID,  full name, phone, and Referral ID membership number.  Please include written consent to cancel the membership : info@ourbeautyreferralnetwork.com                    
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CancellationPolicy;