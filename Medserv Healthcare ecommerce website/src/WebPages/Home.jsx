import React from 'react'
import MainBanner from '../Components/HomePage/MainBanner/MainBanner'
import CategoriesInHome from '../Components/HomePage/CategoriesInHome/CategoriesInHome'
import SendUsMessage from '../Components/HomePage/SendUsMessage/SendUsMessage'

const Home = () => {
  return (
    <div>
      <MainBanner/>
      <CategoriesInHome/>
      <SendUsMessage/>
    </div>
  )
}

export default Home