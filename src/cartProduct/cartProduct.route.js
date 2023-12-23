import express from 'express';
import cartProductController from './cartProduct.controller.js';

const router = express.Router();

router.get('/api/cartProduct', cartProductController.getAllCartProduct);
router.post('/api/cartProducts', cartProductController.createCartProduct);

export default router;
