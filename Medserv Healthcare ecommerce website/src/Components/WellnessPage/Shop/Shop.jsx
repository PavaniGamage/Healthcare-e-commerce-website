import React from 'react'
import './Shop.css'
import Item from '../Item/Item.jsx'
import all_products from '../Assets/all_product'

const Shop = () => {
  return (
    <div className='shop'>
        {all_products.map((item,i)=> {
            return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
        })}
    </div>
  )
}

export default Shop