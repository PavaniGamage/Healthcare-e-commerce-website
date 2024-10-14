import React from 'react'
import './RelativeProducts.css';
import Item from './Item/Item.jsx'
import ItemForRent from './Item/ItemForRent.jsx'
import all_products from '../../../Assets/Shop/AllProducts/AllProducts.js'


const RelativeProducts = (props) => {
    const {product} = props;
    const category1 = product.category1;
    const category2 = product.category2;

    // Get all products except the current product
    const relatedProducts = all_products.filter(item => item.id !== product.id);

    return (
        <div className='relative-products'>
            <hr/>
            <h2>Related Products</h2>

            <div className='shop-items-for-relative-products'>
                {relatedProducts.map((item,i)=> {
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
        </div>
    )
}

export default RelativeProducts