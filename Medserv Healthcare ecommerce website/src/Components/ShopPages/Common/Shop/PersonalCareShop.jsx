import React from 'react'
import './Shop.css'
import Item from '../Item/Item.jsx'
import personal_care_products from '../../../Assets/Shop/PersonalCare/PersonalCareProducts.js'


const PersonalCareShop = () => {
  return (
    <div className='shop'>
        {personal_care_products.map((item,i)=> {
            return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
        })}
    </div>
  )
}

export default PersonalCareShop