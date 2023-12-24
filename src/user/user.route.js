import express from 'express';
import userController from './user.controller.js';

const router = express.Router();

router.post('/api/users/register', userController.createUser);
router.get('/api/users/:id', userController.getUserById);
router.patch('/api/users/:id', userController.updateUser);
router.delete('/api/users/:id', userController.deleteUser);

export default router;
