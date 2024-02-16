import orderHistoryService from './orderHistory.service.js';
import responseJson from '../../helper/responseJson.js';

async function getOrderHistoryByQuery(req, res) {
  try {
    const orderHistory = await orderHistoryService.getAllByQuery(req);

    return responseJson.responseSuccess(
      res,
      200,
      'success get order history',
      orderHistory,
    );
  } catch (e) {
    return responseJson.responseError(
      res,
      e.statusCode || 404,
      e.message,
    );
  }
}

async function createOrderHistory(req, res) {
  try {
    const orderHistory = await orderHistoryService.create(req);

    return responseJson.responseSuccess(
      res,
      200,
      'success create order history',
      orderHistory,
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
  getOrderHistoryByQuery,
  createOrderHistory,
};
