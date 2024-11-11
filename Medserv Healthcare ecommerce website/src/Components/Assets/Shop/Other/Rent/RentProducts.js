import RentProducts from './RentProducts.json'

// create an array of products based on RentProducts.json
let rent_products = Object.keys(RentProducts.Rent).map(key => ({
    id: key,
    name: RentProducts.Rent[key].name,
    image: RentProducts.Rent[key].imageUrl,
    price: `Rs. ${RentProducts.Rent[key].price.toFixed(2)}`
}));

export default rent_products




