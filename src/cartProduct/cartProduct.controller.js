import cartProductService from './cartProduct.service.js';
import responseJson from '../../helper/responseJson.js';

async function getAllCartProduct(req, res) {
  try {
    // eslint-disable-next-line import/no-named-as-default-member
    const cartProduct = await cartProductService.getAll(req);

    return responseJson.responseSuccess(
      res,
      200,
      'success get all cart product',
      { cartProduct },
    );
  } catch (e) {
    return responseJson.responseError(
      res,
      e.statusCode || 400,
      e.message,
    );
  }
}

async function createCartProduct(req, res) {
  try {
    const cartProduct = await cartProductService.create(req);

    return responseJson.responseSuccess(
      res,
      200,
      'success create cart product',
      { cartProduct },
    );
  } catch (e) {
    return responseJson.responseError(
      res,
      e.statusCode || 400,
      e.message,
    );
  }
}

export default {
  getAllCartProduct,
  createCartProduct,
};
