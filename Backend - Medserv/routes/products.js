// for routes
const router = require("express").Router();
const Product = require("../models/Product");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

// // create endpoint for products, send to frontend
// router.get('/', async (req, res) => {
//     try {
//         const products = await Product.find({});
//         console.log("Fetched Products:", products); // Log the fetched products

//         if (products.length === 0) {
//             return res.status(404).send("No products found (In Routes)");
//         }

//         const formattedProducts = products.map(product => ({
//             itemId: product._id,
//             itemType: product.itemType,
//             name: product.name,
//             price: product.price.toFixed(2),
//             availability: product.availability,
//             description: product.description,
//             subDescription: product.subDescription, 
//             imageSource: product.imageSource,
//             imageUrl: product.imageUrl,
//             categoryMain: product.category1,
//             categorySub: product.category2,
//             keywords: product.keywords,
//             rating: product.rating,
//             daillyRental: product.dailyRental.toFixed(2),
//             weeklyRental: product.weeklyRental.toFixed(2),
//             monthlyRental: product.monthlyRental.toFixed(2),
//             deposit: product.deposit.toFixed(2)
//         }));

//         res.status(200).json(formattedProducts);
//     } catch (error) {
//         console.error("Error fetching formatted products: (In Routes)", error);
//         res.status(500).send("Error fetching formatted products (In Routes)");
//     }
// });

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

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid products data" });
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: product.image ? [product.image] : [],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:4000/success",
      cancel_url: "http://localhost:4000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Unable to create session" });
  }
});


module.exports = router;
