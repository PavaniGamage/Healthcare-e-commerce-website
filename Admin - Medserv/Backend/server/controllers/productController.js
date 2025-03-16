const Product = require('../models/Product');
const Feedback = require('../models/Feedback');
const Prescription = require('../models/Prescription'); 
const Donation = require('../models/Donation');
const Account = require('../models/Account');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const multer = require('multer');
const upload = multer();

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

    // Transform and validate price and oldPrice
    let price = req.body.price;
    let oldPrice = req.body.oldPrice;

    // If price is an array, take the first element
    if (Array.isArray(price)) {
        price = Number(price[0]);
    }

    // If oldPrice is an array, take the first element
    if (Array.isArray(oldPrice)) {
        oldPrice = Number(oldPrice[0]);
    }

    // Convert price and oldPrice to numbers if they are strings
    if (typeof price === 'string') {
        price = Number(price);
    }
    if (typeof oldPrice === 'string') {
        oldPrice = Number(oldPrice);
    }

    // Validate price and oldPrice
    if (isNaN(price)) {
        return res.status(400).json({ error: "Price must be a valid number." });
    }
    if (oldPrice && isNaN(oldPrice)) {
        return res.status(400).json({ error: "Old price must be a valid number." });
    }

    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        oldPrice: req.body.oldPrice, 
        quantity: req.body.quantity,
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
    // PUT /:id
    // Update Product Data
*/

