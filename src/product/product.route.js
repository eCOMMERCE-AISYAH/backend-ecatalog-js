import express from 'express';
import productController from './product.controller.js';

const router = express.Router();

router.post('/api/products', productController.createProduct);
router.get('/api/products', productController.getAllProducts);
router.get('/api/products/subCategory/:id', productController.getAllProductsBySubCategory);
router.get('/api/products/:id', productController.getProductById);
router.patch('/api/products/:id', productController.updateProduct);
router.delete('/api/products/:id', productController.deleteProduct);

export default router;
