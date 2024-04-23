import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '../auth/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import TestRegisterPage from "../pages/TestRegisterPage";

import RegisterCustomer from '../pages/RegisterCustomer';
import RegisterBusiness from '../pages/RegisterBusiness';
import TestServices from "../pages/TestServices";

import EditProfile from "../pages/EditProfile";
import EditProfileMyDetails from "../pages/EditProfileMyDetails";
import EditProfileBusinessDetails from "../pages/EditProfileBusinessDetails";
import EditPasswordPage from "../pages/EditPasswordPage";

import ServicesPage from "../pages/Services";
import TestimonialsPage from "../pages/Testimonials";
import CustomerProfile from "../pages/CustomerProfile";
import BusinessProfile from "../pages/BusinessProfile";
import About from "../pages/About";
import PageNotFound from "../pages/PageNotFound";
import PageComingSoon from "../pages/PageComingSoon";
import Admin from "../pages/Admin";
import AddServicePage from "../pages/AddService";
import AdminTestimonials from "../pages/AdminTestimonials";
import AdminAllUsers from "../pages/AdminAllUsers";
import AdminUsers from "../pages/AdminUsers";
import EditService from "../pages/EditService";

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/testservices" element={<TestServices />} />
        <Route path="/testregister" element={<TestRegisterPage />} />
        <Route path="/registercustomer" element={<RegisterCustomer />} />
        <Route path="/registerbusiness" element={<RegisterBusiness />} />
        <Route path="/customerprofile" element={<CustomerProfile />} />
        <Route path="/businessprofile" element={<BusinessProfile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/editprofile/mydetails" element={<EditProfileMyDetails />} />
        <Route path="/editprofile/businessdetails" element={<EditProfileBusinessDetails />} />
        <Route path="/editprofile/editpassword" element={<EditPasswordPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/comingsoon" element={<PageComingSoon />} />
        <Route path="/addservice" element={<AddServicePage />} />
        <Route path="/admin-testimonials" element={<AdminTestimonials />} />
        <Route path="/admin-all-users" element={<AdminAllUsers />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/editservice/:id" element={<EditService />} />
      </Routes>
      <Footer />
      <AuthProvider>
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
          <Route path="/editprofile/mydetails" element={<EditProfileMyDetails />} />
          <Route path="/editprofile/businessdetails" element={<EditProfileBusinessDetails />} />
          <Route path="/editprofile/editpassword" element={<EditPasswordPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/comingsoon" element={<PageComingSoon />} />
          <Route path="/addservice" element={<AddServicePage />} />
          <Route path="/admin-testimonials" element={<AdminTestimonials />} />
          <Route path="/admin-all-users" element={<AdminAllUsers />} />
          <Route path="/admin-users" element={<AdminUsers />} />
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