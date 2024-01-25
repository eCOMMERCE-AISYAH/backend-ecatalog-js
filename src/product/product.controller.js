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

async function getAllProductsByQuery(req, res) {
  try {
    const product = await productService.getAllByQuery(req);

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

async function getProductDetail(req, res) {
  try {
    const product = await productService.getDetail(req);

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
  getAllProductsByQuery,
  getProductDetail,
  updateProduct,
  deleteProduct,
};
