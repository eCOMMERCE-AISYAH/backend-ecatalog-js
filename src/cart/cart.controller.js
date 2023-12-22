import cartService from './cart.service.js';
import responseError from '../../helper/responseError.js';

async function getAllCart(req, res) {
  try {
    const cart = await cartService.getAll();

    return res.status(200).json({
      status: 'success',
      message: 'success get all cart',
      data: { cart },
    });
  } catch (e) {
    return responseError(res, e.statusCode || 400, e.message);
  }
}

async function getCartById(req, res) {
  try {
    const cart = await cartService.get(req.params.id);

    return res.status(200).json({
      status: 'success',
      message: 'success get cart',
      data: cart,
    });
  } catch (e) {
    return responseError(res, e.statusCode || 400, e.message);
  }
}

async function createCart(req, res) {
  try {
    const cart = await cartService.create(req);

    return res.status(201).json({
      status: 'success',
      message: 'success create cart',
      data: { cart },
    });
  } catch (e) {
    return responseError(res, e.statusCode || 400, e.message);
  }
}

async function deleteCartById(req, res) {
  try {
    const cart = await cartService.destroy(req.params.id);

    return res.status(200).json({
      status: 'success',
      message: 'success delete cart',
      data: { cart },
    });
  } catch (e) {
    return responseError(res, e.statusCode || 400, e.message);
  }
}

export default {
  getAllCart, getCartById, createCart, deleteCartById,
};
