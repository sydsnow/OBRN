
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import TestRegisterPage from "../pages/TestRegisterPage";

import RegisterCustomer from '../pages/RegisterCustomer';
import RegisterBusiness from '../pages/RegisterBusiness';
import TestServices from "../pages/TestServices";


import ServicesPage from "../pages/Services";
import TestimonialsPage from "../pages/Testimonials";
import CustomerProfile from "../pages/CustomerProfile";
import BusinessProfile from "../pages/BusinessProfile";
import About from "../pages/About";
import PageNotFound from "../pages/PageNotFound";
import PageComingSoon from "../pages/PageComingSoon";
import Admin from "../pages/Admin";


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
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/comingsoon" element={<PageComingSoon />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;
