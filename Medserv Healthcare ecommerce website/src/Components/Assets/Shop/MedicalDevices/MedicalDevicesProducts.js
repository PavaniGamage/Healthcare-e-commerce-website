import MedicalDevicesProducts from './MedicalDevicesProducts.json'

// create an array of products based on MedicalDevicesProducts.json
let medical_devices_products = Object.keys(MedicalDevicesProducts.MedicalDevices).map(key => ({
    id: key,
    name: MedicalDevicesProducts.MedicalDevices[key].name,
    image: MedicalDevicesProducts.MedicalDevices[key].imageUrl,
    price: `Rs. ${MedicalDevicesProducts.MedicalDevices[key].price.toFixed(2)}`
}));

export default medical_devices_products