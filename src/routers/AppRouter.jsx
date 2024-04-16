
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import ServicesPage from "../pages/Services";
import TestimonialsPage from "../pages/Testimonials";
import CustomerProfile from "../pages/CustomerProfile";

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customerprofile" element={<CustomerProfile />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;
