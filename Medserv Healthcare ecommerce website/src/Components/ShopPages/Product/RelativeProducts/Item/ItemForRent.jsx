import React, {useState} from 'react'
import './Item.css'
import {FaEye} from 'react-icons/fa';
import MedservLogo from './medserv_logo-for-products.png'
import { Link } from 'react-router-dom'; 

const ItemForRent = (props) => {
  // for handling errors of images
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Set productID from props.id
  const productID = props.id;

  return (
    <div className='item-relative'>
      <div className='single-item-relative'>
        <Link className='item-link-relative' to={`/product/${productID}`} onClick={window.scrollTo(0,0)}>
          <div className='single-item-image-relative'>
            {/* <img src={props.image} alt=''/> */}
            {!imageError ? (
                  <img src={props.image} alt='' onError={handleImageError}/>
              ) : (
                  <img src={MedservLogo} className='single-item-img-error-relative'/>
            )}
          </div>
          <div>
            <p className='item-name-relative'>{props.name}</p>
            <p className='item-price-relative'>Rs. {props.dailyRental} /Day</p>
          </div>
          <button>
            <FaEye className='button-eye-icon-relative'/>
            <p>View More</p>
          </button>
        </Link>
      </div>
      <br/>
    </div>
  )
}

export default ItemForRent