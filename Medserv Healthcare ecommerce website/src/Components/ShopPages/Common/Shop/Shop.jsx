import React from 'react'
import './Shop.css'
import Item from '../Item/Item.jsx'
import all_products from '../../../Assets/Shop/all_product.js'

const shop = () => {
  return (
    <div className='shop'>
        {all_products.map((item,i)=> {
            return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
        })}
    </div>
  )
}

export default shop