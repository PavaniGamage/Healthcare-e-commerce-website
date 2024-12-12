import React, {useState, useEffect} from 'react'
import './Item.css'
import { FaShoppingCart} from 'react-icons/fa';
import { useCart } from "../../../../WebPages/Cart/CartContext";
import MedservLogo from './medserv_logo-for-products.png'
import ToastMessage from './ToastMessage/ToastMessage';
import { Link } from 'react-router-dom';

const Item = (props) => {
  // for handling errors of images
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };

  // Set productID from props.id
  const productID = props.id; 

  // for add to cart
  const { addToCart } = useCart();

  // for toast message
  const [toast, setToast] = useState(null);
  
  // Show toast and clear previous toast immediately
  const showToast = (message, type = 'info') => {
    setToast(null); // Clear the current toast
    setToast({ message, type }); // Show new toast
  };

  // Clear the toast after 3 seconds whenever toast changes
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className='item'>
        <div className='single-item'>
          <div className='item-link'> 
            <Link className='item-link-link' to={`/product/${productID}`}>
              <div className='single-item-image'>
                {!imageError ? (
                      <img src={props.image} alt='' onError={handleImageError}/>
                  ) : (
                      <img src={MedservLogo} className='single-item-img-error'/>
                )}
              </div>
              <div className='item-link-details'>
                <p className='item-name'>{props.name}</p>
                <p className='item-price'>Rs. {props.price}</p>
              </div>
            </Link>
            {/* <button onClick={() => addToCart(props)}> */}
            <button 
              className='item-btn'
              onClick={() => {
                addToCart(props); // Add item to cart
                showToast(`${props.name} has been added to the cart!`, 'success'); // Show success toast
              }}
            >
              <FaShoppingCart className='button-cart-icon'/>
              <p>Add to cart</p>
            </button>
          </div>
        </div>

        {/* Display toast message */}
        {toast && <ToastMessage message={toast.message} type={toast.type} />}
    </div>
  )
}

export default Item 