import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context/UserContext.jsx"; 
import { CartProvider } from "./WebPages/Cart/CartContext.jsx";

import Navbar from "./Components/Common/Navbar/Navbar";
import Home from "./WebPages/Home";
import Hearts from "./WebPages/Hearts";
import Donate from "./WebPages/Donation.jsx";
import SuccessPageDonation from "./WebPages/Donation/SuccessPage.jsx"; 
import CancelPageDonation from "./WebPages/Donation/CancelPage.jsx";
import Blog from "./WebPages/Blog/Blog";
import Cart from "./WebPages/Cart/Cart.jsx";
import PaymentHistory from "./WebPages/PaymentHistory/PaymentHistory.jsx";
import PaymentHistoryItem from "./WebPages/PaymentHistory/PaymentHistoryItem.jsx";
import LogInSignUp from "./WebPages/LoginSignup";
import Profile from "./WebPages/MyProfile.jsx";
import EditProfile from "./WebPages/EditProfile.jsx";
import UploadPrescriptions from "./WebPages/UploadPrescriptions";
import Uploads from "./WebPages/MyPrescriptionUploads/MyUploads.jsx";
import UploadsItem from "./WebPages/MyPrescriptionUploads/MyUploadsItem.jsx";
import SuccessPagePrescription from "./WebPages/Prescription/SuccessPage.jsx"; 
import CancelPagePrescription from "./WebPages/Prescription/CancelPage.jsx";
import Footer from "./Components/Common/Footer/Footer";
import Product from "./WebPages/Product";
import Shop from "./WebPages/Shop";
import BlogPost from "./WebPages/Blog/BlogPost";
import Location from "./WebPages/LocationPage";
import About from "./WebPages/About";
import SendUsMessage from "./Components/HomePage/SendUsMessage/SendUsMessage.jsx";
import SearchProducts from "./WebPages/SearchProducts.jsx";
import SuccessPage from "./WebPages/Cart/SuccessPage.jsx"; 
import CancelPage from "./WebPages/Cart/CancelPage.jsx";
import ForgotPassword from './WebPages/ForgotPassword';
import ResetPassword from './WebPages/ResetPassword';

function App() { 
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter> 
          <Navbar />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/wellness' element={<Shop category1="Wellness"/>}/>
            <Route path='/medical_devices' element={<Shop category1="MedicalDevices"/>}/>
            <Route path='/personal_care' element={<Shop category1="PersonalCare"/>}/>
            <Route path="/product" element={<Product />}>
              <Route path=":productID" element={<Product />} />
            </Route>
            <Route path='/rent' element={<Shop category1="Rent"/>}/>
            
            <Route path='/hearts' element={<Hearts/>}/>
            <Route path='/donation' element={<Donate/>}/>
            <Route path="/success-donation" element={<SuccessPageDonation />} />
            <Route path="/cancel-donation" element={<CancelPageDonation />} />
            
            <Route path='/blog' element={<Blog/>}/>
              <Route path="/blog/:id" element={<BlogPost />} />
            
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/cancel" element={<CancelPage />} />
            <Route path="/payment_history" element={<PaymentHistory />} />
            <Route path="/payment_history/:orderID" element={<PaymentHistoryItem />} />
            
            <Route path="/sign_in" element={<LogInSignUp />} />
            <Route path="/login" element={<LogInSignUp />} />
            <Route path="/my_profile" element={<Profile />} />
            <Route path="/edit_profile" element={<EditProfile />} />

            <Route path="/upload_prescriptions" element={<UploadPrescriptions />}></Route>
            <Route path="/uploads_history" element={<Uploads />} />
            <Route path="/uploads_history/:orderID" element={<UploadsItem />} />
            <Route path="/success-prescription-payment" element={<SuccessPagePrescription />} />
            <Route path="/cancel-prescription-payment" element={<CancelPagePrescription />} />
            
            <Route path="/location" element={<Location />}></Route>
            <Route path="/contact" element={<SendUsMessage />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/search_products" element={<SearchProducts/>}></Route>
            
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
