import express from 'express';
import multer from 'multer';
import productController from './product.controller.js';
import imageMulter from '../middleware/productImage.js';

const router = express.Router();

router.post('/api/products', multer({ storage: imageMulter.fileStorageProduct }).array('images', 5), productController.createProduct);
router.get('/api/products', productController.getAllProductsByQuery);
router.get('/api/products/bestseller', productController.getProductsBySoldOut);
router.get('/api/productscount', productController.countProducts);
router.get('/api/products/:id', productController.getProductDetail);
router.patch('/api/products/:id', productController.updateProduct);
router.delete('/api/products/:id', productController.deleteProduct);

export default router;
