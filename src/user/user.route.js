import express from 'express';
import userController from './user.controller.js';

const router = express.Router();

router.post('/api/users/register', userController.registerUser);
router.post('/api/users/login', userController.loginUser);
router.get('/api/users', userController.getAllUser);
router.get('/api/users/:id', userController.getUserById);
router.patch('/api/users/:id', userController.updateUser);
router.post('/api/users/logout', userController.logoutUser);
router.delete('/api/users/:id', userController.deleteUser);

export default router;
