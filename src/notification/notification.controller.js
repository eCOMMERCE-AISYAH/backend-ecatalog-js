import notificationService from './notification.service.js';
import responseJson from '../../helper/responseJson.js';

async function getAllNotificationByStatus(req, res) {
  try {
    const notification = await notificationService.getAllByQuery(req);

    return responseJson.responseSuccess(
      res,
      200,
      'success get all notification',
      { notification },
    );
  } catch (e) {
    return responseJson.responseError(
      res,
      e.statusCode || 400,
      e.message,
    );
  }
}

async function getNotificationById(req, res) {
  try {
    const notification = await notificationService.get(req.params.id);

    return responseJson.responseSuccess(
      res,
      200,
      'success get notification',
      { notification },
    );
  } catch (e) {
    return responseJson.responseError(
      res,
      e.statusCode || 400,
      e.message,
    );
  }
}

async function createNotification(req, res) {
  try {
    const notification = await notificationService.create(req);

    return responseJson.responseSuccess(
      res,
      201,
      'success create notification',
      { notification },
    );
  } catch (e) {
    return responseJson.responseError(
      res,
      e.statusCode || 400,
      e.message,
    );
  }
}

async function updateNotificationById(req, res) {
  try {
    const notification = await notificationService.update(req);

    return responseJson.responseSuccess(
      res,
      200,
      'success update data',
      { notification },
    );
  } catch (e) {
    return responseJson.responseError(
      res,
      e.statusCode || 400,
      e.message,
    );
  }
}

async function deleteNotificationById(req, res) {
  try {
    const notification = await notificationService.destroy(req.params.id);

    return responseJson.responseSuccess(
      res,
      200,
      'success delete notification',
      { notification },
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
  getNotificationById,
  getAllNotificationByStatus,
  createNotification,
  updateNotificationById,
  deleteNotificationById,
};
