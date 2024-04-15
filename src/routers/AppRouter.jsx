// Router Components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../styles/styles.css'

// Components
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'


function AppRouter() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default AppRouter
