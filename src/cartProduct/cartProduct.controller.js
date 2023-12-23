import cartProductService from './cartProduct.service.js';

import responseJson from '../../helper/responseJson.js';

async function getAllCartProduct(req, res) {
  try {
    // eslint-disable-next-line import/no-named-as-default-member
    const cartProduct = await cartProductService.getAll(req);

    return res.status(200).json({
      status: 'OK',
      message: 'success get all cart product',
      data: cartProduct,
    });
  } catch (e) {
    return responseJson.responseError(res, e.statusCode || 400, e.message);
  }
}

async function createCartProduct(req, res) {
  try {
    // eslint-disable-next-line import/no-named-as-default-member
    const cartProduct = await cartProductService.create(req);

    return res.status(200).json({
      message: 'success create cart product',
      data: cartProduct,
    });
  } catch (e) {
    return responseJson.responseError(res, e.statusCode || 400, e.message);
  }
}

export default {
  getAllCartProduct,
  createCartProduct,
};
