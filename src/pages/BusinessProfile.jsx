import { useEffect, useState } from 'react';
import axios from 'axios';
import cat from '../assets/cat.jpeg';
// import hair from "../assets/hair.jpeg";
// import nails from "../assets/nails.jpeg";
// import facial from "../assets/facial.jpeg";
// import botox from "../assets/botox.jpeg";
import ServiceGallery from "../components/ServiceGallery";
import ProfileBannerBusiness from '../components/ProfileBannerBusiness';

function BusinessProfile () {
    // State to handle the selected category
    const [category, setCategory] = useState('');
    const [services, setServices] = useState({
        pkSerivceId: '',
        image: '',
        fkBusinessId: '',
        serviceName: '',
        description: '',
        fkDiscountId: '',
        fkCategoryId: '',
        basePrice: '',
    });

    useEffect(() => {
        // Fetch the token from localStorage
        const token = localStorage.getItem('token');
        console.log('token:', token);
    
        if (token) {
            const apiUrl = import.meta.env.VITE_API_BASE_URL;
            axios.get(`${apiUrl}/getbusiness/${token.email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                // Assuming response.data contains the business data including pkBusinessId
                const pkBusinessId = response.data.pkBusinessId;
    
                axios.get(`${apiUrl}/service/${pkBusinessId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(serviceResponse => {
                    // Assuming serviceResponse.data contains the list of services
                    setServices(serviceResponse.data.$values);
                })
                .catch(error => {
                    console.error('Error fetching services:', error);
                });
            })
            .catch(error => {
                console.error('Error fetching business data:', error);
            });
        }
    }, []);
    
        
    // const services = [
    //     {
    //         id: 1,
    //         service: "Nails",
    //         price: 80,
    //         image: nails,
    //         discount: 10
    //     },
    //     {
    //         id: 2, 
    //         service: "Hair",
    //         price: 120,
    //         image: hair,
    //         //discount: 25
    //     },
    //     {
    //         id: 3,
    //         service: "Botox",
    //         price: 12,
    //         image: botox,
    //         discount: 15,
    //     },
    //     {
    //         id: 4,
    //         service: "Facial",
    //         price: 300,
    //         image: facial,
    //         discount: 50
    //     }
    // ]

    return (
        <div className="business-profile">
            <ProfileBannerBusiness 
                title="Business Profile"
                imagePath={cat}
                name="Purrfect Styles"
                email="catfe@home.com"
                phone="+123 456 7890"
                location="Vancouver, Canada"
            />
            <div className="business-profile-about">
                <h2 className="business-profile-title">About Us</h2>
                <p className="business-profile-about-details">Welcome to Purrfect Styles, where we specialize in providing top-notch grooming services for your feline companions. Our dedicated team of professionals understands the unique grooming needs of cats and is committed to ensuring that each cat receives personalized care and attention. From stylish haircuts to soothing baths and meticulous nail trims, we offer a wide range of services designed to keep your cat looking and feeling their best.
                    <br/><br/>At Purrfect Styles, we prioritize the comfort and well-being of your cat above all else. Our salon is designed to create a stress-free environment, and our gentle approach ensures that even the most nervous cats feel at ease during their grooming session. We use only the finest products that are safe and gentle on your cats skin and coat, leaving them looking and smelling fresh. Treat your cat to the ultimate pampering experience at Purrfect Styles, where we treat every cat like royalty.</p>            
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
