import userService from './user.service.js';
import ResponseJson from '../../helper/responseJson.js';

async function createUser(req, res) {
  try {
    const user = await userService.create(req);

    return ResponseJson.responseSuccess(
      res,
      201,
      'success to register',
      { user },
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function getUserById(req, res) {
  try {
    const user = await userService.getById(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success get user detail',
      { user },
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function updateUser(req, res) {
  try {
    const user = await userService.update(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success update user',
      { user },
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function deleteUser(req, res) {
  try {
    const user = await userService.destroy(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success delete user',
      { user },
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

export default {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
