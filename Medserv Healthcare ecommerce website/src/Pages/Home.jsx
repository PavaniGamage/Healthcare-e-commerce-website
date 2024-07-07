import React from 'react'
import HeroSection from '../Components//HomePage/HeroSection'
import Products from '../Components/HomePage/Products'
import DonationSection from '../Components/HomePage/DonationSection'
import Contact from '../Components/HomePage/Contact'


function Home() {
  return (
    <div>
      <HeroSection />
      <Products />
      <DonationSection />
      <Contact />
    </div>
  )
}

export default Home