import express from 'express';
import notificationController from './notification.controller.js';

const router = express.Router();

router.get('/api/notifications', notificationController.getAllNotificationByStatus);
router.get('/api/notifications/:id', notificationController.getNotificationById);
router.post('/api/notifications', notificationController.createNotification);
router.patch('/api/notifications/:id', notificationController.updateNotificationById);
router.delete('/api/notifications/:id', notificationController.deleteNotificationById);

export default router;
