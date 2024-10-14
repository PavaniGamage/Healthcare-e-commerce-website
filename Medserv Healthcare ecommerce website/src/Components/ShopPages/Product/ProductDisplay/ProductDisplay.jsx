import React, {useState} from 'react'
import './ProductDisplay.css';
import MedservLogo from '../../Common/Item/medserv_logo-for-products.png';
import { FaShoppingCart, FaStar} from 'react-icons/fa';

const ProductDisplay = (props) => { 
    const {product} = props;

    // for handling errors of images
    const [imageError, setImageError] = useState(false);
  
    const handleImageError = () => {
      setImageError(true);
    };

    // Split description by newlines
    const lines = product.description.split('\n');

    // State to manage the quantity value
    const [quantity, setQuantity] = useState(0);

    // Function to handle increment
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    // Function to handle decrement
    const handleDecrement = () => {
        if (quantity > 0) {
        setQuantity(quantity - 1);
        }
    };
  
    return (
      <div className='product-display'>
        <div className='item-image-rent-price'>
            <div className='item-image'>
                {!imageError ? (
                    <img src={product.image} alt='' onError={handleImageError}/>
                ) : (
                    <img src={MedservLogo} className='item-img-error'/>
                )}
            </div>
        </div>

        <div className='item-details'>
            <div className='item-name-topic'>
                <p>{product.name}</p>  
            </div>

            <div className='ratings'>
                <FaStar/> <FaStar/> <FaStar/> <FaStar/> <FaStar className='ratingStarA'/> <FaStar className='ratingStarA'/>
            </div>

            <div className='item-availability-price'>
                <p>Availability: &nbsp; <div className='value'>{product.availability}</div></p>
                <p>Price: &nbsp; <div className='value'>{product.price}</div></p>
            </div>

            <div className='item-description'>
                {/* check if description is null or not */}
                {product.description ? (
                    <ul>
                        {lines.map((line, index) => (
                            <li key={index} className='item-description-line'>
                                {line}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='line-bullet-dash'>-</p> 
                )}
            </div>

            <div className='quantity'>
                Quantity:  
                <div className='quantity-inputs'>
                    <p onClick={handleDecrement} className='quantity-change-button'>-</p>
                    <input 
                        type='number' 
                        className='quantity-input' 
                        value={quantity} 
                        onChange={(e) => setQuantity(Number(e.target.value))} 
                    />
                    <p onClick={handleIncrement} className='quantity-change-button'>+</p>
                </div>
            </div>

            <div className='add-to-cart'>
                <button>
                    <FaShoppingCart className='cart-icon'/>
                    <p>Add to cart</p>
                </button>
            </div>
        </div>
      </div>
    )
}

export default ProductDisplay
