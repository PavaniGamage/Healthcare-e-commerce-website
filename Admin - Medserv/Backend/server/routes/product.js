const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { restrictTo } = require('../middleware/auth');
const access = restrictTo('both');

/*
    // product routes
*/

// router.get('/', productController.homepage);
router.get('/', restrictTo('admin'), productController.homepage);
router.get('/access_denied', productController.accessDenied);

router.get('/add', restrictTo('admin'), productController.addProduct);
router.post('/add', restrictTo('admin'), productController.postProduct);

router.get('/view/:id', restrictTo('admin'), productController.view);

router.get('/edit/:id', restrictTo('admin'), productController.edit);
router.put('/edit/:id', restrictTo('admin'), productController.editPost); 
router.delete('/edit/:id', restrictTo('admin'), productController.deleteProduct); 

router.post('/search', restrictTo('admin'), productController.searchProducts);

router.delete('/delete/:id', restrictTo('admin'), productController.deleteProduct);

/*
    // other pages routes
*/
router.get('/about', productController.about);
router.get('/services', access, productController.services); 

router.get('/file/:id', access, productController.prescriptionUploads);  // prescription uploads
router.get('/bill-file/:id', access, productController.prescriptionBillUploads);  // prescription bill uploads
router.get('/prescriptions', access, productController.prescriptions);   // prescription page 
router.put('/prescriptions/edit/:id', restrictTo('pharmacist'), productController.editReview); // prescription edit
router.put('/prescriptions/editbill/:id', restrictTo('admin'), productController.editBillDetails); // prescription bill edit
router.get('/feedback', restrictTo('admin'), productController.feedback);

router.get('/donation_file/:id/:docType', access, productController.donationUploads);  // donation_requests uploads
router.get('/donation-bill-file/:id', access, productController.donationBillUploads);  // donation_requests bill uploads
router.get('/donation_requests', access, restrictTo('admin'), productController.donationRequests);   // donation_requests page 
router.put('/donation_requests/edit/:id', restrictTo('admin'), productController.editDonationStatus); // donation_requests edit
router.put('/donation_requests/editbill/:id', restrictTo('admin'), productController.editDonationBillDetails); // donation_requests bill edit

router.post('/create_admin', restrictTo('admin'), productController.createAdmin);
router.post('/create_pharmacist', restrictTo('admin'), productController.createPharmacist);
router.post('/login', productController.loginUser); 

router.get('/sign_in', productController.signIn); 
router.post('/sign_in', productController.loginUser);  

router.get('/logout', productController.signIn); 
router.post('/logout', productController.logoutUser);  

module.exports = router;   