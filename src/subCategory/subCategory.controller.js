import subCategoryService from './subCategory.service.js';
import ResponseError from '../../helper/responseError.js';

async function createSubCategory(req, res) {
  try {
    const subCategory = await subCategoryService.create(req);

    return res.status(201).json({
      status: 'success',
      message: 'success create sub category',
      data: {
        subCategory,
      },
    });
  } catch (err) {
    return ResponseError(res, err.statusCode || 400, err.message);
  }
}

async function getAllSubCategory(req, res) {
  try {
    const subCategory = await subCategoryService.getAll(req);

    return res.status(200).json({
      status: 'success',
      message: 'success get all sub category',
      data: {
        subCategory,
      },
    });
  } catch (err) {
    return ResponseError(res, err.statusCode || 400, err.message);
  }
}

async function getSubCategoryById(req, res) {
  try {
    const subCategory = await subCategoryService.getById(req);

    return res.status(200).json({
      status: 'success',
      message: 'success get sub category detail',
      data: {
        subCategory,
      },
    });
  } catch (err) {
    return ResponseError(res, err.statusCode || 400, err.message);
  }
}

async function updateSubCategory(req, res) {
  try {
    const subCategory = await subCategoryService.update(req);

    return res.status(200).json({
      status: 'success',
      message: 'success update sub category',
      data: {
        subCategory,
      },
    });
  } catch (err) {
    return ResponseError(res, err.statusCode || 400, err.message);
  }
}

async function deleteSubCategory(req, res) {
  try {
    const subCategory = await subCategoryService.destroy(req);

    return res.status(200).json({
      status: 'success',
      message: 'success delete sub category',
      data: {
        subCategory,
      },
    });
  } catch (err) {
    return ResponseError(res, err.statusCode || 400, err.message);
  }
}

export default {
  createSubCategory,
  getAllSubCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
