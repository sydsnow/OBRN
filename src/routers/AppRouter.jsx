
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import RegisterCustomer from '../pages/RegisterCustomer';
import RegisterBusiness from '../pages/RegisterBusiness';


function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registercustomer" element={<RegisterCustomer />} />
        <Route path="/registerbusiness" element={<RegisterBusiness />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;
