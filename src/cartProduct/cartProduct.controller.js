import cartProductService from './cartProduct.service.js';
import responseJson from '../../helper/responseJson.js';

async function getAllCartProduct(req, res) {
  try {
    // eslint-disable-next-line import/no-named-as-default-member
    const cartProduct = await cartProductService.getAllByQuery(req);

    return responseJson.responseSuccess(
      res,
      200,
      'success get all cart product',
      { cartProduct },
    );
  } catch (e) {
    console.log(e);
    return responseJson.responseError(
      res,
      e.statusCode || 400,
      e.message,
    );
  }
}

async function getCartProductById(req, res) {
  try {
    const cartProduct = await cartProductService.get(req.params.id);

    return responseJson.responseSuccess(
      res,
      200,
      'success get cart product',
      { cartProduct },
    );
  } catch (e) {
    return responseJson.responseError(res, e.statusCode || 400, e.message);
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
    console.log(e);
    return responseJson.responseError(
      res,
      e.statusCode || 400,
      e.message,
    );
  }
}

async function updateCartProductById(req, res) {
  try {
    const cartProduct = await cartProductService.update(req.params.id, req);

    return responseJson.responseSuccess(
      res,
      200,
      'success update cart product',
      { cartProduct },
    );
  } catch (e) {
    console.log(e);
    return responseJson.responseError(
      res,
      e.statusCode || 400,
      e.message,
    );
  }
}

async function deleteCartProductById(req, res) {
  try {
    const cartProduct = await cartProductService.destroy(req.params.id);

    return responseJson.responseSuccess(
      res,
      200,
      'success delete cart product',
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
  getCartProductById,
  updateCartProductById,
  deleteCartProductById,
};
