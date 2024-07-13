import React from 'react'
import './Footer.css'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

import logo from '../Assets/medserv_logo.png';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-logo'>
        <div className='footer-logo-logo'>
          <img src={logo}/>
          <p>MEDSERV</p>
        </div>
        <p className='footer-logo-quote'>Your Health, Our Priority</p>
      </div>
      <div className='footer-links-social-media'>
        <p className='footer-title'>Find Us In Social Media</p>
        <div className='footer-links-social-media-icons'>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook class='footer-links-social-media-icons-icon'/>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter class='footer-links-social-media-icons-icon' />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram class='footer-links-social-media-icons-icon'/>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin class='footer-links-social-media-icons-icon'/>
          </a>
        </div>
      </div>
      <div className='footer-links-shop'>
        <p className='footer-title'>Shop</p>
        <li>Wellness</li>
        <li>Medical Devices</li>
        <li>Personal Care</li> 
        <li>Rent</li>
      </div>
      <div className='footer-links-medserv'>
        <p className='footer-title'>Medserv</p>
        <li>About</li>
        <li>Contact</li> 
      </div>
      <div className='footer-links-other'>
        <p className='footer-title'>Other</p>
        <li>Hearts</li>
        <li>Blog</li> 
        <div className='footer-contact-us'>
          <h1 className='footer-title'>Contact Us</h1>
          <p>Reach us,</p>
          <li>By email: medserv@gmail.com</li>
          <li>By phone: +94764758800</li>
        </div>
      </div>
    </div>
  )
}

export default Footer