import React from 'react'
import './Breadcrum.css';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Breadcrum = (props) => {
  const {product} = props;

  return (
    <div className='breadcrum'>
      <Link className='link' to={'/'}> <p>Home &nbsp;</p> </Link> <FaChevronRight className='FaChevronRight'/> 
      <p>&nbsp; Shop &nbsp;</p><FaChevronRight className='FaChevronRight'/> 
      
      {
        product.category1 === "MedicalDevices" && (
          <>
            <Link className='link' to='/medical_devices'>
              <p>&nbsp; {product.category1} &nbsp;</p>
            </Link>
            <FaChevronRight className='FaChevronRight' />
          </>
        )
      }

      {
        product.category1 === "Wellness" && (
          <>
            <Link className='link' to='/wellness'>
              <p>&nbsp; {product.category1} &nbsp;</p>
            </Link>
            <FaChevronRight className='FaChevronRight' />
          </>
        )
      }

      {
        product.category1 === "PersonalCare" && (
          <>
            <Link className='link' to='/personal_care'>
              <p>&nbsp; {product.category1} &nbsp;</p>
            </Link>
            <FaChevronRight className='FaChevronRight' />
          </>
        )
      }

      {
        product.category1 === "rent" && (
          <>
            <Link className='link' to='/rent'>
              <p>&nbsp; Rent &nbsp;</p>
            </Link>
            <FaChevronRight className='FaChevronRight' />
          </>
        )
      }

      <p>&nbsp; {product.name}</p>
    </div>
  )
}

export default Breadcrum