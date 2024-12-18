import React, {useState, useEffect, useRef} from 'react'
import './Navbar.css'
import { useUser } from '../../../Context/UserContext';
import {FaShoppingCart, FaUser, FaMapMarkerAlt, FaFileAlt} from 'react-icons/fa';
import logo from '../../Assets/NavBar/logo.png';
import SearchBar from '../Navbar/SearchBar/SearchBar';
import { useCart } from '../../../WebPages/Cart/CartContext'; // Import useCart from CartContext
import {Link , useLocation} from 'react-router-dom';

const Navbar = () => {
    const { cart } = useCart(); // Access the cart array from the context
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);  // Calculate the total item count in the cart

    // for changing the state of clicked nav bar item
    // const [menu, setMenu] = useState("home");
    const location = useLocation();

    const getActiveMenu = () => {
        switch (location.pathname) {
          case '/':
            return 'home';
          case '/wellness':
            return 'wellness';
          case '/medical_devices':
            return 'medicalDevices';
          case '/personal_care':
            return 'personalCare';
          case '/hearts':
            return 'hearts';
          case '/rent':
            return 'rent';
          case '/blog':
            return 'blog';
          default:
            return 'none';
        }
    };

    const activeMenu = getActiveMenu();

    //for displaying the nav bar when clicked span icon
    const [isClicked, setClicked] = useState(false);

    const toggleMenu = () => {
        setClicked((prevClicked) => !prevClicked);
    };

    // for dissapear nav bar clicked outside of navbar
    const navbarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                // Clicked outside the navbar
                setClicked(false);
            }
            if (event.target.closest('.nav-menu-span')) {
                // Clicked outside the navbar
                setClicked(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // handle login details
    const { isLoggedIn, userName, logout } = useUser();  // Access user state and logout function from context
    const [signInMessage, setSignInMessage] = useState("Sign In");
    const [pathForIcon, setpathForIcon] = useState('/sign_in');

    useEffect(() => {
        if (userName) {
          setSignInMessage(userName);
          setpathForIcon('/my_profile');
        } else {
          setSignInMessage("Sign In");
          setpathForIcon('/sign_in');
        }
    }, [isLoggedIn, userName]);

    // Handle logout action
    const handleLogout = () => {
        logout();  // Call logout from context
        setSignInMessage("Sign In");
    };

    // for searching products
    const handleSearch = (query) => {
        console.log('Searching for:', query);
    };

    return (
        <div className='navBar'>
            <div className='navBar-cloumn-1'>
                <Link className='nav-bar-link' to='/'>
                    <div className='nav-logo'>
                        <img src={logo} alt=''/>
                    </div>
                </Link>
                <ul className={isClicked ? 'nav-menu active' : 'nav-menu'} ref={navbarRef}>
                    <Link className='nav-bar-link' to='/'><li className={activeMenu === "home" ? "active" : ""}>Home{activeMenu === "home" ? <hr /> : null}</li></Link>
                    <Link className='nav-bar-link' to='/wellness'><li className={activeMenu === "wellness" ? "active" : ""}>Wellness{activeMenu === "wellness" ? <hr /> : null}</li></Link>
                    <Link className='nav-bar-link' to='/medical_devices'><li className={activeMenu === "medicalDevices" ? "active" : ""}>Medical Devices{activeMenu === "medicalDevices" ? <hr /> : null}</li></Link>
                    <Link className='nav-bar-link' to='/personal_care'><li className={activeMenu === "personalCare" ? "active" : ""}>Personal Care{activeMenu === "personalCare" ? <hr /> : null}</li></Link>
                    <Link className='nav-bar-link' to='/hearts'><li className={activeMenu === "hearts" ? "active" : ""}>Hearts{activeMenu === "hearts" ? <hr /> : null}</li></Link>
                    <Link className='nav-bar-link' to='/rent'><li className={activeMenu === "rent" ? "active" : ""}>Rent{activeMenu === "rent" ? <hr /> : null}</li></Link>
                    <Link className='nav-bar-link' to='/blog'><li className={activeMenu === "blog" ? "active" : ""}>Blog{activeMenu === "blog" ? <hr /> : null}</li></Link>
                </ul>
                <div className='nav-signin'>
                    <Link className='nav-bar-link' to={pathForIcon}>
                        <FaUser className='nav-icons'/>
                        <p id='sign-in'>{signInMessage}</p>
                    </Link>
                </div>
                <div className='nav-menu-span' onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className='navBar-cloumn-2'>
                <SearchBar className='navBar-search' onSearch={handleSearch}/>

                <div className='nav-upload-prescriptions'>
                    <Link className='nav-bar-link' to='/upload_prescriptions'>
                        <button>
                            <p>Upload Prescriptions</p>
                            <div className='nav-icons'>
                                <FaFileAlt/>
                            </div>
                        </button>   
                    </Link>
                    <Link className='nav-bar-link' to='/cart'>
                        <FaShoppingCart className='nav-icons'/>
                        <div className="nav-cart-count">{cartCount}</div> {/* Display dynamic cart count */}
                    </Link>
                    <Link className='nav-bar-link' to='/location'>
                        <FaMapMarkerAlt className='nav-icons'/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
