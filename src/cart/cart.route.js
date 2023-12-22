import express from 'express';
import cartController from './cart.controller.js';

const router = express.Router();

router.get('/api/carts', cartController.getAllCart);
router.get('/api/carts/:id', cartController.getCartById);
router.post('/api/carts', cartController.createCart);
router.delete('/api/carts/:id', cartController.deleteCartById);

export default router;
