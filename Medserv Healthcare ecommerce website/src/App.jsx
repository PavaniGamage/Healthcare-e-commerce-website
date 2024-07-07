import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar'; 

import Home from './Pages/Home';
import Wellness from './Pages/Wellness';
import MedicalDevices from './Pages/MedicalDevices';
import PersonalCare from './Pages/PersonalCare';
import MedservHearts from './Pages/MedservHearts';
import Rent from './Pages/Rent';
import Blog from './Pages/Blog';
import SignIn from './Pages/SignIn';
import UploadPrescription from './Pages/UploadPrescription';
import TopBar from './Components/TopBar';
import LowerBar from './Components/LowerBar';

const App = () => {
  return (
    <Router>
      <TopBar />
      <NavBar />
      <LowerBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wellness" element={<Wellness />} />
        <Route path="/medical-devices" element={<MedicalDevices />} />
        <Route path="/personal-care" element={<PersonalCare />} />
        <Route path="/medserv-hearts" element={<MedservHearts />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/Upload-Prescription" element={<UploadPrescription />} />
        <Route path="/Sign-in" element={<SignIn/>} />
      </Routes>
    </Router>
  );
};

export default App;
