// for routes
const router = require("express").Router();
const Product = require("../models/Product");

// create endpoint for products, send to frontend
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        console.log("Fetched Products:", products); // Log the fetched products

        if (products.length === 0) {
            return res.status(404).send("No products found (In Routes)");
        }

        const formattedProducts = products.map(product => ({
            itemId: product._id,
            itemType: product.itemType,
            name: product.name,
            price: product.price.toFixed(2),
            availability: product.availability,
            description: product.description,
            subDescription: product.subDescription, 
            imageSource: product.imageSource,
            imageUrl: product.imageUrl,
            categoryMain: product.category1,
            categorySub: product.category2,
            keywords: product.keywords,
            rating: product.rating,
            daillyRental: product.dailyRental.toFixed(2),
            weeklyRental: product.weeklyRental.toFixed(2),
            monthlyRental: product.monthlyRental.toFixed(2),
            deposit: product.deposit.toFixed(2)
        }));

        res.status(200).json(formattedProducts);
    } catch (error) {
        console.error("Error fetching formatted products: (In Routes)", error);
        res.status(500).send("Error fetching formatted products (In Routes)");
    }
});

module.exports = router;
