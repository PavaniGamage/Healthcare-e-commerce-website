import PersonalCareProducts from './PersonalCareProducts.json'

// create an array of products based on PersonalCareProducts.json
let personal_care_products = Object.keys(PersonalCareProducts.PersonalCare).map(key => ({
    id: key,
    name: PersonalCareProducts.PersonalCare[key].name,
    image: PersonalCareProducts.PersonalCare[key].imageUrl,
    price:PersonalCareProducts.PersonalCare[key].price
}));

export default personal_care_products