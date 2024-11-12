import WellnessProducts from './WellnessProducts.json'

// create an array of products based on WellnessProducts.json
let wellness_products = Object.keys(WellnessProducts.Wellness).map(key => ({
    id: key,
    name: WellnessProducts.Wellness[key].name,
    image: WellnessProducts.Wellness[key].imageUrl,
    price: WellnessProducts.Wellness[key].price
}));

export default wellness_products