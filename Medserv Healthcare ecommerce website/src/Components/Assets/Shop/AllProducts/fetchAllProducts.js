// -----------------------------------------------------------------------
async function fetchAllProducts() {
    try {
        const response = await fetch('http://localhost:4000/formattedProducts');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export default fetchAllProducts;
