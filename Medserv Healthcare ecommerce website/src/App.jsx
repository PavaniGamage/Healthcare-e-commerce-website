import React from "react";
import "./App.css";

import Navbar from "./Components/Common/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./WebPages/Home";
import Hearts from "./WebPages/Hearts";
import Blog from "./WebPages/Blog/Blog";
import Cart from "./WebPages/Cart/Cart.jsx";
import { CartProvider } from "./WebPages/Cart/CartContext.jsx";  // Import CartProvider
import LogInSignUp from "./WebPages/LoginSignup";
import UploadPrescriptions from "./WebPages/UploadPrescriptions";
import Footer from "./Components/Common/Footer/Footer";
import Product from "./WebPages/Product";
import Shop from "./WebPages/Shop";
import BlogPost from "./WebPages/Blog/BlogPost";
import Location from "./WebPages/LocationPage";
import About from "./WebPages/About";
import SendUsMessage from "./Components/HomePage/SendUsMessage/SendUsMessage.jsx";
import SearchProducts from "./WebPages/SearchProducts.jsx";
import SuccessPage from "./WebPages/Cart/SuccessPage"; 
import CancelPage from "./WebPages/Cart/CancelPage";


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/wellness' element={<Shop category1="Wellness"/>}/>
          <Route path='/medical_devices' element={<Shop category1="MedicalDevices"/>}/>
          <Route path='/personal_care' element={<Shop category1="PersonalCare"/>}/>
          <Route path='/hearts' element={<Hearts/>}/>
          <Route path='/rent' element={<Shop category1="Rent"/>}/>
          <Route path='/blog' element={<Blog/>}/>
             <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productID" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/sign_in" element={<LogInSignUp />} />
          <Route path="/upload_prescriptions" element={<UploadPrescriptions />}></Route>
          <Route path="/location" element={<Location />}></Route>
          <Route path="/contact" element={<SendUsMessage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/search_products" element={<SearchProducts/>}></Route>
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
