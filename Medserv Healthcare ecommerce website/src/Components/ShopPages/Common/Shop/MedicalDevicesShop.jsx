import React from 'react'
import './Shop.css'
import Item from '../Item/Item.jsx'
import medical_deices_products from '../../../Assets/Shop/MedicalDevices/MedicalDevicesProducts.js'

const MedicalDevicesShop = () => {
  return (
    <div className='shop'>
        {medical_deices_products.map((item,i)=> {
            return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
        })}
    </div>
  )
}

export default MedicalDevicesShop