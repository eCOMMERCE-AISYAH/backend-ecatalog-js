import subCategoryService from './subCategory.service.js';
import ResponseJson from '../../helper/responseJson.js';

async function createSubCategory(req, res) {
  try {
    const subCategory = await subCategoryService.create(req);

    return ResponseJson.responseSuccess(
      res,
      201,
      'success create sub category',
      { subCategory },
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function getAllSubCategory(req, res) {
  try {
    const subCategory = await subCategoryService.getAll(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success get all sub category',
      { subCategory },
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function getSubCategoryDetail(req, res) {
  try {
    const subCategory = await subCategoryService.getDetail(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success get sub category detail',
      { subCategory },
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function updateSubCategory(req, res) {
  try {
    const subCategory = await subCategoryService.update(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success update sub category',
      { subCategory },
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function deleteSubCategory(req, res) {
  try {
    const subCategory = await subCategoryService.destroy(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success delete sub category',
      { subCategory },
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
  createSubCategory,
  getAllSubCategory,
  getSubCategoryDetail,
  updateSubCategory,
  deleteSubCategory,
};
