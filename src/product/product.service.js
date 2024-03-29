import slugify from 'slugify';
import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';
import productQuery from '../../helper/query/product.query.js';

async function create(req) {
  const {
    name,
    description,
    stock,
    subCategoryId,
    price,
  } = req.body;
  const slug = slugify(name, { lower: true });

  const isExist = await prisma.product.count({
    where: {
      name,
    },
  });

  if (isExist > 0) {
    throw new ApiErrorHandling(400, 'product is exist');
  }

  const result = await prisma.product.create(
    productQuery.create(
      name,
      slug,
      description,
      stock,
      subCategoryId,
      price,
    ),
  );

  if (!result) {
    throw new ApiErrorHandling(400, 'cannot create product');
  }

  return result;
}

async function getAllByQuery(req) {
  const {
    take, skip, name, subCategory, price,
  } = req.query;

  const result = await prisma.product.findMany(
    productQuery.getAllByQuery(take, skip, name, subCategory, price),
  );

  if (!result) {
    throw new ApiErrorHandling(404, 'product not found');
  }

  return result;
}

async function getDetail(req) {
  const { id } = req.params;

  const result = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'product not found');
  }

  return result;
}

async function update(req) {
  const { id } = req.params;
  const {
    name,
    description,
    stock,
    subCategoryId,
    price,
  } = req.body;
  const slug = slugify(name, { lower: true });

  const result = await prisma.product.update(
    productQuery.update(
      id,
      name,
      slug,
      description,
      stock,
      subCategoryId,
      price,
    ),
  );

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to update product');
  }

  return result;
}

async function destroy(req) {
  const { id } = req.params;

  const result = await prisma.product.delete(productQuery.destroy(id));

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to delete product');
  }

  return result;
}

export default {
  create,
  getAllByQuery,
  getDetail,
  update,
  destroy,
};
