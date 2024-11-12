import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import Navbar from './Components/Common/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './WebPages/Home';
import Hearts from './WebPages/Hearts';
import Rent from './WebPages/Rent';
import Blog from './WebPages/Blog';
import Cart from './WebPages/Cart';
import { CartProvider } from "./WebPages/CartContext";  // Import CartProvider
import LogInSignUp from './WebPages/LoginSignup';
import UploadPrescriptions from './WebPages/UploadPrescriptions';
import Footer from './Components/Common/Footer/Footer';
import Wellness from './WebPages/Wellness';
import MedicalDevices from './WebPages/MedicalDevices';
import PersonalCare from './WebPages/PersonalCare';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/wellness' element={<Wellness/>}/>
          <Route path='/medical_devices' element={<MedicalDevices category="medical_devices"/>}/>
          <Route path='/personal_care' element={<PersonalCare category="personal_care"/>}/>
          <Route path='/hearts' element={<Hearts/>}/>
          <Route path='/rent' element={<Rent/>}/>
          <Route path='/blog' element={<Blog/>}/>
          {/* <Route path='/product' element={<Product/>}>
            <Route path=':productID' element={<Product/>}/>
          </Route> */}
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/sign_in' element={<LogInSignUp/>}/>
          <Route path='/upload_prescriptions' element={<UploadPrescriptions/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
      </CartProvider>
  );
}

export default App;
