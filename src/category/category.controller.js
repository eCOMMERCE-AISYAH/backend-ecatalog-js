import categoryService from './category.service.js';
import ResponseError from '../../helper/responseError.js';

async function createCategory(req, res) {
  try {
    const category = await categoryService.create(req);

    return res.status(200).json({
      status: 'success',
      message: 'success create category',
      data: {
        category,
      },
    });
  } catch (err) {
    return ResponseError(res, err.statusCode || 400, err.message);
  }
}

async function getAllCategory(req, res) {
  try {
    const category = await categoryService.getAll(req);

    return res.status(200).json({
      status: 'success',
      message: 'success get all category',
      data: {
        category,
      },
    });
  } catch (err) {
    return ResponseError(res, err.statusCode || 400, err.message);
  }
}

async function getCategoryById(req, res) {
  try {
    const category = await categoryService.getById(req);

    return res.status(200).json({
      status: 'success',
      message: 'success get category detail',
      data: {
        category,
      },
    });
  } catch (err) {
    return ResponseError(res, err.statusCode || 400, err.message);
  }
}

async function updateCategory(req, res) {
  try {
    const category = await categoryService.update(req);

    return res.status(200).json({
      status: 'success',
      message: 'success update category',
      data: {
        category,
      },
    });
  } catch (err) {
    return ResponseError(res, err.statusCode || 400, err.message);
  }
}

async function deleteCategory(req, res) {
  try {
    const category = await categoryService.destroy(req);

    return res.status(200).json({
      status: 'success',
      message: 'success delete category',
      data: {
        category,
      },
    });
  } catch (err) {
    return ResponseError(res, err.statusCode || 400, err.message);
  }
}

export default {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
