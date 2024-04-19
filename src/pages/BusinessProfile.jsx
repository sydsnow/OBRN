import React, { useState } from 'react';
import cat from '../assets/cat.jpeg';
import hair from "../assets/hair.jpeg";
import nails from "../assets/nails.jpeg";
import facial from "../assets/facial.jpeg";
import botox from "../assets/botox.jpeg";
import ServiceGallery from "../components/ServiceGallery";

function BusinessProfile () {
    // State to handle the selected category
    const [category, setCategory] = useState('');
    const services = [
        {
            id: 1,
            service: "Nails",
            price: 80,
            image: nails,
            discount: 10
        },
        {
            id: 2, 
            service: "Hair",
            price: 120,
            image: hair,
            //discount: 25
        },
        {
            id: 3,
            service: "Botox",
            price: 12,
            image: botox,
            discount: 15,
        },
        {
            id: 4,
            service: "Facial",
            price: 300,
            image: facial,
            discount: 50
        }
    ]

    return (
        <div className="customer-profile">
            <div className="profile-banner-top-container">
                <h1 className="profile-banner-title">Business Profile</h1>
                <div className="profile-banner-buttons">
                    <a href="#editprofile" className="button">EDIT PROFILE</a>
                    {/* <a href="#notifications" className="button">NOTIFICATIONS</a> */}
                </div>
            </div>
            <div className="profile-banner-image-container">
                <img src={cat} alt="Profile Picture" className="profile-banner-picture"/>
            </div>
            <div className="profile-banner-details">
                <h2 className="profile-banner-name">Purrfect Styles</h2>
                <p>Welcome to our catfe company where you can get hair and nails services!</p>
                <p><i className="fa-solid fa-envelope"></i> catfe@home.com</p>
                <p><i className="fa-solid fa-phone"></i> +123 456 7890</p>
                <p><i className="fa-solid fa-location-dot"></i> Vancouver, Canada</p>
            </div>
            <div className="business-profile-about">
                <h2 className="business-profile-title">About Us</h2>
                <p className="business-profile-about-details">Welcome to Purrfect Styles, where we specialize in providing top-notch grooming services for your feline companions. Our dedicated team of professionals understands the unique grooming needs of cats and is committed to ensuring that each cat receives personalized care and attention. From stylish haircuts to soothing baths and meticulous nail trims, we offer a wide range of services designed to keep your cat looking and feeling their best.
                    <br/><br/>At Purrfect Styles, we prioritize the comfort and well-being of your cat above all else. Our salon is designed to create a stress-free environment, and our gentle approach ensures that even the most nervous cats feel at ease during their grooming session. We use only the finest products that are safe and gentle on your cat's skin and coat, leaving them looking and smelling fresh. Treat your cat to the ultimate pampering experience at Purrfect Styles, where we treat every cat like royalty.</p>            
            </div>
            <div className="business-profile-services">
                <h2 className="business-profile-services-title">Our Services</h2>
                <div className="business-profile-services-dropdown-mobile">
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="business-profile-services-dropdown-menu">
                        <option value="">Select a Category</option>
                        <option value="beauty">Beauty</option>
                        <option value="fashion">Fashion</option>
                        <option value="wellness">Wellness</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className ="business-profile-services-buttons">
                <button
                    onClick={() => setCategory('beauty')}
                    className={`business-profile-services-button-desktop ${category === 'beauty' ? 'active' : ''}`}
                >
                    Beauty
                </button>
                <button
                    onClick={() => setCategory('fashion')}
                    className={`business-profile-services-button-desktop ${category === 'fashion' ? 'active' : ''}`}
                >
                    Fashion
                </button>
                <button
                    onClick={() => setCategory('wellness')}
                    className={`business-profile-services-button-desktop ${category === 'wellness' ? 'active' : ''}`}
                >
                    Wellness
                </button>
                <button
                    onClick={() => setCategory('other')}
                    className={`business-profile-services-button-desktop ${category === 'other' ? 'active' : ''}`}
                >
                    Other
                </button>
                </div>
                <div className="business-profile-services">
                <ServiceGallery services={services} />
            </div>
            </div>
        </div>
    )
}

export default BusinessProfile;