exports.editPost = async (req, res) => {
    try {
        // Transform and validate price and oldPrice
        let price = req.body.price;
        let oldPrice = req.body.oldPrice;

        // If price is an array, take the first element
        if (Array.isArray(price)) {
            price = Number(price[0]);
        }

        // If oldPrice is an array, take the first element
        if (Array.isArray(oldPrice)) {
            oldPrice = Number(oldPrice[0]);
        }

        // Convert price and oldPrice to numbers if they are strings
        if (typeof price === 'string') {
            price = Number(price);
        }
        if (typeof oldPrice === 'string') {
            oldPrice = Number(oldPrice);
        }

        // Validate price and oldPrice
        if (isNaN(price)) {
            return res.status(400).json({ error: "Price must be a valid number." });
        }
        if (oldPrice && isNaN(oldPrice)) {
            return res.status(400).json({ error: "Old price must be a valid number." });
        }

        // Update the product with the specified ID using findOneAndUpdate
        await Product.findOneAndUpdate(
            { _id: req.params.id }, // Query to find the product by ID
            {
                itemType: req.body.itemType,
                name: req.body.name,
                price: req.body.price, 
                oldPrice: req.body.oldPrice,
                quantity: req.body.quantity,
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
        console.log(error);
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
    // POST /:id
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
        // Fetch all records
        const prescriptionData = await Prescription.find({}).sort({ createdAt: -1 }); // Sort by latest

        if (!prescriptionData.length) {
            locals.message = "No prescriptions available.";
        }

        // Render the page with data
        res.render('services/prescription', { locals, prescriptionData }); 
    } catch (error) {
        console.error("An error occurred while rendering the Prescriptions page:", error);
        res.render('error', { message: "We encountered an issue. Please try again later." });
    }
}; 

/*
    // GET /
    // Prescriptions Uploads
*/

exports.prescriptionUploads = async (req, res) => {
    const locals = {
        title: 'Prescription Uploads',
        description: 'Medserv - Product Data Management System'
    };

    try {
        const prescription = await Prescription.findById(req.params.id);

        if (prescription && prescription.prescriptionFile && prescription.prescriptionFile.data) {
            // Set the correct Content-Type for the image (e.g., 'image/jpeg', 'image/png')
            res.setHeader('Content-Type', prescription.prescriptionFile.contentType);
            res.send(prescription.prescriptionFile.data);
        } else {
            res.status(404).send('Image/File not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving image/file'); 
    }
};

/*
    // GET /
    // Prescriptions Bill Uploads
*/

exports.prescriptionBillUploads = async (req, res) => {
    const locals = {
        title: 'Prescription Bill Uploads',
        description: 'Medserv - Product Data Management System'
    };

    try {
        const prescription = await Prescription.findById(req.params.id);

        if (!prescription) {
            return res.status(404).send('Prescription bill not found');
        }

        if (prescription.billDetails && prescription.billDetails.billFile && prescription.billDetails.billFile.data) {
            res.setHeader('Content-Type', prescription.billDetails.billFile.contentType);
            console.log('prescription.billDetails:', prescription.billDetails);
            return res.send(prescription.billDetails.billFile.data);
        } else {
            return res.status(404).send('Bill file not found');
        }
    } catch (error) {
        console.error('Error retrieving prescription bill:', error);
        res.status(500).send('Error retrieving image/file');
    }
};

/*
    // PUT /:id
    // Update Prescription Review
*/

exports.editReview = async (req, res) => {
    try {
        // Extract review data from request body
        const { reviewStatus, reviewFeedback } = req.body;

        // Find the prescription by ID and update the review fields
        const updatedPrescription = await Prescription.findByIdAndUpdate(
            req.params.id, 
            {
                $set: {
                    'review.reviewStatus': reviewStatus,
                    'review.reviewFeedback': reviewFeedback,
                    'review.reviewTime': Date.now() // Set the review time to the current date/time
                }
            },
            { new: true } // return the updated document
        );

        // Check if the prescription was found and updated
        if (!updatedPrescription) {
            return res.status(404).send('Prescription not reviewed!');
        }

        console.log('Review Status:', reviewStatus);
        console.log('Review Feedback:', reviewFeedback);

        // Redirect or send a success message
        res.redirect('/prescriptions'); 
        // res.status(200).json({ 
        //     success: true, 
        //     message: 'Review submitted successfully' 
        // });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error - In Prescription Reviewing');
    }
};

/*
    // PUT /:id
    // Update Prescription Bill
*/

exports.editBillDetails = [
    upload.single('billFile'), // Middleware to process the file upload
    async (req, res) => {
        try {
            // Extract data from the request
            const { totalPrice, Other } = req.body;

            // Prepare the updated fields
            const updateFields = {
                'billDetails.totalPrice': totalPrice,
                'billDetails.Other': Other,
                'billDetails.billDate': Date.now(),
            };

            // Process the uploaded file
            if (req.file) {
                updateFields['billDetails.billFile'] = {
                    data: req.file.buffer, // Binary data from Multer
                    contentType: req.file.mimetype, // File MIME type
                };
            }

            // Find the prescription by ID and update the fields
            const updatedPrescription = await Prescription.findByIdAndUpdate(
                req.params.id,
                { $set: updateFields },
                { new: true }
            );

            // Check if the prescription was found and updated
            if (!updatedPrescription) {
                return res.status(404).send('Prescription not found or not updated with bill details!');
            }

            // Respond with redirect
            res.redirect('/prescriptions'); 
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error - Failed to update prescription bill details');
        }
    },
];

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

/*
    // GET /
    // Donation Requests
*/

exports.donationRequests = async (req, res) => {
    const locals = {
        title: 'Donations',
        description: 'Medserv - Product Data Management System'
    };

    try {
        // Fetch all records
        const donationData = await Donation.find({}).sort({ createdAt: -1 }); // Sort by latest

        if (!donationData.length) {
            locals.message = "No donation request available.";
        }

        // Render the page with data
        res.render('services/donation', { locals, donationData }); 
    } catch (error) {
        console.error("An error occurred while rendering the Donations page:", error);
        res.render('error', { message: "We encountered an issue. Please try again later." });
    }
}; 

/*
    // GET /
    // Donation Uploads
*/

exports.donationUploads = async (req, res) => {
    const locals = {
        title: 'Donation Uploads',
        description: 'Medserv - Product Data Management System'
    };

    // Extract the type of document (e.g., 'proofOfIncome', 'proofOfResidence', etc.)
    const { docType } = req.params; // docType is part of the URL (e.g., /uploads/:id/:docType)

    try {
        // Find the donation by ID
        const donation = await Donation.findById(req.params.id);

        // Check if donation exists and the requested document type is available
        if (donation && donation.supportingDocuments && donation.supportingDocuments[docType]) {
            const document = donation.supportingDocuments[docType];

            // Check if the document has both data and contentType
            if (document && document.data && document.contentType) {
                // Set the correct Content-Type for the document
                res.setHeader('Content-Type', document.contentType);

                // Send the document data (Buffer)
                res.send(document.data);
            } else {
                // If no data/contentType available, send 404 error
                res.status(404).send(`${docType} not found`);
            }
        } else {
            // If the donation or the requested document type doesn't exist, send 404 error
            res.status(404).send('Document type not found');
        }
    } catch (error) {
        // Catch any error and send a 500 status code with the error message
        console.error(error);
        res.status(500).send('Error retrieving document');
    }
};

/*
    // GET /
    // Donation Bill Uploads
*/

exports.donationBillUploads = async (req, res) => {
    const locals = {
        title: 'Donation Bill Uploads',
        description: 'Medserv - Product Data Management System'
    };

    try {
        const donation = await Donation.findById(req.params.id);

        if (!donation) {
            return res.status(404).send('Donation bill not found');
        }

        if (donation.billDetails && donation.billDetails.billFile && donation.billDetails.billFile.data) {
            res.setHeader('Content-Type', donation.billDetails.billFile.contentType);
            console.log('donation.billDetails:', donation.billDetails);
            return res.send(donation.billDetails.billFile.data);
        } else {
            return res.status(404).send('Bill file not found');
        }
    } catch (error) {
        console.error('Error retrieving donation bill:', error);
        res.status(500).send('Error retrieving image/file');
    }
};

/*
    // PUT /:id
    // Update Donation Review
*/

exports.editDonationStatus = async (req, res) => {
    try {
        // Extract review data from request body
        const { reviewStatus, reviewFeedback } = req.body;

        // Find the prescription by ID and update the review fields
        const updatedDonation = await Donation.findByIdAndUpdate(
            req.params.id, 
            {
                $set: {
                    'review.reviewStatus': reviewStatus,
                    'review.reviewFeedback': reviewFeedback,
                    'review.reviewTime': Date.now() // Set the review time to the current date/time
                }
            },
            { new: true } // return the updated document
        );

        // Check if the prescription was found and updated
        if (!updatedDonation) {
            return res.status(404).send('Donation not reviewed!');
        }

        console.log('Review Status:', reviewStatus);
        console.log('Review Feedback:', reviewFeedback);

        // Redirect or send a success message
        res.redirect('/donation_requests');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error - In Donation Reviewing');
    }
};

/*
    // PUT /:id
    // Update Donation Bill
*/

exports.editDonationBillDetails = [
    upload.single('billFile'),
    async (req, res) => {
        try {
            // Extract data from the request
            const { totalPrice, Other } = req.body;

            // Prepare the updated fields
            const updateFields = {
                'billDetails.totalPrice': totalPrice,
                'billDetails.Other': Other,
                'billDetails.billDate': Date.now(),
            };

            // Process the uploaded file
            if (req.file) {
                updateFields['billDetails.billFile'] = {
                    data: req.file.buffer, // Binary data from Multer
                    contentType: req.file.mimetype, // File MIME type
                };
            }

            // Find the donation by ID and update the fields
            const updatedDonation = await Donation.findByIdAndUpdate(
                req.params.id,
                { $set: updateFields },
                { new: true }
            );

            // Check if the donation was found and updated
            if (!updatedDonation) {
                return res.status(404).send('Donation not found.!');
            }

            // Respond with redirect
            res.redirect('/donation_requests'); 
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error - Failed to update donation bill details');
        }
    },
];

/*
    // PUT /:id
    // Update Donation Sending Status
*/

exports.editDonationSendingStatus = [
    async (req, res) => {
        try {
            // Extract data from the request
            const { sendingStatus } = req.body;

            // Find the prescription by ID and update the review fields
            const updatedDonation = await Donation.findByIdAndUpdate(
                req.params.id, 
                {
                    $set: { sendingStatus }
                },
                { new: true } // return the updated document
            );

            // Check if the prescription was found and updated
            if (!updatedDonation) {
                return res.status(404).send('Donation sendind status not updated!');
            }

            console.log('Sending Status:', sendingStatus);

            // Redirect or send a success message
            res.redirect('/donation_requests');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error - Failed to update donation sending status');
        }
    },
];

/*
    // GET /
    // Sign In
*/

exports.signIn = async (req, res) => {
    const locals = {
        title: 'Sign In',
        description: 'Medserv - Product Data Management System'
    };

    try {
        res.render('signIn', locals); 
        
    } catch (error) {
        console.error("An error occurred while rendering the signIn page:", error);
        res.render('error', { message: "We encountered an issue. Please try again later." }); 
    }
};

/*
    // POST /
    // Sign In - Details
*/

// Create Admin User Route
exports.createAdmin = async (req, res) => {
    try {
        // Check if admin user exists
        const existingAdmin = await Account.findOne({ username: process.env.usernameAdmin });

        if (!existingAdmin) {
            // Create and save a new admin user
            const adminUser = new Account({
                username: process.env.usernameAdmin,
                password: process.env.passwordAdmin, // Use passwordAdmin from environment variables
                role: 'admin',
            });

            await adminUser.save();
            return res.status(201).json({ message: 'Admin user created!' });
        } else {
            return res.status(400).json({ message: 'Admin user already exists.' });
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
        return res.status(500).json({ message: 'Error creating admin user' });
    }
};

// Create Pharmacist User Route
exports.createPharmacist = async (req, res) => {
    try {
        // Check if pharmacist user exists
        const existingPharmacist = await Account.findOne({ username: process.env.usernamePharmacist });

        if (!existingPharmacist) {
            // Create and save a new pharmacist user
            const pharmacistUser = new Account({
                username: process.env.usernamePharmacist,
                password: process.env.passwordPharmacist, // Use passwordPharmacist from environment variables
                role: 'pharmacist',
            });

            await pharmacistUser.save();
            return res.status(201).json({ message: 'Pharmacist user created!' });
        } else {
            return res.status(400).json({ message: 'Pharmacist user already exists.' });
        }
    } catch (error) {
        console.error('Error creating pharmacist user:', error);
        return res.status(500).json({ message: 'Error creating pharmacist user' });
    }
};

// User Login Route (Authentication)
exports.loginUser = async (req, res) => {
    const { username, password } = req.body; 

    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide both username and password.' });
    }

    try {
        const user = await Account.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Store user details in session
        req.session.user = {
            id: user._id,
            username: user.username,
            role: user.role,
        };

        // If login is successful, generate a JWT token (optional)
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        const role = user.role;
        const session = req.session.user;

        // Redirect to a dashboard or any other page after successful login
        return res.status(200).json({ message: 'Login successful', session, token, role });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}; 

/*
    // POST /
    // Log Out - Details
*/

// User Logout Route (Authentication)
exports.logoutUser = (req, res) => {
    try {
        // Destroy the session to log out the user
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to log out' });
            }

            // JWT token expiration handle in client-side

            // Send a response indicating successful logout
            return res.status(200).json({ message: 'Logout successful' });
        });
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}; 

/*
    // GET /
    // Access Denied Page
*/

exports.accessDenied = async (req, res) => {
    const locals = {
        title: 'Access Denied',
        description: 'Medserv - Product Data Management System'
    };

    try {
        res.render('accessDenied', locals); 
        
    } catch (error) {
        console.error("An error occurred while rendering the accessDenied page:", error);
        res.render('error', { message: "We encountered an issue. Please try again later." }); 
    }
}; 