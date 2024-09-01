import PersonalCareProducts from './PersonalCareProducts.json'

// create an array of products based on PersonalCareProducts.json
let personal_care_products = Object.keys(PersonalCareProducts.PersonalCare).map(key => ({
    id: key,
    name: PersonalCareProducts.PersonalCare[key].name,
    image: PersonalCareProducts.PersonalCare[key].imageUrl,
    price: `Rs. ${PersonalCareProducts.PersonalCare[key].price.toFixed(2)}`
}));

export default personal_care_products