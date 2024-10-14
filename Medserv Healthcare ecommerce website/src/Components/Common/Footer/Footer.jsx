import React from 'react'
import './Footer.css'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../Assets/Footer/medserv_logo.png';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <div className='footer-logo'>
          <Link to="/" className='footer-link' onClick={() => window.scrollTo(0, 0)}>
            <div className='footer-logo-logo'>
              <img src={logo}/>
              <p>MEDSERV</p>
            </div>
            <p className='footer-logo-quote'>Your Health, Our Priority</p>
          </Link>
        </div>
        
        <div className='footer-links-social-media'>
          <p className='footer-title'>Find Us In Social Media</p>
          <div className='footer-links-social-media-icons'>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className='footer-links-shop'>
          <p className='footer-title'>Shop</p>
          <Link to="/wellness" className='footer-link' onClick={() => window.scrollTo(0, 0)}><li>Wellness</li></Link>
          <Link to="/medical_devices" className='footer-link' onClick={() => window.scrollTo(0, 0)}><li>Medical Devices</li></Link>
          <Link to="/personal_care" className='footer-link' onClick={() => window.scrollTo(0, 0)}><li>Personal Care</li></Link> 
          <Link to="/rent" className='footer-link' onClick={() => window.scrollTo(0, 0)}><li>Rent</li></Link>
        </div>
        <div className='footer-links-medserv'>
          <p className='footer-title'>Medserv</p>
          <Link to="/" className='footer-link' onClick={() => window.scrollTo(0, 0)}><li>About</li></Link>
          <Link to="/" className='footer-link' onClick={() => window.scrollTo(0, 0)}><li>Contact</li></Link> 
        </div>
        <div className='footer-links-other'>
          <p className='footer-title'>Other</p>
          <Link to="/hearts" className='footer-link' onClick={() => window.scrollTo(0, 0)}><li>Hearts</li></Link>
          <Link to="/blog" className='footer-link' onClick={() => window.scrollTo(0, 0)}><li>Blog</li></Link> 
          <div className='footer-contact-us'>
            <h1 className='footer-title'>Contact Us</h1>
            <p>Reach us,</p>
            <li>By email: medserv@gmail.com</li>
            <li>By phone: +94764758800</li>
          </div>
        </div>
      </div>

      <div className='footer-copyright'>
        <hr/>
        <p>Copyright @ 2024 - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer 