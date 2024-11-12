import React from 'react';
import './WebPages CSS/Cart.css';
import { useCart } from './CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();

  const handleBuyNow = () => {
    alert('Thank you for your purchase!');
    clearCart();
  };

  return (
    <div className='cart-page'>
      <h2>Your Cart</h2>
      <div className='cart-items'>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className='cart-item'>
              <img src={item.image} alt={item.name} className='cart-item-image' />
              <div className='cart-item-details'>
                <p className='cart-item-name'>{item.name}</p>
                <p className='cart-item-price'>Rs.{item.price.toFixed(2)}</p>
                <div className='cart-item-quantity'>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <h3>Total: Rs.{total.toFixed(2)}</h3>
      <div className='cart-actions'>
        <button onClick={clearCart} className='clear-cart-button'>Clear Cart</button>
        <button onClick={handleBuyNow} className='buy-now-button'>Buy Now</button>
      </div>
    </div>
  );
};

export default Cart;
