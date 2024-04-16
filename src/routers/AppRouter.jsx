
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import ServicesPage from "../pages/Services";

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/services" element={<ServicesPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;
