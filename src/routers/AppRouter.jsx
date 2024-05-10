import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '../auth/AuthContext';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ensure that Azure subscription key header is sent for all axios requests 
import axios from "axios";
axios.defaults.headers.common['Ocp-Apim-Subscription-Key'] = import.meta.env.VITE_API_KEY;

import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import TestRegisterPage from "../pages/TestRegisterPage";

import RegisterCustomer from '../pages/RegisterCustomer';
import RegisterBusiness from '../pages/RegisterBusiness';
import TestServices from "../pages/TestServices";

import EditProfile from "../pages/EditProfile";
import EditProfileBusiness from "../pages/EditProfileBusiness";
import EditProfileMyDetails from "../pages/EditProfileMyDetails";
import EditProfileBusinessDetails from "../pages/EditProfileBusinessDetails";
import EditPasswordPage from "../pages/EditPasswordPage";
import CustomerMembershipDetails from "../pages/CustomerMembershipDetails";
import BusinessMembershipDetails from "../pages/BusinessMembershipDetails";
import MembershipInfo from "../pages/MembershipInfo";

import ServicesPage from "../pages/Services";
import TestimonialsPage from "../pages/Testimonials";
import CustomerProfile from "../pages/CustomerProfile";
import BusinessProfile from "../pages/BusinessProfile";
import About from "../pages/About";
import PageNotFound from "../pages/PageNotFound";
import PageComingSoon from "../pages/PageComingSoon";
import TermsCondition from "../pages/TermsCondition";
import CancellationPolicy from "../pages/CancellationPolicy";
import PrivacyStatement from "../pages/PrivacyStatement";

import Admin from "../pages/Admin";
import AddServicePage from "../pages/AddService";
import AdminTestimonials from "../pages/AdminTestimonials";
import AdminAllCustomers from "../pages/AdminAllCustomers";
import AdminUsers from "../pages/AdminUsers";
import AdminAllBusinesses from "../pages/AdminAllBusinesses";
import AdminEditCustomer from "../pages/AdminEditCustomer";
import NewTestimonial from "../pages/NewTestimonial";
import AdminAllCategories from "../pages/AdminAllCategories";
import AdminEditBusiness from "../pages/AdminEditBusiness";
import AdminAllDiscounts from "../pages/AdminAllDiscounts";
import AddDiscount from "../pages/AddDiscount";
import AdminFees from "../pages/AdminFees";
// import ServiceAdd from "../pages/ServiceAdd";
// import ServiceEdit from "../pages/ServiceEdit";

import ServiceGallery from "../components/ServiceGallery";


import EditService from "../pages/EditService";

import CreateService from "../components/CreateService";
import ServiceForm from "../components/ServiceForm";
import PublicBusinessProfile from "../pages/PublicBusinessProfile";
import ServiceDetailPage from "../pages/ServiceDetailPage";

import TransactionConfirmation from "../pages/TransactionConfirmation";
import RefundConfirmation from "../pages/RefundConfirmation";
import Roles from "../pages/AdminRoles";
import AddUserRole from "../pages/AddUserRole";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}


function AppRouter() {
  const authenticated = localStorage.getItem('token');


  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/testservices" element={<TestServices />} />
          <Route path="/testregister" element={<TestRegisterPage />} />

          <Route path="/registercustomer" element={<RegisterCustomer />} />
          <Route path="/registerbusiness" element={<RegisterBusiness />} />

          <Route path="/customerprofile" element={<CustomerProfile />} />
          <Route path="/businessprofile" element={<BusinessProfile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/editprofilebusiness" element={<EditProfileBusiness />} />
          <Route path="/membershipinfo" element={<MembershipInfo />} />
          <Route path="/termscondition" element={<TermsCondition />} />
          <Route path="/privacystatement" element={<PrivacyStatement />} />
          <Route path="/cancellationpolicy" element={<CancellationPolicy />} />

          {authenticated && (
            <>
              <Route path="/editprofile/mydetails" element={<EditProfileMyDetails />} />
              <Route path="/editprofilebusiness/businessdetails" element={<EditProfileBusinessDetails />} />
            </>
          )}
          <Route path="/editprofilebusiness/businessdetails" element={<EditProfileBusinessDetails />} />
          <Route path="/editprofile/editpassword" element={<EditPasswordPage />} />
          <Route path="/editprofile/customer-membership-details" element={<CustomerMembershipDetails />} />
          <Route path="/editprofilebusiness/business-membership-details" element={<BusinessMembershipDetails />} />

          <Route path="/services" element={<ServicesPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/comingsoon" element={<PageComingSoon />} />
          <Route path="/addservice" element={<AddServicePage />} />
          <Route path="/admin-testimonials" element={<AdminTestimonials />} />
          <Route path="/admin-all-customers" element={<AdminAllCustomers />} />
          <Route path="/admin-users" element={<AdminUsers />} />
          <Route path="/admin-all-businesses" element={<AdminAllBusinesses />} />
          <Route path="/admin-edit-customer/:id" element={<AdminEditCustomer />} />

          <Route path="/admin-all-categories" element={<AdminAllCategories />} />
          <Route path="/admin-edit-business/:id" element={<AdminEditBusiness />} />
          <Route path="/testimonials/:id/new-testimonial" element={<NewTestimonial />} />
          <Route path="/admin-all-discounts" element={<AdminAllDiscounts />} />
          <Route path="/add-discount" element={<AddDiscount />} />
          <Route path="/admin-fees" element={<AdminFees />} />
          <Route path="/edit-service/:serviceId" element={<EditService />} />
          {/* <Route path="/service-add/:id" element={<ServiceAdd />} />
          <Route path="/service-edit/:serviceId" element={<ServiceEdit />} /> */}
          {/* <Route path="/editservice/:id" element={<EditService />} /> */}
          <Route path="/create-service/:id" element={<CreateService />} />
          <Route path="/add-service/:id" element={<ServiceForm />} />

          <Route path="/:businessId" element={<PublicBusinessProfile />} />
          <Route path="/:businessId/:serviceId" element={<ServiceDetailPage />} />

          <Route path="/servicegallery" element={<ServiceGallery />} />
          <Route path="/CheckOut/OrderConfirmation" element={<TransactionConfirmation />} />
          <Route path="/refund-confirmation" element={<RefundConfirmation />} />

          <Route path="/admin-roles" element={<Roles />} />
          <Route path="/admin-add-role/:email" element={<AddUserRole />} />


        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRouter;

function Logout() {
  return null;
}