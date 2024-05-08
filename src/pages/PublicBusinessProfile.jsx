import { useState, useEffect} from 'react';
import axios from 'axios';
//import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ProfileBannerBusiness from '../components/ProfileBannerBusiness';
import cat from '../assets/cat.jpeg';
import ServiceGallery from '../components/ServiceGallery';

function PublicBusinessProfile() {
    // Get the current location
    //const location = useLocation();
    const { businessId } = useParams(); // Get the business ID from the URL
    //console.log('id', businessId);
    const [businessDetails, setBusinessDetails] = useState(null);
    const [services, setServices] = useState([]);
    const [category, setCategory] = useState('');


    useEffect(() => {
        const fetchBusinessData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;   
                const response = await axios.get(`${apiUrl}/api/Business/get-business/${businessId}`);
                setBusinessDetails(response.data);
                const serviceResponse = await axios.get(`${apiUrl}/service/business/${response.data.pkBusinessId}`);
                const servicesWithBusinessName = serviceResponse.data.$values.map(service => ({
                    ...service,
                    business: response.data
                }));
                setServices(servicesWithBusinessName);
                //console.log('businessDetails', businessDetails);
            } catch (error) {
                console.error('Error fetching business data:', error);
            }
        }
        fetchBusinessData();
    }, [businessDetails, businessId]);
    if (!businessDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="business-profile">
            <ProfileBannerBusiness
                title="Business Profile"
                imagePath={businessDetails?.logo || cat}
                name={businessDetails?.businessName || 'N/A'}
                email={businessDetails?.email || 'N/A'}
                phone={businessDetails?.phone || 'N/A'}
                location={businessDetails?.city ? `${businessDetails.city}, ${businessDetails.province}` : 'Location N/A'}
                referralCode={""} 
            />

            <div className="business-profile-about">
                <h2 className="business-profile-title">About Us</h2>
                <p className="business-profile-about-details">{businessDetails?.description || 'No description available.'}</p>            
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
                    <button onClick={() => setCategory('beauty')} className={`business-profile-services-button-desktop ${category === 'beauty' ? 'active' : ''}`}>Beauty</button>
                    <button onClick={() => setCategory('fashion')} className={`business-profile-services-button-desktop ${category === 'fashion' ? 'active' : ''}`}>Fashion</button>
                    <button onClick={() => setCategory('wellness')} className={`business-profile-services-button-desktop ${category === 'wellness' ? 'active' : ''}`}>Wellness</button>
                    <button onClick={() => setCategory('other')} className={`business-profile-services-button-desktop ${category === 'other' ? 'active' : ''}`}>Other</button>
                </div>
                <div className="business-profile-services">
                {services.length > 0 && (
                    <ServiceGallery displayedServices={services}></ServiceGallery>
                )}
                </div>
            </div>
        </div>
    );
}

export default PublicBusinessProfile;