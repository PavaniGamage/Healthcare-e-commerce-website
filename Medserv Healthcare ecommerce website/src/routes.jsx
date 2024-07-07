import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Wellness from './Pages/Wellness';
import MedicalDevices from './Pages/MedicalDevices';
import PersonalCare from './Pages/PersonalCare';
import MedservHearts from './Pages/MedservHearts';
import Rent from './Pages/Rent';
import Blog from './Pages/Blog';
import UploadPrescription from './Pages/UploadPrescription';
import About from './Pages/About';  // Make sure to create and import these components
import Contact from './Pages/Contact';  // Create and import this component
import NotFound from './Pages/NotFound';  // Create a 404 component

const AppRoutes = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Wellness" element={<Wellness />} />
        <Route path="/MedicalDevices" element={<MedicalDevices />} />
        <Route path="/PersonalCare" element={<PersonalCare />} />
        <Route path="/MedservHearts" element={<MedservHearts />} />
        <Route path="/Rent" element={<Rent />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/UploadPrescription" element={<UploadPrescription />} />
        <Route path="/about" element={<About />} />  {/* Added About route */}
        <Route path="/contact" element={<Contact />} />  {/* Added Contact route */}
        <Route path="*" element={<NotFound />} />  {/* Fallback route for 404 */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
