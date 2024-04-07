import express from 'express';
import orderHistoryController from './orderHistory.controller.js';

const router = express.Router();

router.get('/api/orderhistory', orderHistoryController.getOrderHistoryByQuery);

export default router;
