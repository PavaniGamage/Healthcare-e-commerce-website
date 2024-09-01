import React from 'react'
import './Shop.css'
import Item from '../Item/Item.jsx'
import wellness_products from '../../../Assets/Shop/Wellness/WellnessProducts.js'

const WellnessShop = () => {
  return (
    <div className='shop'>
        {wellness_products.map((item,i)=> {
            return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
        })}
    </div>
  )
}

export default WellnessShop