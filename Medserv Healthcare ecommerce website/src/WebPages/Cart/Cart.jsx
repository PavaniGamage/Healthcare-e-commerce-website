import React from 'react';
import '../WebPages CSS/Cart.css';
import { useCart } from './CartContext';
import fallbackImage from '../../Components/ShopPages/Common/Item/medserv_logo-for-products.png';
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, total, totalItemCount } = useCart();
  console.log(cart);

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      
      if (!stripe) {
        console.error('Failed to load Stripe.');
        return;
      }
      
      const body = {
        products: cart
      }

      const headers = {
        "Content-Type": "application/json"
      }

      if (!cart || cart.length === 0) {
        console.error("Cart is empty. Cannot proceed to checkout.");
        alert("Cart is empty. Please add some products first..");
        return;
      }

      if (total < 200) {
        console.error("The minimum purchase amount is Rs. 200.00");
        alert("The minimum purchase amount is Rs. 200.00. Please add more items to your cart.");
        return;
      }

      console.log("Cart being sent to backend:", cart);
      
      const response = await fetch("http://localhost:4000/api/checkout/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: cart }),
      });
  
      if (!response.ok) {
        const error = await response.text();
        console.error("Backend error:", error);
        return;
      }
  
      const session = await response.json();
      if (!session.id) {
        console.error("Session ID missing from response:", session);
        return;
      }
  
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (result.error) {
        console.error("Stripe Checkout error:", result.error.message);
      }
    } catch (error) {
      console.error("Error in makePayment:", error);
      alert("An error occurred");
    }
  };

  const handleImageError = (event) => {
    event.target.src = fallbackImage; // Use fallback image on error
  };

  return (
    <div className='cart-page'>
      <h2>Your Cart</h2>
      <div className='cart-items'>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className='cart-item'>
              <img
                src={item.image}
                alt={item.name}
                className='cart-item-image'
                onError={handleImageError}
              />
              <div className='cart-item-details'>
                <p className='cart-item-name'>{item.name}</p>
                <p className='cart-item-price'>Rs.{item.price.toFixed(2)}</p>
                <div className='cart-item-quantity'>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1} // Disable if quantity is 1
                    className='quantity-button'
                  >
                    -
                  </button>
                  <span className='quantity-count'>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className='quantity-button'
                  >
                    +
                  </button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className='remove-button'>
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <hr className='hr-line'/>
      <div className='cart-summary'>
        <h3>Total Items: &nbsp; {totalItemCount}</h3>
        <h3>Total Price: &nbsp; Rs.{total.toFixed(2)}</h3>
      </div>
      <hr className='hr-line'/>
    
      <div className='cart-actions'>
        <button onClick={clearCart} className='clear-cart-button'>Clear Cart</button>
        <button onClick={makePayment} className='buy-now-button'>
          Buy Now
          </button>
      </div>
    </div>
  );
};

export default Cart;

