import "../scss/pages/_addservice.scss"
import ServiceForm from "../components/ServiceForm";

function AddServicePage() {
    // empty service object to pass to the form 
    const service = {
        pkServiceId: '',
        name: '',
        description: '',
        image: '',
        price: '',
        // business id is already generated
    }
    
    return (
        <div className="add-service">
            <h2 className="add-service-title">Add Service</h2>
            <ServiceForm service={service} />
        </div>
    )
} 

export default AddServicePage;