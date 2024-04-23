import ServiceForm from "../components/ServiceForm";
import "../scss/pages/_editservice.scss"

function EditService () {
    return (
        <div className="edit-service">
            <h2 className="edit-service-title">Edit Service</h2>
            <ServiceForm />
        </div>
    );

}

export default EditService;