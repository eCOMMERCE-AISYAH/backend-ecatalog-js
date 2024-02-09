import userService from './user.service.js';
import ResponseJson from '../../helper/responseJson.js';

async function registerUser(req, res) {
  try {
    const user = await userService.register(req);

    return ResponseJson.responseSuccess(
      res,
      201,
      'success to register',
      user,
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function loginUser(req, res) {
  try {
    const user = await userService.login(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success to login',
      user,
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function getAllUser(req, res) {
  try {
    const user = await userService.getAll(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success get all user',
      user,
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
      user,
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
      user,
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function logoutUser(req, res) {
  try {
    const user = await userService.logout(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success logout',
      user,
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
      user,
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
  registerUser,
  loginUser,
  getAllUser,
  getUserById,
  updateUser,
  logoutUser,
  deleteUser,
};
