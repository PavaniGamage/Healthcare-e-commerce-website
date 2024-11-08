import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import {
  FaShoppingCart,
  FaUser,
  FaMapMarkerAlt,
  FaFileAlt,
  FaSearch,
} from "react-icons/fa";
import logo from "../../Assets/NavBar/logo.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const getActiveMenu = () => {
    switch (location.pathname) {
      case "/":
        return "home";
      case "/wellness":
        return "wellness";
      case "/medical_devices":
        return "medicalDevices";
      case "/personal_care":
        return "personalCare";
      case "/hearts":
        return "hearts";
      case "/rent":
        return "rent";
      case "/blog":
        return "blog";
      case "/location":
        return "location";
      default:
        return "none";
    }
  };

  const activeMenu = getActiveMenu();
  const [isClicked, setClicked] = useState(false);

  const toggleMenu = () => {
    setClicked((prevClicked) => !prevClicked);
  };

  const navbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setClicked(false);
      }
      if (event.target.closest(".nav-menu-span")) {
        setClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navBar">
      <div className="navBar-cloumn-1">
        <Link className="nav-bar-link" to="/">
          <div className="nav-logo">
            <img src={logo} alt="" />
          </div>
        </Link>
        <ul
          className={isClicked ? "nav-menu active" : "nav-menu"}
          ref={navbarRef}
        >
          <Link className="nav-bar-link" to="/">
            <li className={activeMenu === "home" ? "active" : ""}>
              Home{activeMenu === "home" ? <hr /> : null}
            </li>
          </Link>
          <Link className="nav-bar-link" to="/wellness">
            <li className={activeMenu === "wellness" ? "active" : ""}>
              Wellness{activeMenu === "wellness" ? <hr /> : null}
            </li>
          </Link>
          <Link className="nav-bar-link" to="/medical_devices">
            <li className={activeMenu === "medicalDevices" ? "active" : ""}>
              Medical Devices{activeMenu === "medicalDevices" ? <hr /> : null}
            </li>
          </Link>
          <Link className="nav-bar-link" to="/personal_care">
            <li className={activeMenu === "personalCare" ? "active" : ""}>
              Personal Care{activeMenu === "personalCare" ? <hr /> : null}
            </li>
          </Link>
          <Link className="nav-bar-link" to="/rent">
            <li className={activeMenu === "rent" ? "active" : ""}>
              Rent{activeMenu === "rent" ? <hr /> : null}
            </li>
          </Link>
          <Link className="nav-bar-link" to="/blog">
            <li className={activeMenu === "blog" ? "active" : ""}>
              Blog{activeMenu === "blog" ? <hr /> : null}
            </li>
          </Link>
          <Link className="nav-bar-link" to="/hearts">
            <li className={activeMenu === "hearts" ? "active" : ""}>
              Hearts{activeMenu === "hearts" ? <hr /> : null}
            </li>
          </Link>
        </ul>
        <div className="nav-signin">
          <Link className="nav-bar-link" to="/sign_in">
            <FaUser className="nav-icons" />
            <p>Sign In</p>
          </Link>
        </div>
        <div className="nav-menu-span" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="navBar-cloumn-2">
        <div className="navBar-search">
          <input type="text" placeholder="Search here..." />
          <FaSearch className="search-icon" />
        </div>

        <div className="nav-upload-prescriptions">
          <Link className="nav-bar-link" to="/upload_prescriptions">
            <button>
              <p>Upload Prescriptions</p>
              <div className="nav-icons">
                <FaFileAlt />
              </div>
            </button>
          </Link>
          <Link className="nav-bar-link" to="/cart">
            <FaShoppingCart className="nav-icons" />
            <div className="nav-cart-count">0</div>
          </Link>
          <Link className="nav-bar-link" to="/location">
            <FaMapMarkerAlt className="nav-icons" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
