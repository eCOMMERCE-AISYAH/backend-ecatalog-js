import express from 'express';
import { createCartProduct, getAllCartProduct } from './cartProduct.controller.js';

const router = express.Router();

router.get('/api/cartProduct', getAllCartProduct);
router.post('/api/cartProducts', createCartProduct);

export default router;
