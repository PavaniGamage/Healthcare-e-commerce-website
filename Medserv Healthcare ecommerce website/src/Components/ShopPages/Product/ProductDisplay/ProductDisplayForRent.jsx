import React, {useState} from 'react'
import './ProductDisplay.css';
import MedservLogo from '../../Common/Item/medserv_logo-for-products.png';
import { FaToolbox, FaStar } from 'react-icons/fa';

const ProductDisplay = (props) => {
    const {product} = props;

    const handleReserveNow = () => {
        const email = 'medserv@gmail.com'; // Replace with your actual email
        window.location.href = `mailto:${email}?subject=Reservation Inquiry&body=Hi, I am interested in reserving the product: ${product.name}`;
    };


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
     // Rent calculation states
     const [startDate, setStartDate] = useState('');
     const [endDate, setEndDate] = useState('');
     const [totalRent, setTotalRent] = useState(0);
 
     // Function to calculate rent
     const calculateRent = () => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
    
            if (end > start) {
                const timeDiff = end - start;
                const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Total days
    
                let rent = 0;
    
                // Break the days into months, weeks, and remaining days
                const months = Math.floor(days / 30); // Full months
                const remainingDaysAfterMonths = days % 30;
    
                const weeks = Math.floor(remainingDaysAfterMonths / 7); // Full weeks
                const remainingDays = remainingDaysAfterMonths % 7; // Remaining days
    
                // Calculate rent
                rent += months * product.MonthlyRental;
                rent += weeks * product.WeeklyRental;
                rent += remainingDays * product.DaillyRental;
    
                // Multiply by quantity
                setTotalRent(rent * quantity);
            } else {
                alert('End Date must be after Start Date.');
            }
        } else {
            alert('Please select both Start Date and End Date.');
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
                        <p>{product.DaillyRental}</p>  
                    </div>
                    <div className='rental'>
                        Weekly Rental: &nbsp;
                        <p>{product.WeeklyRental}</p>  
                    </div>
                    <div className='rental'>
                        Monthly Rental: &nbsp;
                        <p>{product.MonthlyRental}</p>  
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

            <div className='item-description'>
                <div className='item-description-for-rent'>
                    {/* for details of rent*/}
                    {/* check if description is null or not */}
                    {product.descriptionForRent ? (
                        <ul>
                            {linesForRent.map((line, index) => (
                                <li key={index} className='item-description-line'>
                                    {line}
                                </li>
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
                <input type='date' placeholder='Start Date' id='startDate'  onChange={(e) => setStartDate(e.target.value)}></input>
                
                <p>End Date:</p>
                <input type='date' placeholder='End Date' id='endDate'  onChange={(e) => setEndDate(e.target.value)}></input>
            </div>
            <div className='calculate-rent'>
                    <button onClick={calculateRent} className='calculate-rent-button'>
                        Calculate Rent
                    </button>
                    <p>Total Rent: <span>{totalRent}</span></p>
                </div>

            <div className='add-to-cart'>
            <button onClick={handleReserveNow}>
                    <FaToolbox className='cart-icon-tool-box'/>
                    <p>Reserve Now</p>
                </button>
            </div>
        </div>
      </div>
    )
}

export default ProductDisplay
