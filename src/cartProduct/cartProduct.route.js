import express from 'express';
import cartProductController from './cartProduct.controller.js';

const router = express.Router();

router.get('/api/cartProducts', cartProductController.getAllCartProduct);
router.get('/api/cartProducts/:id', cartProductController.getCartProductById);
router.post('/api/cartProducts', cartProductController.createCartProduct);
router.patch('/api/cartProducts/:id', cartProductController.updateCartProductById);
router.delete('/api/cartProducts/:id', cartProductController.deleteCartProductById);

export default router;
