import express from 'express';
import cartProductRoute from '../cartProduct/cartProduct.route.js';
import categoryRoute from '../category/category.route.js';
import cartRoute from '../cart/cart.route.js';
import subCategoryRoute from '../subCategory/subCategory.route.js';
import orderRoute from '../order/order.route.js';
import productRoute from '../product/product.route.js';
import userRoute from '../user/user.route.js';

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

// PRODUCT
router.use(productRoute);

// USER
router.use(userRoute);

router.get('/hello', (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      message: 'Hello World',
    },
  });
});

export default router;
