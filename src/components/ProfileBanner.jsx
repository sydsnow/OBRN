import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { capitalizeFirstLetters } from '../utilities/utilities';
import defaultProfile from '../assets/profile-placeholder.png';
import { BlobServiceClient } from '@azure/storage-blob';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

async function fetchSasToken() {
    const response = await axios.get(`${apiUrl}/api/sastoken/get-sas-token`);
    return response.data.sasToken;
}

function ProfileBanner({ title, imagePath, name, email, phone, location, referralCode }) {
    const [imageUrl, setImageUrl] = useState({ name: '', url: '' });
    const [sasToken, setSasToken] = useState(null);

    // Fetch a single image by name
    const fetchImageByName = useCallback(async (blobName) => {
        try {
            const account = import.meta.env.VITE_STORAGE_ACCOUNT;
            const containerName = import.meta.env.VITE_STORAGE_CONTAINER;
            const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sasToken}`);
            const containerClient = blobServiceClient.getContainerClient(containerName);
            const blobClient = containerClient.getBlockBlobClient(blobName);
            const blobUrl = blobClient.url;
            setImageUrl({ name: blobName, url: blobUrl });
        } catch (error) {
            console.error(error);
        }
    }, [sasToken]);

    useEffect(() => {
        async function fetchData() {
            const token = await fetchSasToken();
            setSasToken(token);
            fetchImageByName(imagePath);
        }
        fetchData();
    }, [fetchImageByName, setSasToken, imagePath])

    return (
        <div className="profile-banner">
            <div className="profile-banner-top-container">
                <h1 className="profile-banner-title">{title}</h1>
                <div className="profile-banner-buttons">
                <NavLink to="/editprofile" className="button">EDIT PROFILE</NavLink>
                </div>
            </div>
            <div className="profile-banner-image-container">
                <img src={imageUrl.url || defaultProfile} alt="Profile Picture" className="profile-banner-picture"/>
            </div>
            <div className="profile-banner-details"> 
                <h2 className="profile-banner-name">{capitalizeFirstLetters(name)}</h2>
                <p><i className="fa-solid fa-user-plus"></i> {referralCode}</p>
                <p><i className="fa-solid fa-envelope"></i> {email}</p>
                <p><i className="fa-solid fa-phone"></i> {phone}</p>
                <p><i className="fa-solid fa-location-dot"></i> {capitalizeFirstLetters(location)}</p>
            </div>
        </div>
    );
}

ProfileBanner.propTypes = {
    title: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    referralCode: PropTypes.string.isRequired
};

export default ProfileBanner;