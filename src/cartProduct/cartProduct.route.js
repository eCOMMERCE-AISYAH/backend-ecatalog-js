import express from 'express';
import cartProductController from './cartProduct.controller.js';

const router = express.Router();

router.get('/api/cartproducts', cartProductController.getAllCartProduct);
router.get('/api/cartproducts/:id', cartProductController.getCartProductById);
router.post('/api/cartproducts', cartProductController.createCartProduct);
router.patch('/api/cartproducts/:id', cartProductController.updateCartProductById);
router.delete('/api/cartproducts/:id', cartProductController.deleteCartProductById);

export default router;
