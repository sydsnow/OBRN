import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getEmailFromJWT } from '../utilities/utilities';
import BusinessDetailsForm from '../components/BusinessDetailsForm';
import ProfileBannerBusiness from '../components/ProfileBannerBusiness';
import ServiceGallery from "../components/ServiceGallery";
import cat from '../assets/cat.jpeg';


function BusinessProfile() {
    const navigate = useNavigate();
    const [businessDetails, setBusinessDetails] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [category, setCategory] = useState('');

    useEffect(() => {
        const fetchBusinessData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const token = localStorage.getItem('token');
                // console.log ('businessDetails', businessDetails)
                if (token) {
                    const email = getEmailFromJWT(token);
                    const response = await axios.get(`${apiUrl}/api/business/get-business-by-email?email=${email}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setBusinessDetails(response.data);
                }
            } catch (error) {
                console.error('Error fetching business data:', error);
                navigate('/error');
            }
        };

        fetchBusinessData();
    }, [navigate]);


    if (!businessDetails) {
        return <div>Loading...</div>;
    }else{
        console.log('businessDetails', businessDetails)
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
                <ServiceGallery businessId={businessDetails?.pkBusinessId} />

            </div>
            </div>

            {editMode && (
                <BusinessDetailsForm initialData={businessDetails} />
            )}
        </div>
    );
}

export default BusinessProfile;
