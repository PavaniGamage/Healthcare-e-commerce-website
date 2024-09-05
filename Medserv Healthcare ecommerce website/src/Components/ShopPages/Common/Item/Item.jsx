import React, {useState} from 'react'
import './Item.css'
import { FaShoppingCart} from 'react-icons/fa';
import MedservLogo from './medserv_logo-for-products.png'
import { Link } from 'react-router-dom';


const Item = (props) => {
  // for handling errors of images
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Set productID from props.id
  const productID = props.id; 

  return (
    <div className='item'>
        <div className='single-item'>
          <Link className='item-link' to={`/product/${productID}`}> 
            <div className='single-item-image'>
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
              <FaShoppingCart className='button-cart-icon'/>
              <p>Add to cart</p>
            </button>
          </Link>
        </div>
    </div>
  )
}

export default Item