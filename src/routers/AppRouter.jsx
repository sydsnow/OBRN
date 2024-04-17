
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import TestRegisterPage from "../pages/TestRegisterPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/testregister" element={<TestRegisterPage />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;
