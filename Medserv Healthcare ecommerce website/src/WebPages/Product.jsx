// import React, { useEffect, useState } from 'react'
// import './WebPages CSS/Product.css'
// import { useParams } from 'react-router-dom';
// import all_products from '../Components/Assets/Shop/AllProducts/AllProducts.js';
// import Breadcrum from '../Components/ShopPages/Product/Breadcrum/Breadcrum';
// import DisplayProduct from '../Components/ShopPages/Product/ProductDisplay/ProductDisplay';
// import DisplayProductForRent from '../Components/ShopPages/Product/ProductDisplay/ProductDisplayForRent.jsx';
// import RelativeProducts from '../Components/ShopPages/Product/RelativeProducts/RelativeProducts.jsx';

// const Product = () => {
//   const { productID } = useParams(); // Get the product ID from URL parameters
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     // Find the specific product based on the productID
//     const foundProduct = all_products.find(item => item.id === productID);
//     setProduct(foundProduct);
//   }, [productID]);

//   return (
//     <div className='product-content'>
//       {product ? (
//         <>
//           <Breadcrum product={product}/>
//           <h1>{product.name}</h1>
//           {product.category1 === "rent" ? (
//             <DisplayProductForRent product={product}/>
//           ) : (
//             <DisplayProduct product={product}/>
//           )}
//           <RelativeProducts product={product}/>
//         </>
//       ) : (
//         <p>Product not found</p> // Handling case where product is not found
//       )}
//     </div>
//   );
// };

// export default Product

// -----------------------------------------------------------------------------
import React, { useEffect, useState } from 'react';
import './WebPages CSS/Product.css';
import { useParams } from 'react-router-dom';
import createProductsArray from '../Components/Assets/Shop/AllProducts/AllProducts.js';
import Breadcrum from '../Components/ShopPages/Product/Breadcrum/Breadcrum';
import DisplayProduct from '../Components/ShopPages/Product/ProductDisplay/ProductDisplay';
import DisplayProductForRent from '../Components/ShopPages/Product/ProductDisplay/ProductDisplayForRent.jsx';
import RelativeProducts from '../Components/ShopPages/Product/RelativeProducts/RelativeProducts.jsx';

const Product = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const { productID } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      const products = await createProductsArray();
      setAllProducts(products);
      setLoading(false); // End loading after fetching
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!loading && Array.isArray(allProducts)) { // Wait until loading is complete
      const foundProduct = allProducts.find(item => item.id === productID);
      setProduct(foundProduct || null); // Handle case if the product is not found
    }
  }, [productID, allProducts, loading]);

  return (
    <div className='product-content'>
      {loading ? (
        <p className='text-center text-lg text-gray-600 py-8'>Loading product...</p>
      ) : product ? (
        <>
          <Breadcrum product={product} />
          <h1>{product.name}</h1>
          {product.category1 === "Rent" ? (
            <DisplayProductForRent product={product} />
          ) : (
            <DisplayProduct product={product} />
          )}
          <RelativeProducts product={product} />
        </>
      ) : (
        <p className='text-center text-lg text-gray-600 py-8'>Product not found</p>
      )}
    </div>
  );
};

export default Product;

