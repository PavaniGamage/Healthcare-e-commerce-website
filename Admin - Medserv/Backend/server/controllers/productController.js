const Product = require('../models/Product');
const Feedback = require('../models/Feedback');
const mongoose = require('mongoose');

/*
    // GET /
    // Homepage
*/

exports.homepage = async (req, res) => {
    const messages = req.flash('info');
    const success = req.query.success || ''; // Get success flag from query deletion

    const locals = {
        title: 'Medserv Admin Panel',
        description: 'Medserv - Product Data Management System'
    };

    let perPage = 12;
    let page = req.query.page || 1;

    try {
        const products = await Product.aggregate([ { $sort: {updatedAt: -1} }])
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();
        const count = await Product.countDocuments();

        res.render('index', {
            locals,
            products, 
            current: page,
            pages: Math.ceil(count / perPage),
            messages,
            success
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// exports.homepage = async (req, res) => {
//     const messages = req.flash('info');

//     const locals = {
//         title: 'Medserv Admin Panel',
//         description: 'Medserv - Product Data Management System'
//     };

//     try {
//         const products = await Product.find().limit(20); // Fetch products from the database
//         res.render('index', { products, locals, messages }); // Pass products and locals/messages to the view
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// };

/*
    // GET /
    // NewProduct
*/

exports.addProduct = async (req, res) => {

    const locals = {
        title: 'Medserv - Add New Product',
        description: 'Medserv - Product Data Management System'
    }

    res.render('product/add', locals);
};

/*
    // POST /
    // Create New Product
*/

exports.postProduct = async (req, res) => {

    console.log(req.body);

    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        availability: req.body.availability,
        description: req.body.description,
        subDescription: req.body.subDescription,
        keywords: req.body.keywords,
        rating: req.body.rating,
        imageSource: req.body.imageSource,
        imageUrl: req.body.imageUrl,
        category1: req.body.category1,
        category2: req.body.category2,
        itemType: req.body.itemType,
        dailyRental: req.body.dailyRental,
        weeklyRental: req.body.weeklyRental,
        monthlyRental: req.body.monthlyRental,
        deposit: req.body.deposit
    });    

    // const locals = {
    //     title: 'New Product Added!',
    //     description: 'Medserv - Product Data Management System'
    // }

    // res.render('product/add', locals);

    try {
        await Product.create(newProduct);
        req.flash('info', 'New product has been added.');
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while adding the product.');
    }

};

/*
    // GET /:id
    // View Product Data
*/

exports.view = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });

        if (!product) {
            // If no product is found, send a 404 response
            return res.status(404).render('404', {
                message: 'Product not found'
            });
        }

        const locals = {
            title: 'View Product Details',
            description: 'Medserv - Product Data Management System'
        };

        res.render('product/view', {
            locals,
            product
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

/*
    // GET /:id
    // Edit Product Data
*/

exports.edit = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });

        if (!product) {
            // If no product is found, send a 404 response
            return res.status(404).render('404', {
                message: 'Product not found'
            });
        }

        const locals = {
            title: 'Edit Product Details',
            description: 'Medserv - Product Data Management System'
        };

        // Get success flag from query (if available)
        const success = req.query.success;

        res.render('product/edit', {
            locals,
            product,
            success // Pass the success flag to the view
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

/*
    // GET /:id
    // Update Product Data
*/

exports.editPost = async (req, res) => {
    try {
        // Update the product with the specified ID using findOneAndUpdate
        await Product.findOneAndUpdate(
            { _id: req.params.id }, // Query to find the product by ID
            {
                itemType: req.body.itemType,
                name: req.body.name,
                price: req.body.price, 
                availability: req.body.availability,
                description: req.body.description,
                subDescription: req.body.subDescription,
                keywords: req.body.keywords,
                rating: req.body.rating,
                imageSource: req.body.imageSource,
                imageUrl: req.body.imageUrl,
                category1: req.body.category1,
                category2: req.body.category2,
                dailyRental: req.body.dailyRental,
                weeklyRental: req.body.weeklyRental,
                monthlyRental: req.body.monthlyRental,
                deposit: req.body.deposit
            },
            { new: true } // Option to return the updated document
        );

        // Redirect to the edit page of the updated product
        res.redirect(`/edit/${req.params.id}?success=true`); 
        console.log('Product updated successfully');
    } catch (error) {
        // Log any errors that occur during the update
        console.log(error);
        // res.status(500).send('Error updating product'); // Optional: send an error response
        res.redirect(`/edit/${req.params.id}?success=false`);
    }
};

/*
    // DELETE /:id
    // Delete Product Data
*/

exports.deleteProduct = async (req, res) => {
    try {
        await Product.deleteOne({_id: req.params.id});
        res.redirect("/?success=true")
    } catch (error) {
        // Log any errors that occur during the update
        console.log(error);
        res.redirect("/?success=false");
        // res.status(500).send('Error deleting product'); // Optional: send an error response
    }
};

/*
    // GET /:id
    // Search Product Data
*/

exports.searchProducts = async (req, res) => {
    const locals = {
        title: 'Search Product Details',
        description: 'Medserv - Product Data Management System'
    };

    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const products = await Product.find({
            $or: [
                { name: {$regex: new RegExp(searchNoSpecialChar, "i")} },
                { keywords: {$regex: new RegExp(searchNoSpecialChar, "i")} }
            ]
        });

        res.render("search", {
            products,
            locals
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while searching for products.');
    }
};

// --------------------------------------------------------------------------------------
// other pages... (except products)

/*
    // GET /
    // About
*/

exports.about = async (req, res) => {
    const locals = {
        title: 'About',
        description: 'Medserv - Product Data Management System'
    };

    try {
        res.render('about', locals); 
    } catch (error) {
        console.error("An error occurred while rendering the About page:", error);
        res.render('error', { message: "We encountered an issue. Please try again later." });
    }
};  


/*
    // GET /
    // Services
*/

exports.services = async (req, res) => {
    const locals = {
        title: 'Services',
        description: 'Medserv - Product Data Management System'
    };

    try {
        res.render('services', locals); 
    } catch (error) {
        console.error("An error occurred while rendering the Services page:", error);
        res.render('error', { message: "We encountered an issue. Please try again later." });
    }
}; 

/*
    // GET /
    // Prescriptions
*/

exports.prescriptions = async (req, res) => {
    const locals = {
        title: 'Prescriptions',
        description: 'Medserv - Product Data Management System'
    };

    try {
        res.render('services/prescription', locals); 
    } catch (error) {
        console.error("An error occurred while rendering the Prescriptions page:", error);
        res.render('error', { message: "We encountered an issue. Please try again later." });
    }
}; 

/*
    // GET /
    // Feedback
*/

exports.feedback = async (req, res) => {
    const locals = {
        title: 'Feedback',
        description: 'Medserv - Product Data Management System',
    };

    try {
        // Fetch all feedback records
        const feedbackData = await Feedback.find({}).sort({ createdAt: -1 }); // Sort by latest

        // Render the page with feedback data
        res.render('services/feedback', { locals, feedbackData });
    } catch (error) {
        console.error("An error occurred while rendering the Feedback page:", error);
        res.render('error', { message: "We encountered an issue. Please try again later." });
    }
};