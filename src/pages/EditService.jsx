//import ServiceForm from "../components/ServiceForm";
import axios from "axios";
import CreateService from "../components/CreateService";
import "../scss/pages/_editservice.scss"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditService () {
    const [serviceObj, setServiceObj] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchServiceById = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/service/${id}`);
                console.log('response:', response.data.$values);
                setServiceObj(response.data.$values);
            } catch (error) {
                console.error('Failed to fetch service: ', error);
            }
        }
        fetchServiceById();
    }, [id]);

    return (
        <div className="edit-service">
            <div className="testimonials-banner">
                <p className="testimonials-small">EDIT BUSINESS SERVICE</p>
                <p className="testimonials-large">Edit Service</p>
                <div className="testimonials-path">
                <i className="fa-solid fa-house"></i>
                <p>HOME</p>
                <i className="fa-solid fa-angle-right"></i>
                <p>EDIT BUSINESS SERVICE</p>
                </div>
            </div>
            <CreateService serviceObj={serviceObj}/>
        </div>
    );

}

export default EditService;