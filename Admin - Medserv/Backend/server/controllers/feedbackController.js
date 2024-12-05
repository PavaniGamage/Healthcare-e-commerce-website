const Feedback = require('../models/Feedback');
const mongoose = require('mongoose');

// exports.feedback = async (req, res) => {
//     const messages = req.flash('info');
//     const success = req.query.success || ''; // Optional success message

//     const locals = {
//         title: 'Medserv Admin Panel - User Feedback',
//         description: 'Medserv - Product Data Management System'
//     };

//     const perPage = 12;
//     const page = req.query.page || 1;

//     try {
//         // Fetch feedback data with pagination
//         const feedback = await Feedback.aggregate([{ $sort: { createdAt: -1 } }]) // Sort by createdAt
//             .skip((page - 1) * perPage)
//             .limit(perPage)
//             .exec();

//         const count = await Feedback.countDocuments();

//         res.render('feedback/index', { // Use the correct view path
//             locals,
//             feedback, 
//             current: page,
//             pages: Math.ceil(count / perPage),
//             messages,
//             success
//         });
//     } catch (error) {
//         console.error("Error fetching feedback:", error);
//         res.status(500).render('error', { message: "Server Error. Please try again later." });
//     }
// };

/*
    // GET /
    // Feedback
*/

exports.feedback = async (req, res) => {
    const locals = {
        title: 'Feedback',
        description: 'Medserv - Product Data Management System'
    };

    try {
        res.render('services/feedback', locals); 
    } catch (error) {
        console.error("An error occurred while rendering the Feedback page:", error);
        res.render('error', { message: "We encountered an issue. Please try again later." });
    }
}; 