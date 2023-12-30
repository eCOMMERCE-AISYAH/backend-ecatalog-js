import orderServices from './order.services.js';
import responseJson from '../../helper/responseJson.js';

async function getAllOrder(req, res) {
  try {
    const order = await orderServices.getAllByQuery(req);

    return responseJson.responseSuccess(
      res,
      200,
      'success get all order',
      { order },
    );
  } catch (e) {
    return responseJson.responseError(
      res,
      e.statusCode || 404,
      e.message,
    );
  }
}

async function getOrderById(req, res) {
  try {
    const order = await orderServices.get(req.params.id);

    return responseJson.responseSuccess(
      res,
      200,
      'success get order',
      { order },
    );
  } catch (e) {
    return responseJson.responseError(
      res,
      e.statusCode || 404,
      e.message,
    );
  }
}

async function createOrder(req, res) {
  try {
    const order = await orderServices.create(req);

    return responseJson.responseSuccess(
      res,
      201,
      'success create order',
      { order },
    );
  } catch (e) {
    return responseJson.responseError(
      res,
      e.statusCode || 404,
      e.message,
    );
  }
}

async function deleteOrder(req, res) {
  try {
    const order = await orderServices.destroy(req.params.id);

    return responseJson.responseSuccess(
      res,
      200,
      `success delete order with id ${req.params.id}`,
      { order },
    );
  } catch (e) {
    return responseJson.responseError(
      res,
      e.statusCode || 404,
      e.message,
    );
  }
}

export default {
  getAllOrder,
  getOrderById,
  createOrder,
  deleteOrder,
};
