import express from 'express';
import multer from 'multer';
import productImageController from './productImage.controller.js';
import imageMulter from '../middleware/productImage.js';

const router = express.Router();

router.get('/api/images', multer({ storage: imageMulter.fileStorageProduct }).single('image'), productImageController.getAllImage);
router.post('/api/images', multer({ storage: imageMulter.fileStorageProduct }).single('image'), productImageController.createImage);

export default router;
