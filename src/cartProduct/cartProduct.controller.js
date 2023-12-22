import cartProductService from './cartProduct.service.js';
import responseError from '../../helper/responseError.js';

async function getAllCartProduct(req, res) {
  try {
    const cartProduct = await cartProductService.getAll();

    return res.status(200).json({
      status: 'OK',
      message: 'success get all cart product',
      cartProduct,
    });
  } catch (e) {
    return responseError(res, e.statusCode || 400, e.message);
  }
}

async function createCartProduct(req, res) {
  try {
    const cartProduct = await cartProductService.create(req);

    return res.status(200).json({
      status: 'OK',
      message: 'success create csrt product',
      cartProduct,
    });
  } catch (e) {
    return responseError(res, e.statusCode || 400, e.message);
  }
}

export default {
  getAllCartProduct,
  createCartProduct,
};
