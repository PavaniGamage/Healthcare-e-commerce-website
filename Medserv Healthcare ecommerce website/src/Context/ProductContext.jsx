import React, { createContext } from 'react'
import all_products from '../Components/Assets/Shop/AllProducts/AllProducts.js'

export const ProductContext = createContext(null);

const ProductContextProvider = ({children}) => {
    const contextValue = {all_products};

    return (
        <ProductContext.Provider value={all_products}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider 