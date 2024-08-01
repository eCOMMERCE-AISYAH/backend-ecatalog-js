import express from 'express';
import orderController from './order.controller.js';

const router = express.Router();

router.get('/api/orders', orderController.getAllOrder);
router.get('/api/orderscount', orderController.countOrders);
router.get('/api/ordersomzet', orderController.getOmzetByOrderStatus);
router.post('/api/orders', orderController.createOrder);
router.get('/api/orders/:id', orderController.getOrderById);
router.patch('/api/orders/:id', orderController.updateOrderById);
router.delete('/api/orders/:id', orderController.deleteOrder);

export default router;
