import MedicalDevicesProducts from './MedicalDevicesProducts.json'

// create an array of products based on MedicalDevicesProducts.json
let medical_devices_products = Object.keys(MedicalDevicesProducts.MedicalDevices).map(key => ({
    id: key,
    name: MedicalDevicesProducts.MedicalDevices[key].name,
    image: MedicalDevicesProducts.MedicalDevices[key].imageUrl,
    price: MedicalDevicesProducts.MedicalDevices[key].price
}));

export default medical_devices_products