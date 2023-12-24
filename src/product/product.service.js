import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

async function create(req) {
  const {
    name,
    description,
    stock,
    subCategoryId,
    price,
  } = req.body;

  const result = await prisma.product.create({
    data: {
      name,
      description,
      stock,
      subCategoryId,
      price,
    },
    include: {
      subCategory: true,
    },
  });

  if (!result) {
    return ApiErrorHandling(500, 'internal server error');
  }

  return result;
}

async function getAll(req) {
  const { take, skip } = req.query;

  let result;
  if (take === undefined || skip === undefined) {
    result = await prisma.product.findMany({});
  } else {
    result = await prisma.product.findMany({
      take,
      skip,
    });
  }

  if (!result) {
    throw new ApiErrorHandling(404, 'products not found');
  }

  return result;
}

async function getAllBySubCategory(req) {
  const { id } = req.params;

  const result = await prisma.product.findMany({
    where: {
      subCategoryId: id,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'products not found');
  }

  return result;
}

async function getById(req) {
  const { id } = req.params;

  const result = await prisma.product.findUnique({
    where: {
      id,
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

  const result = await prisma.product.update({
    data: {
      name,
      description,
      stock,
      subCategoryId,
      price,
    },
    where: {
      id,
    },
    include: {
      subCategory: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to update product');
  }

  return result;
}

async function destroy(req) {
  const { id } = req.params;

  const result = await prisma.product.delete({
    where: {
      id,
    },
    include: {
      subCategory: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to delete product');
  }

  return result;
}

export default {
  create,
  getAll,
  getAllBySubCategory,
  getById,
  update,
  destroy,
};
