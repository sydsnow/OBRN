import EditProfileInfo from "../components/EditProfileInfo";

function EditProfileMyDetails() {
  const userDetails = {
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890",
    location: "City, Country"
  };

  return (
    <div className="edit-profile">
        <div className="testimonials-banner">
          <p className="testimonials-small">EDIT PROFILE</p>
          <p className="testimonials-large">Edit Profile</p>
          <div className="testimonials-path">
            <i className="fa-solid fa-house"></i>
            <p>HOME</p>
            <i className="fa-solid fa-angle-right"></i>
            <p>EDIT PROFILE</p>
            <i className="fa-solid fa-angle-right"></i>
            <p>MY DETAILS</p>
          </div>
        </div>
        <div>
          <EditProfileInfo initialData={userDetails} />
        </div>
    </div> 
  );
}

export default EditProfileMyDetails;
