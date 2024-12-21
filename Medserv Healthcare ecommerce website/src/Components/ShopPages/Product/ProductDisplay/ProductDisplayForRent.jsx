import React, {useState} from 'react'
import './ProductDisplay.css';
import MedservLogo from '../../Common/Item/medserv_logo-for-products.png';
import { FaToolbox, FaStar, FaCalculator  } from 'react-icons/fa';

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

    // rent calculations
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalRent, setTotalRent] = useState(0);
    const [months, setMonths] = useState(0);
    const [weeks, setWeeks] = useState(0);
    const [days, setDays] = useState(0);

    // Get today's date in the format 'YYYY-MM-DD'
    const today = new Date().toISOString().split('T')[0];

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const calculateRent = () => {
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }
    
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        if (start >= end) {
            alert("End date must be after start date.");
            return;
        }

        if (quantity < 1) {
            alert("Enter the quantity you want.");
            return;
        }

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
    
            // Calculate total duration in milliseconds
            const diffTime = Math.abs(end - start);
    
            // Convert time difference to days
            const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
            // Calculate months, weeks, and remaining days
            const months = Math.floor(totalDays / 30); // Approximate a month as 30 days
            const weeks = Math.floor((totalDays % 30) / 7);
            const days = totalDays % 7;
    
            // Calculate the rent based on the duration
            const monthlyRent = Number(product.MonthlyRental);
            const weeklyRent = Number(product.WeeklyRental);
            const dailyRent = Number(product.DaillyRental);
            const deposit = Number(product.Deposit);
    
            // Calculate the total rent
            const totalMonthlyRent = Number(months * monthlyRent);
            const totalWeeklyRent = Number(weeks * weeklyRent);
            const totalDailyRent = Number(days * dailyRent);
    
            // Total rent is the sum of all applicable rents and deposit
            const totalRentAmount = Number(totalMonthlyRent + totalWeeklyRent + totalDailyRent);
    
            // Total rent * Quantity
            const totalRentAmountAccordingToQuantity = Number((totalRentAmount * quantity)  + deposit);

            // Set the calculated values in the state
            setMonths(months);
            setWeeks(weeks);
            setDays(days);
            setTotalRent(totalRentAmountAccordingToQuantity);
        }
    };

    // Reservation
    const [showContact, setShowContact] = useState(false);

    const handleReserveNow = () => {
        setShowContact(true); 
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
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            if (Number.isInteger(value)) {
                                setQuantity(Math.max(1, value)); // Ensure the number is at least 1
                            }
                        }}
                        min="1" 
                        step="1" 
                    />
                    <p onClick={handleIncrement} className='quantity-change-button'>+</p>
                </div>
            </div> 

            <div className='set-up-dates'>
                <p>Start Date:</p>
                <input type='date' value={startDate} onChange={handleStartDateChange} placeholder='Start Date' id='startDate' min={today}></input>
                
                <p>End Date:</p>
                <input type='date' value={endDate} onChange={handleEndDateChange} placeholder='End Date' id='endDate' min={today}></input>
            </div>

            <div className='add-to-cart'>
                <button onClick={calculateRent} className='calculate-rent-button'>
                    <FaCalculator className='cart-icon-tool-box'/>
                    <p>Calculate Rent</p>
                </button>
                <br/>
                <table className='table-rent-result'>
                    <thead><tr><th>Details</th><th>Value</th></tr></thead>
                    <tbody>
                        <tr><td>Total Rent :</td><td>Rs. {totalRent.toFixed(2)}</td></tr>
                        {quantity > 0 && <tr><td>Quantity : </td><td>{quantity}</td></tr>}
                        {months > 0 && <tr><td>Months : </td><td>{months}</td></tr>}
                        {weeks > 0 && <tr><td>Weeks : </td><td>{weeks}</td></tr>}
                        {days > 0 && <tr><td>Days : </td><td>{days}</td></tr>}
                    </tbody>
                </table>
                <br/>
            </div>

            <div className='add-to-cart'>
                <button>
                    <FaToolbox className='cart-icon-tool-box'/>
                    <p onClick={handleReserveNow}>Reserve Now</p>
                </button>
            </div>

            {showContact && (
                <div className='contact' id='contact-for-reservation'>
                    <p>Please contact us for more details about rental.</p>
                    <p className='contact-topic'>Contact Details:</p>
                    <p><strong>Email: </strong> medserv@gmail.com</p>
                    <p><strong>Phone: </strong> +94 11 2345678</p>
                </div>
            )}
        </div>
      </div>
    )
}

export default ProductDisplay
