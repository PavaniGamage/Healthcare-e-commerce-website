import WellnessProducts from './WellnessProducts.json'

// create an array of products based on WellnessProducts.json
let wellness_products = Object.keys(WellnessProducts.Wellness).map(key => ({
    id: key,
    name: WellnessProducts.Wellness[key].name,
    image: WellnessProducts.Wellness[key].imageUrl,
    price: `Rs. ${WellnessProducts.Wellness[key].price.toFixed(2)}`
}));

export default wellness_products