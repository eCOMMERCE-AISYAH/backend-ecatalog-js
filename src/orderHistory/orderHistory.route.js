import express from 'express';
import orderHistoryController from './orderHistory.controller.js';

const router = express.Router();

router.get('/api/orderhistory', orderHistoryController.getOrderHistoryByQuery);
router.post('/api/orderhistory', orderHistoryController.createOrderHistory);

export default router;
