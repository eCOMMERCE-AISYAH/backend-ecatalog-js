import express from 'express';
import cartProductRoute from '../cartProduct/cartProduct.route.js';
import categoryRoute from '../category/category.route.js';
import cartRoute from '../cart/cart.route.js';
import subCategoryRoute from '../subCategory/subCategory.route.js';
import orderRoute from '../order/order.route.js';

const router = express.Router();

// ORDER
router.use(orderRoute);

// CART
router.use(cartRoute);

// CART PRODUCT
router.use(cartProductRoute);

// CATEGORY PRODUCT
router.use(categoryRoute);

// SUB CATEGORY PRODUCT
router.use(subCategoryRoute);

router.get('/hello', (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      message: 'Hello World',
    },
  });
});

export default router;
