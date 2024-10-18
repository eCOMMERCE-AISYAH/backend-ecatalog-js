import express from 'express';
import cartProductRoute from '../cartProduct/cartProduct.route.js';
import categoryRoute from '../category/category.route.js';
import subCategoryRoute from '../subCategory/subCategory.route.js';
import orderRoute from '../order/order.route.js';
import productRoute from '../product/product.route.js';
import userRoute from '../user/user.route.js';
// import productImageRoute from '../productImage/productImage.route.js';
import orderHistoryRoute from '../orderHistory/orderHistory.route.js';
// import authentication from '../middleware/auth.js';

const router = express.Router();

// USER
router.use(userRoute);

// MIDDLEWARE
// router.use(authentication);

// ORDER
router.use(orderRoute);

// ORDER HISTORY
router.use(orderHistoryRoute);

// CART PRODUCT
router.use(cartProductRoute);

// CATEGORY PRODUCT
router.use(categoryRoute);

// SUB CATEGORY PRODUCT
router.use(subCategoryRoute);

// PRODUCT
router.use(productRoute);

// IMAGES
// router.use(productImageRoute);

router.get('/hello', (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      message: 'Hello World ci cd success 1',
    },
  });
});

export default router;
