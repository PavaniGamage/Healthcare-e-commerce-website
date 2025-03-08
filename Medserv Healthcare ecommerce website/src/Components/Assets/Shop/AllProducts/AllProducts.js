// import AllProducts from './AllProducts.json'

// // create an array of products based on MedicalDevicesProducts.json
// let all_products = Object.keys(AllProducts.AllProducts).map(key => ({
//     id: key,
//     name: AllProducts.AllProducts[key].name,
//     image: AllProducts.AllProducts[key].imageUrl,
//     price: `Rs. ${AllProducts.AllProducts[key].price.toFixed(2)}`,
//     availability: AllProducts.AllProducts[key].availability,
//     description: AllProducts.AllProducts[key].description,
//     descriptionForRent: AllProducts.AllProducts[key].descriptionForRent,
//     category1: AllProducts.AllProducts[key].Category1,
//     category2: AllProducts.AllProducts[key].Category2,
//     keywords: AllProducts.AllProducts[key].keywords,
//     rating: AllProducts.AllProducts[key].rating,
//     DaillyRental: `Rs. ${AllProducts.AllProducts[key].DaillyRental.toFixed(2)}`,
//     WeeklyRental: `Rs. ${AllProducts.AllProducts[key].WeeklyRental.toFixed(2)}`,
//     MonthlyRental: `Rs. ${AllProducts.AllProducts[key].MonthlyRental.toFixed(2)}`,
//     Deposit: `Rs. ${AllProducts.AllProducts[key].Deposit.toFixed(2)}`
// }));

// ----------------------------------------------------------------
import fetchAllProducts from './fetchAllProducts';

async function createProductsArray(searchOptions) {
    try {
        // Fetch all products asynchronously
        const products = await fetchAllProducts();

        // Map the products to your desired format
        const all_products = Object.keys(products).map(key => ({
            id: key,
            itemId: products[key].itemType,
            itemType: products[key].itemType,
            name: products[key].name,
            image: products[key].imageUrl,
            imageSource: products[key].imageSource,
            price: products[key].price,
            oldPrice: products[key].oldPrice,
            availability: products[key].availability,
            description: products[key].description,
            descriptionForRent: products[key].subDescription,
            category1: products[key].categoryMain,
            category2: products[key].categorySub,
            keywords: products[key].keywords,
            rating: products[key].rating,
            DaillyRental: products[key].dailyRental,
            WeeklyRental: products[key].weeklyRental,
            MonthlyRental: products[key].monthlyRental,
            Deposit: products[key].deposit            
        }));

        return all_products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export default createProductsArray;
