import React, {useState} from 'react'
import './Item.css'
import {FaEye} from 'react-icons/fa';
import MedservLogo from './medserv_logo-for-products.png'

const ItemForRent = (props) => {
  // for handling errors of images
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className='item'>
    <div className='single-item'>
      <div className='single-item-image'>
        {/* <img src={props.image} alt=''/> */}
        {!imageError ? (
              <img src={props.image} alt='' onError={handleImageError}/>
          ) : (
              <img src={MedservLogo} className='single-item-img-error'/>
        )}
      </div>
      <div>
        <p className='item-name'>{props.name}</p>
        <p className='item-price'>{props.price}</p>
      </div>
      <button>
        <FaEye className='button-cart-icon'/>
        <p>View More</p>
      </button>
    </div>
</div>
  )
}

export default ItemForRent