import React from 'react';
import '../WebPages CSS/Cart.css';
import { useCart } from './CartContext';
import fallbackImage from '../../Components/ShopPages/Common/Item/medserv_logo-for-products.png';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, total, totalItemCount } = useCart();

  const handleBuyNow = () => {
    alert('Thank you for your purchase!');
    clearCart();
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
        <button onClick={handleBuyNow} className='buy-now-button'>Buy Now</button>
      </div>
    </div>
  );
};

export default Cart;

