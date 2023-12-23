import cartService from './cart.service.js';
import responseJson from '../../helper/responseJson.js';

async function getAllCart(req, res) {
  try {
    const cart = await cartService.getAll();

    return responseJson.responseSuccess(
      res,
      200,
      'success get all cart',
      { cart },
    );
  } catch (e) {
    return responseJson.responseError(
      res,
      e.statusCode || 400,
      e.message,
    );
  }
}

async function getCartById(req, res) {
  try {
    const cart = await cartService.get(req.params.id);

    return responseJson.responseSuccess(
      res,
      200,
      'success get cart',
      { cart },
    );
  } catch (e) {
    return responseJson.responseError(
      res,
      e.statusCode || 400,
      e.message,
    );
  }
}

async function createCart(req, res) {
  try {
    const cart = await cartService.create(req);

    return responseJson.responseSuccess(
      res,
      201,
      'success create cart',
      { cart },
    );
  } catch (e) {
    return responseJson.responseError(res, e.statusCode || 400, e.message);
  }
}

async function deleteCartById(req, res) {
  try {
    const cart = await cartService.destroy(req.params.id);

    return responseJson.responseSuccess(
      res,
      200,
      'success delete cart',
      { cart },
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
  getAllCart, getCartById, createCart, deleteCartById,
};
