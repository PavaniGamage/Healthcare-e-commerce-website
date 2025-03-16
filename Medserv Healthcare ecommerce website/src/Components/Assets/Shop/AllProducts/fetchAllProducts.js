// -----------------------------------------------------------------------
// async function fetchAllProducts() {
//     try {
//         const response = await fetch('http://localhost:4000/formattedProducts');
//         if (!response.ok) {
//             throw new Error('Failed to fetch products');
//         }
//         const products = await response.json();
//         return products;
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         return [];
//     }
// }

async function fetchAllProducts({ search, categoryMain, categorySub, itemType, availability, minPrice, maxPrice, sortBy, sortOrder } = {}) {
    try {
        // Construct query string based on passed parameters
        const queryParams = new URLSearchParams({
            ...(search && { search }),
            ...(categoryMain && { categoryMain }),
            ...(categorySub && { categorySub }),
            ...(itemType && { itemType }),
            ...(availability && { availability }),
            ...(minPrice && { minPrice }),
            ...(maxPrice && { maxPrice }),
            sortBy: sortBy || 'price',
            sortOrder: sortOrder || 'asc'
        }).toString();

        // Fetch products from API with query parameters
        const response = await fetch(`http://localhost:4000/formattedProducts?${queryParams}`);
        // const response = await fetch(`http://192.168.8.113:4000/formattedProducts?${queryParams}`);

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
