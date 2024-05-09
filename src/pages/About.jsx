import React from 'react';
import { Link } from 'react-router-dom';

function About() {
    return (
        <div className="about">
                <div className="testimonials-banner">
                    <p className="testimonials-small">ABOUT US</p>
                    <p className="testimonials-large">About Us</p>
                <div className="testimonials-path">
                    <i className="fa-solid fa-house"></i>
                    <Link to="/">HOME</Link> 
                    <i className="fa-solid fa-angle-right"></i>
                    <p>ABOUT</p>
                </div>
            </div>
            <div className="about-container">
                <div className="about-content">
                    <h1>Hi, I&apos;m Calli Jensen!</h1>
                    <p>I was born and raised in Vancouver. I always had a passion for business from a very young age. My mother Judi raised me as a single mother and has been an entrepreneur since I can remember. I have always had the burning desire to create something amazing to truly empower people. Calli is a Best Selling author and loves promoting other people. She has a passion for business and drive like no other. Her only purpose is to create a positive impact for our community for generations to come. With having extensive experience in promotions, direct sales and network marketing, creating an affiliate program for the beauty and health industry is something definitely needed. She went to work designing the master plan and referral program to be a catalyst for supporting the community.</p>
                </div>
                <img src="/src/assets/about-us-01.JPG" alt="Calli Jensen" />
            </div>
            <div className="about-container">
                <div className="about-content">
                    <h1>Our Beauty Referral Network</h1>
                    <p>We are a customer driven referral program to support small businesses in our community. We reverse engineered how we do business.  It starts with your relationships first and supporting your favorite local business. Referring your friends and family to your top rated businesses that you love.In turn when you send a referral you earn a bonus.  Support your local community and they support you. Invite your friends and family to join our membership and community and start referring them to your favorite salon or business. </p>
                </div>
                <img src="/src/assets/about-us-02.jpg" alt="Calli Jensen" />
            </div>
            <div className="about-container">
                <div className="about-content">
                <h1>Our Mission</h1>
                    <p>To create a system and reverse engineer it in a way where everyone wins. business to business, customer to business and customer to customer. Businesses would gain more clients, clients would be able to pay for their own treatments though the referrals, Customers can refer customers to their favorite businesses. Everyone Benefits by supporting their local favorite businesses. 
                    The Company was founded in 2019 and Originated as a salon just getting opened when the pandemic hit. Unfortunately out of our control the doors were closed one month after our business license and insurance was approved. We had 5 other women working with us, just as we started to refer each other clients. When the Pandemic hit we had no choice but to pivot. The Vision of wanting to support others, send new customers as well to be able to earn referrals and take care of necessary needs.  We designed a new way to support local businesses and created a new way to do business!!
                    </p>
                </div>
                <img src="/src/assets/about-us-03.jpg" alt="Calli Jensen" />
            </div>
             <div className="about-container">
            <div className="about-content">
                <h1>Come Join Our Community!</h1>
                <p>
                    Join our community and start referring your favorite businesses to our referral program. Start sending your favorite enrolled businesses brand new clients. Enroll your friends and family and start earning rewards!
                    <br /><br />
                    1. Enroll as a customer for free <br />
                    2. Book your first service. <br />
                    3. Enroll your favorite businesses. <br />
                    4. Refer your friends to your favorite businesses <br /><br />

                    Our Facebook Group <br />
                    <a href="https://www.facebook.com/groups/ourbeautysquad/">https://www.facebook.com/groups/ourbeautysquad/</a> <br /><br />

                    Follow us on IG <br />
                    <a href="https://www.instagram.com/ourbeautyreferralnetwork">https://www.instagram.com/ourbeautyreferralnetwork</a>
                </p>
            </div>
                <img src="/src/assets/about-us-04.jpg" alt="Calli Jensen" />
        </div>
        </div>
    );
}

export default About;
