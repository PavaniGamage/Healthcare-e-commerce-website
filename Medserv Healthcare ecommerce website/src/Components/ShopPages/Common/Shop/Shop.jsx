import React from 'react'
import './Shop.css'
import Item from '../Item/Item.jsx'
import ItemForRent from '../Item/ItemForRent.jsx'
import all_products from '../../../Assets/Shop/AllProducts/AllProducts.js'
import {FaAngleDown} from 'react-icons/fa'

const shop = ({category1}) => {
  return (
    <div className='shop'> 
      <div className='sort'>
        <div className='category-index-sort'>
            <p>
              <span>Showing 1-12</span> out of 100 products
            </p>
        </div>
        <div className='category-sort'>
          <p>Sort by</p> 
          <FaAngleDown className='category-sort-FaAngleDown'/>
        </div>
      </div>
      
      <div className='shop-items'>
          {all_products.map((item,i)=> {
            if (category1==="rent") {
              if (category1===item.category1) {
                return <ItemForRent key={i} id={item.id} name={item.name} 
                    image={item.image} price={item.price} 
                    category1={item.category1} category2={item.category2}
                    dailyRental={item.DaillyRental}/>
                } else {
                    return null;
              } 
            } else {
              if (category1===item.category1) {
                return <Item key={i} id={item.id} name={item.name} 
                    image={item.image} price={item.price} 
                    category1={item.category1} category2={item.category2}/>
                } else {
                    return null;
              }
            }
          })}
      </div>

      <div className='lordmore'>
        <p>Explore more</p>
        <FaAngleDown className='category-sort-FaAngleDown'/>
      </div>
    </div>
  )
}

export default shop