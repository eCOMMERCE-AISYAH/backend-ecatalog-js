import orderItemService from './orderItem.service.js';
import responseJson from '../../helper/responseJson.js';

async function getOrderItemsByQuery(req, res) {
  try {
    const orderItem = await orderItemService.getAllByQuery(req);

    return responseJson.responseSuccess(
      res,
      200,
      'success get order items',
      { orderItem },
    );
  } catch (e) {
    return responseJson.responseError(
      res,
      e.statusCode || 400,
      e.message,
    );
  }
}

async function getOrderItemById(req, res) {
  try {
    const orderItem = await orderItemService.getById(req.params.id);

    return responseJson.responseSuccess(
      res,
      200,
      'success get order item by id',
      { orderItem },
    );
  } catch (e) {
    return responseJson.responseError(
      res,
      e.statusCode || 400,
      e.message,
    );
  }
}

async function createOrderItem(req, res) {
  try {
    const orderItem = await orderItemService.create(req);

    return responseJson.responseSuccess(
      res,
      201,
      'success create order item',
      { orderItem },
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
  getOrderItemsByQuery,
  getOrderItemById,
  createOrderItem,
};
