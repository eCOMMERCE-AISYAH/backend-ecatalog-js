import productService from './product.service.js';
import ResponseJson from '../../helper/responseJson.js';

async function createProduct(req, res) {
  try {
    const product = await productService.create(req);

    return ResponseJson.responseSuccess(
      res,
      201,
      'success create product',
      { product },
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function getAllProducts(req, res) {
  try {
    const product = await productService.getAll(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success get all products',
      { product },
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function getAllProductsBySubCategory(req, res) {
  try {
    const product = await productService.getAllBySubCategory(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success get products by sub category',
      { product },
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function getProductById(req, res) {
  try {
    const product = await productService.getById(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success get product detail',
      { product },
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function updateProduct(req, res) {
  try {
    const product = await productService.update(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success update product',
      { product },
    );
  } catch (err) {
    return ResponseJson.responseError(
      res,
      err.statusCode || 400,
      err.message,
    );
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await productService.destroy(req);

    return ResponseJson.responseSuccess(
      res,
      200,
      'success delete product',
      { product },
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
  createProduct,
  getAllProducts,
  getAllProductsBySubCategory,
  getProductById,
  updateProduct,
  deleteProduct,
};
