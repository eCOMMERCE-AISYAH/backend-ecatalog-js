import express from 'express';
import orderItemController from './orderItem.controller.js';

const router = express.Router();

router.get('/api/orderitem', orderItemController.getOrderItemsByQuery);
router.get('/api/orderitem/:id', orderItemController.getOrderItemById);
router.get('/api/orderitem', orderItemController.createOrderItem);

export default router;
