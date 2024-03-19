import express from 'express';
import categoryController from './category.controller.js';

const router = express.Router();

router.post('/api/category', categoryController.createCategory);
router.get('/api/category', categoryController.getAllCategory);
router.get('/api/category/:slug', categoryController.getCategoryDetail);
router.get('/api/category/:id', categoryController.getCategoryById);
router.patch('/api/category/:id', categoryController.updateCategory);
router.delete('/api/category/:id', categoryController.deleteCategory);

export default router;
