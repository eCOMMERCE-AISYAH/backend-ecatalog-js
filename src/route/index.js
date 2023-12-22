import express from 'express';
import cartProductRoute from '../cartProduct/cartProduct.route.js';
import categoryRoute from '../category/category.route.js';

const router = express.Router();

// CART PRODUCT
router.use(cartProductRoute);

// CATEGORY PRODUCT
router.use(categoryRoute);

router.get('/hello', (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      message: 'Hello World',
    },
  });
});

export default router;
