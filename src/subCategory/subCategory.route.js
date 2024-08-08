import express from 'express';
import subCategoryController from './subCategory.controller.js';
import authentication from '../middleware/auth.js';

const router = express.Router();

router.post('/api/subCategory', subCategoryController.createSubCategory);
router.get('/api/subCategory', subCategoryController.getAllSubCategory);
router.get('/api/subCategory/:slug', subCategoryController.getSubCategoryDetail);
router.patch('/api/subCategory/:id', subCategoryController.updateSubCategory);
router.delete('/api/subCategory/:id', subCategoryController.deleteSubCategory);

export default router;
