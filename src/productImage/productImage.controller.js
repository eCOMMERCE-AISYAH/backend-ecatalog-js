import productImageService from './productImage.service.js';
import responseJson from '../../helper/responseJson.js';

async function getAllImage(req, res) {
  try {
    const image = await productImageService.getByQuery(req);

    return responseJson.responseSuccess(
      res,
      200,
      'success get images',
      { image },
    );
  } catch (e) {
    console.log(e);
    return responseJson.responseError(
      res,
      e.statusCode || 400,
      e.message,
    );
  }
}

async function createImage(req, res) {
  try {
    const image = await productImageService.create(req);

    return responseJson.responseSuccess(
      res,
      201,
      'success create image',
      { image },
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
  getAllImage,
  createImage,
};
