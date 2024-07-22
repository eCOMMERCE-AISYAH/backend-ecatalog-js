import express from 'express';
import multer from 'multer';
import productImageController from './productImage.controller.js';
import imageMulter from '../middleware/productImage.js';

const router = express.Router();

router.get('/api/images/:id', productImageController.getImageById);
router.get('/api/images', multer({ storage: imageMulter.fileStorageProduct }).single('image'), productImageController.getAllImage);
router.post('/api/images', multer({ storage: imageMulter.fileStorageProduct }).array('image', 5), productImageController.createImage);
router.delete('/api/images/:id', productImageController.deleteImageById);

export default router;
