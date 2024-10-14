import React from 'react'
import './Breadcrum.css';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Breadcrum = (props) => {
  const {product} = props;

  return (
    <div className='breadcrum'>
      <div className='breadcrum_links'>
        <Link className='link' to={'/'} onClick={() => window.scrollTo(0, 0)}> <p>Home</p> </Link> <FaChevronRight className='FaChevronRight'/> 
      </div>
      <div className='breadcrum_links'>
        <p>Shop</p><FaChevronRight className='FaChevronRight'/> 
      </div>

      {
        product.category1 === "MedicalDevices" && (
          <>
            <div className='breadcrum_links'>
              <Link className='link' to='/medical_devices' onClick={() => window.scrollTo(0, 0)}>
                <p>{product.category1}</p>
              </Link>
              <FaChevronRight className='FaChevronRight' />
            </div>
          </>
        )
      }

      {
        product.category1 === "Wellness" && (
          <>
            <div className='breadcrum_links'>
              <Link className='link' to='/wellness' onClick={() => window.scrollTo(0, 0)}>
                <p>{product.category1}</p>
              </Link>
              <FaChevronRight className='FaChevronRight' />
            </div>
          </>
        )
      }

      {
        product.category1 === "PersonalCare" && (
          <>
            <div className='breadcrum_links'>
              <Link className='link' to='/personal_care' onClick={() => window.scrollTo(0, 0)}>
                <p>{product.category1}</p>
              </Link>
              <FaChevronRight className='FaChevronRight' />
            </div>
          </>
        )
      }

      {
        product.category1 === "rent" && (
          <>
            <div className='breadcrum_links'>
              <Link className='link' to='/rent' onClick={() => window.scrollTo(0, 0)}>
                <p>Rent</p>
              </Link>
              <FaChevronRight className='FaChevronRight' />
            </div>
          </>
        )
      }

      <div className='breadcrum_links'>
        <p>{product.name}</p>
      </div>
    </div>
  )
}

export default Breadcrum