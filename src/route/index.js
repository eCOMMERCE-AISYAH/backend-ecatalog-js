import express from 'express';
import cartProductRoute from '../cartProduct/cartProduct.route.js';

const router = express.Router();

// CART PRODUCT
router.use(cartProductRoute);

router.get('/hello', (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      message: 'Hello World',
    },
  });
});

export default router;
