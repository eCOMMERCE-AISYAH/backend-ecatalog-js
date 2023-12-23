import express from 'express';
import subCategoryController from './subCategory.controller.js';

const router = express.Router();

router.post('/api/subCategory', subCategoryController.createSubCategory);
router.get('/api/subCategory', subCategoryController.getAllSubCategory);
router.get('/api/subCategory/:id', subCategoryController.getSubCategoryById);
router.put('/api/subCategory/:id', subCategoryController.updateSubCategory);
router.delete('/api/subCategory/:id', subCategoryController.deleteSubCategory);

export default router;
