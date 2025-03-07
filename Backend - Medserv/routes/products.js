// for routes produtes
const router = require("express").Router();
const Product = require("../models/Product");

// create endpoint for products, send to frontend
router.get('/', async (req, res) => {
    try {
        // Extract query parameters
        const {
            search,
            categoryMain,
            categorySub,
            itemType,
            availability,
            minPrice,
            maxPrice,
            sortBy = "price", // Default sort field
            sortOrder = "asc"  // Default sort order: ascending
        } = req.query;

        // Initialize query object
        const query = {};

        // Search functionality
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },           // Search by name
                { categoryMain: { $regex: search, $options: "i" } },    // Search by categoryMain
                { categorySub: { $regex: search, $options: "i" } },    // Search by categorySub
                { keywords: { $regex: search, $options: "i" } }        // Search by keywords
            ];
        }

        // Filter by category
        if (categoryMain) query.category1 = categoryMain;
        if (categorySub) query.category2 = categorySub;
        
        // Filter by item type
        if (itemType) query.itemType = itemType;
        
        // Filter by availability
        if (availability) query.availability = availability === "true";

        // Filter by price range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        // Determine sort order
        const sortOrderValue = sortOrder === "asc" ? 1 : -1;
        const sortOptions = { [sortBy]: sortOrderValue };

        // Fetch and sort products based on the query and sort options
        const products = await Product.find(query).sort(sortOptions);
        console.log("Filtered, Searched, and Sorted Products:", products);

        if (products.length === 0) {
            return res.status(404).send("No products found (In Routes)");
        }

        // Format products for response
        const formattedProducts = products.map(product => ({
            itemId: product._id,
            itemType: product.itemType,
            name: product.name,
            price: product.price.toFixed(2),
            oldPrice: product.oldPrice ? product.oldPrice.toFixed(2) : null,
            availability: product.availability,
            description: product.description,
            subDescription: product.subDescription, 
            imageSource: product.imageSource,
            imageUrl: product.imageUrl,
            categoryMain: product.category1,
            categorySub: product.category2,
            keywords: product.keywords,
            rating: product.rating,
            dailyRental: product.dailyRental.toFixed(2),
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
