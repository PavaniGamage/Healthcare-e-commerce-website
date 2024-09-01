import React from 'react'
import './Shop.css'
import ItemForRent from '../Item/ItemForRent.jsx'
import rent_products from '../../../Assets/Shop/Rent/RentProducts.js'


const RentShop = () => {
  return (
     <div className='shop'>
        {rent_products.map((item,i)=> {
            return <ItemForRent key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
        })}
    </div>
  )
}

export default RentShop