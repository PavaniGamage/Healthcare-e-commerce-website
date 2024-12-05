const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/*
    // product routes
*/

router.get('/', productController.homepage);

router.get('/add', productController.addProduct);
router.post('/add', productController.postProduct);

router.get('/view/:id', productController.view);

router.get('/edit/:id', productController.edit);
router.put('/edit/:id', productController.editPost); 
router.delete('/edit/:id', productController.deleteProduct); 

router.post('/search', productController.searchProducts);

router.delete('/delete/:id', productController.deleteProduct);

/*
    // other pages routes
*/
router.get('/about', productController.about);
router.get('/services', productController.services);

router.get('/prescriptions', productController.prescriptions);
router.get('/feedback', productController.feedback);

module.exports = router;