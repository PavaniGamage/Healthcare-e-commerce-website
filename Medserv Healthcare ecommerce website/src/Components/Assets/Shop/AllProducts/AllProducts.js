import AllProducts from './AllProducts.json'

// create an array of products based on MedicalDevicesProducts.json
let all_products = Object.keys(AllProducts.AllProducts).map(key => ({
    id: key,
    name: AllProducts.AllProducts[key].name,
    image: AllProducts.AllProducts[key].imageUrl,
    price: `Rs. ${AllProducts.AllProducts[key].price.toFixed(2)}`,
    availability: AllProducts.AllProducts[key].availability,
    description: AllProducts.AllProducts[key].description,
    descriptionForRent: AllProducts.AllProducts[key].descriptionForRent,
    category1: AllProducts.AllProducts[key].Category1,
    category2: AllProducts.AllProducts[key].Category2,
    keywords: AllProducts.AllProducts[key].keywords,
    rating: AllProducts.AllProducts[key].rating,
    DaillyRental: `Rs. ${AllProducts.AllProducts[key].DaillyRental.toFixed(2)}`,
    WeeklyRental: `Rs. ${AllProducts.AllProducts[key].WeeklyRental.toFixed(2)}`,
    MonthlyRental: `Rs. ${AllProducts.AllProducts[key].MonthlyRental.toFixed(2)}`,
    Deposit: `Rs. ${AllProducts.AllProducts[key].Deposit.toFixed(2)}`
}));

export default all_products 
           