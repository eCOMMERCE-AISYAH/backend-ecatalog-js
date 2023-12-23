import categoryService from './category.service.js';
import ResponseJson from '../../helper/responseJson.js';

async function createCategory(req, res) {
  try {
    const category = await categoryService.create(req);

    return ResponseJson.responseSuccess(
      res,
      201,
      'success create category',
      { category },
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function getAllCategory(req, res) {
  try {
    const category = await categoryService.getAll(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success get all category',
      { category },
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function getCategoryById(req, res) {
  try {
    const category = await categoryService.getById(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success get category detail',
      { category },
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function updateCategory(req, res) {
  try {
    const category = await categoryService.update(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success update category',
      { category },
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function deleteCategory(req, res) {
  try {
    const category = await categoryService.destroy(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success delete category',
      { category },
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
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
