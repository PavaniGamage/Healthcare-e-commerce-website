import React, { useEffect, useState } from 'react'
import './WebPages CSS/Product.css'
import { useParams } from 'react-router-dom';
import all_products from '../Components/Assets/Shop/AllProducts/AllProducts.js';
import Breadcrum from '../Components/ShopPages/Product/Breadcrum/Breadcrum';
import DisplayProduct from '../Components/ShopPages/Product/ProductDisplay/ProductDisplay';
import DisplayProductForRent from '../Components/ShopPages/Product/ProductDisplay/ProductDisplayForRent.jsx';
import RelativeProducts from '../Components/ShopPages/Product/RelativeProducts/RelativeProducts.jsx';

const Product = () => {
  const { productID } = useParams(); // Get the product ID from URL parameters
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Find the specific product based on the productID
    const foundProduct = all_products.find(item => item.id === productID);
    setProduct(foundProduct);
  }, [productID]);

  return (
    <div className='product-content'>
      {product ? (
        <>
          <Breadcrum product={product}/>
          <h1>{product.name}</h1>
          {product.category1 === "rent" ? (
            <DisplayProductForRent product={product}/>
          ) : (
            <DisplayProduct product={product}/>
          )}
          <RelativeProducts product={product}/>
        </>
      ) : (
        <p>Product not found</p> // Handling case where product is not found
      )}
    </div>
  );
};

export default Product