import React, {useState} from 'react'
import './ProductDisplay.css';
import MedservLogo from '../../Common/Item/medserv_logo-for-products.png';
import { FaToolbox, FaStar } from 'react-icons/fa';

const ProductDisplay = (props) => {
    const {product} = props;

    // for handling errors of images
    const [imageError, setImageError] = useState(false);
  
    const handleImageError = () => {
      setImageError(true);
    };

    // Split description by newlines
    const lines = product.description.split('\n');
    const linesForRent = product.descriptionForRent.split('\n');

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

            <div className='item-name-rating-availability-extra'>
                <div className='item-name-topic'>
                    <p>{product.name}</p>  
                </div>

                <div className='ratings'>
                    <FaStar/> <FaStar/> <FaStar/> <FaStar/> <FaStar className='ratingStarA'/> <FaStar className='ratingStarA'/>
                </div>

                <div className='item-availability-price'>
                    <p>Availability: &nbsp; <div className='value'>{product.availability}</div></p>
                </div>
            </div>

            <div className='item-rent-prices'>
                <div className='item-rent-prices-grid'>
                    <div className='rental'>
                        Daily Rental: &nbsp;
                        <p>Rs. {product.DaillyRental}</p>  
                    </div>
                    <div className='rental'>
                        Weekly Rental: &nbsp;
                        <p>Rs. {product.WeeklyRental}</p>  
                    </div>
                    <div className='rental'>
                        Monthly Rental: &nbsp;
                        <p>Rs. {product.MonthlyRental}</p>  
                    </div>
                    <div className='rental'>
                        Deposit:&nbsp;
                        <p>Rs. {product.Deposit}</p>  
                    </div>
                </div>
            </div>
        </div>

        <div className='item-details'>
            <div className='item-name-rating-availability-rent'>
                <div className='item-name-topic'>
                    <p>{product.name}</p>  
                </div>

                <div className='ratings'>
                    <FaStar/> <FaStar/> <FaStar/> <FaStar/> <FaStar className='ratingStarA'/> <FaStar className='ratingStarA'/>
                </div>

                <div className='item-availability-price'>
                    <p>Availability: &nbsp; <div className='value'>{product.availability}</div></p>
                </div>
            </div>

            <div className='item-description'>
                {/* check if description is null or not */}
                {product.description ? (
                    <ul>
                        {/* {lines.map((line, index) => (
                            <li key={index} className='item-description-line'>
                                {line}
                            </li>
                        ))} */}
                        {product.description.split('|').map((line, index) => (
                            <li key={index} className='item-description-line'>
                                {line.trim()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='line-bullet-dash'>-</p> 
                )}
            </div>

            <div className='item-description'>
                <div className='item-description-for-rent'>
                    {/* for details of rent*/}
                    {/* check if description is null or not */}
                    {product.descriptionForRent ? (
                        <ul>
                            {linesForRent.map((line, index) => (
                                // <li key={index} className='item-description-line'>
                                //     {line}
                                // </li>
                                line.split('|').map((splitLine, splitIndex) => (
                                    <li key={`${index}-${splitIndex}`} className='item-description-line'>
                                      {splitLine.trim()}
                                    </li>
                                ))
                            ))}
                        </ul>
                    ) : (
                        <p className='line-bullet-dash'>-</p> 
                    )}
                </div>
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

            <div className='set-up-dates'>
                <p>Start Date:</p>
                <input type='date' placeholder='Start Date' id='startDate'></input>
                
                <p>End Date:</p>
                <input type='date' placeholder='End Date' id='endDate'></input>
            </div>

            <div className='add-to-cart'>
                <button>
                    <FaToolbox className='cart-icon-tool-box'/>
                    <p>Take For Rent</p>
                </button>
            </div>
        </div>
      </div>
    )
}

export default ProductDisplay
