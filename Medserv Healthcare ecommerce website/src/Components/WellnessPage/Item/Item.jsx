import React from 'react'
import './Item.css'
import { FaShoppingCart} from 'react-icons/fa';


const Item = (props) => {
  return (
    <div className='item'>
        <div className='single-item'>
          <img src={props.image} alt=''/>
          <p className='item-name'>{props.name}</p>
          <p className='item-price'>{props.price}</p>
          <button>
            <FaShoppingCart className='button-cart-icon'/>
            <p>Add to cart</p>
          </button>
        </div>
    </div>
  )
}

export default Item