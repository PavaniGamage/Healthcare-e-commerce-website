require('dotenv').config();                                 // Load environment variables from .env file 

// Import required modules
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');          // Import the method-override middleware, which allows overriding HTTP methods
const flash = require('connect-flash');                     // Import flash messages middleware
const session = require('express-session');                 // Import session middleware
const connectDB = require('./server/config/db');            // Import database connection module

// initialize the app and set port
const app = express();                                      // Initialize the Express application
const port = process.env.PORT || 5000;                      // Set the port to either the environment variable PORT or default to 5000

// Connect to Database
// connectDB();
connectDB().catch(err => {
    console.error(`Database connection error: ${err.message}`);
    process.exit(1);                                        // Exit process with failure
});

// Middleware 
app.use(express.urlencoded({ extended: true }));            // to parse URL-encoded data from forms
app.use(express.json());                                    // to parse JSON data in request bodies
app.use(methodOverride('_method'));                         // to enable HTML form methods like PUT and DELETE

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);                              // Log the error stack for debugging
    res.status(500).send('Something broke!');              // Send a generic error message to the client
});

// Static files                                             // Serve static files (CSS, images, JavaScript, etc.) from the "public" directory
app.use(express.static('public')); 
app.use(express.static('public/js')); 

// Express Session - setup
app.use(
    session({
        secret: 'secret',                                   // Secret key for session encryption
        resave: false,                                      // Don't save session if it hasn't been modified
        saveUninitialized: true,                            // Save unmodified sessions
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,                // 1 week - cookie will expire
        }
    })
);

// Flash Messages
// app.use(flash()); 
app.use(flash({ sessionKeyName: 'flashMessage' }));

// Templating engine
app.use(expressLayout);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/product'));

// handle 404 errors
app.get('*', (req, res) => {
    res.status(404).render('404');
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
