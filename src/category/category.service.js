import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';
import categoryQuery from '../../helper/query/category.query.js';

async function create(req) {
  const { name } = req.body;

  const isExist = await prisma.category.count({
    where: {
      name,
    },
  });

  if (isExist > 0) {
    throw new ApiErrorHandling(400, 'category is exist');
  }

  const result = await prisma.category.create(categoryQuery.create(name));

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to create category');
  }

  return result;
}

async function getAll(req) {
  const { take, skip } = req.query;

  const result = await prisma.category.findMany(categoryQuery.getAll(take, skip));

  if (!result) {
    throw new ApiErrorHandling(404, 'category not found');
  }

  return result;
}

async function getById(req) {
  const { id } = req.params;

  const result = await prisma.category.findUnique(categoryQuery.getById(id));

  if (!result) {
    throw new ApiErrorHandling(404, 'category not found');
  }

  return result;
}

async function update(req) {
  const { id } = req.params;
  const { name } = req.body;

  const result = await prisma.category.update(categoryQuery.update(id, name));

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to update category');
  }

  return result;
}

async function destroy(req) {
  const { id } = req.params;

  const result = await prisma.category.delete(categoryQuery.destroy(id));

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to delete category');
  }

  return result;
}

export default {
  create,
  getAll,
  getById,
  update,
  destroy,
};
