import React, {useState, useEffect } from 'react'
import './ProductDisplay.css';
import MedservLogo from '../../Common/Item/medserv_logo-for-products.png';
import { FaShoppingCart, FaStar} from 'react-icons/fa';
import { useCart } from "../../../../WebPages/Cart/CartContext";

const ProductDisplay = (props) => { 
    const {product} = props;
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    // for handling errors of images
    const [imageError, setImageError] = useState(false);  
    const handleImageError = () => {
      setImageError(true);
    };

    // Split description by newlines
    const lines = product.description.split('\n');

    // State to manage the quantity value
    const [quantity, setQuantity] = useState(1);

    // Function to handle increment
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    // Function to handle decrement
    const handleDecrement = () => {
        if (quantity > 1) {
        setQuantity(quantity - 1);
        }
    };

    // for add to cart
    const { addToCart } = useCart(); 
    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
        setConfirmationMessage(`Added ${quantity} ${product.name}(s) to your cart!`);
        setShowConfirmation(true); 
    };

    // Clear the toast after 3 seconds
    useEffect(() => {
        if (confirmationMessage) {
        const timer = setTimeout(() => {
            setConfirmationMessage(false);
        }, 3000);

        return () => clearTimeout(timer);
        }
    }, [confirmationMessage]);

    // Close button handler (confirm message)
    const handleClose = () => {
        setShowConfirmation(false);
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
                <p>Availability: &nbsp; <span className='value'>{product.availability}</span></p>
                <p>Price: &nbsp; <span className='value'>Rs. {product.price}</span></p>
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
                        // onChange={(e) => setQuantity(Number(e.target.value))} 
                        onChange={(e) => {
                            const newQuantity = Math.max(1, Number(e.target.value)); // Ensure quantity is at least 1
                            setQuantity(newQuantity);
                        }}
                        min="1" // Ensure the input can't go below 1
                    />
                    <p onClick={handleIncrement} className='quantity-change-button'>+</p>
                </div>
            </div>

            <div className='add-to-cart'>
                <button onClick={handleAddToCart}>
                    <FaShoppingCart className='cart-icon'/>
                    <p>Add to cart</p>
                </button>
            </div>
        </div>
        {/* Display the confirmation message */}
        {confirmationMessage && (
                <div className={`confirmation-message ${!showConfirmation ? 'hidden' : ''}`}>
                    <p>{confirmationMessage}</p>
                    {/* <button className="confirmation-message-btn" onClick={handleClose}>X</button> */}
                </div>
        )}
      </div>
    )
}

export default ProductDisplay
