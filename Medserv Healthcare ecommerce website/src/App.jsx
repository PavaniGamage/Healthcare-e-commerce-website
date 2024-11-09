import React from "react";
import "./App.css";

import Navbar from "./Components/Common/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./WebPages/Home";
import Hearts from "./WebPages/Hearts";
import Blog from "./WebPages/Blog/Blog";
import Cart from "./WebPages/Cart";
import LogInSignUp from "./WebPages/LoginSignup";
import UploadPrescriptions from "./WebPages/UploadPrescriptions";
import Footer from "./Components/Common/Footer/Footer";
import Product from "./WebPages/Product";
import Shop from "./WebPages/Shop";
import BlogPost from "./WebPages/Blog/BlogPost";
import Location from "./WebPages/LocationPage";
import About from "./WebPages/About";
import SendUsMessage from "./Components/HomePage/SendUsMessage/SendUsMessage.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wellness" element={<Shop category1="Wellness" />} />
          <Route
            path="/medical_devices"
            element={<Shop category1="MedicalDevices" />}
          />
          <Route
            path="/personal_care"
            element={<Shop category1="PersonalCare" />}
          />
          <Route path="/hearts" element={<Hearts />} />
          <Route path="/rent" element={<Shop category1="rent" />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />{" "}
          {/* Dynamic route */}
          <Route path="/product" element={<Product />}>
            <Route path=":productID" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/sign_in" element={<LogInSignUp />} />
          <Route
            path="/upload_prescriptions"
            element={<UploadPrescriptions />}
          ></Route>
          <Route path="/location" element={<Location />}></Route>
          <Route path="/contact" element={<SendUsMessage />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
