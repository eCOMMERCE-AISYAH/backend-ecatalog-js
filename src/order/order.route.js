import express from 'express';
import orderController from './order.controller.js';

const router = express.Router();

router.get('/api/orders', orderController.getAllOrder);
router.post('/api/orders', orderController.createOrder);
router.get('/api/orders/:id', orderController.getOrderById);
router.delete('/api/orders/:id', orderController.deleteOrder);

export default router;
