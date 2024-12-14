import React from 'react';
import './App.css';

import Navbar from './Components/Common/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './WebPages/Home';
import Hearts from './WebPages/Hearts';
import Blog from './WebPages/Blog';
import Cart from './WebPages/Cart';
import LogInSignUp from './WebPages/LoginSignup';
import UploadPrescriptions from './WebPages/UploadPrescriptions';
import Footer from './Components/Common/Footer/Footer';
import Product from './WebPages/Product';
import Shop from './WebPages/Shop';
import ForgotPassword from './WebPages/ForgotPassword';
import ResetPassword from './WebPages/ResetPassword';  // Import ResetPassword
 


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/wellness' element={<Shop category1="Wellness" />} />
          <Route path='/medical_devices' element={<Shop category1="MedicalDevices" />} />
          <Route path='/personal_care' element={<Shop category1="PersonalCare" />} />
          <Route path='/hearts' element={<Hearts />} />
          <Route path='/rent' element={<Shop category1="rent" />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productID' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/sign_in' element={<LogInSignUp />} />
          <Route path='/upload_prescriptions' element={<UploadPrescriptions />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
