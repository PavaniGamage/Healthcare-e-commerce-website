import React, {useState} from 'react'
import './Item.css'
import { FaShoppingCart} from 'react-icons/fa';
import { useCart } from "../../../../WebPages/CartContext";
import MedservLogo from './medserv_logo-for-products.png'


const Item = (props) => {
  // for handling errors of images
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();  // Destructure addToCart from useCart

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
            <p className='item-price'>Rs. {props.price.toFixed(2)}</p>
          </div>
          <button onClick={() => addToCart(props)}>
            <FaShoppingCart className='button-cart-icon'/>
            <p>Add to cart</p>
          </button>
        </div>
    </div>
  )
}

export default Item 