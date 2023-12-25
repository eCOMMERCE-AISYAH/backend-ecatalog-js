import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';
import subCategoryQuery from '../../helper/query/subCategory.query.js';

async function create(req) {
  const { name, categoryId } = req.body;

  const isExist = await prisma.subCategory.count({
    where: {
      name,
    },
  });

  if (isExist > 0) {
    throw new ApiErrorHandling(400, 'sub category is exist');
  }

  const result = await prisma.subCategory.create(subCategoryQuery.create(name, categoryId));

  if (!result) {
    throw new ApiErrorHandling(400, 'cannot create sub category');
  }

  return result;
}

async function getAll(req) {
  const { take = undefined, skip = undefined } = req.query;

  const result = await prisma.subCategory.findMany(subCategoryQuery.getAll(take, skip));

  if (!result.length) {
    throw new ApiErrorHandling(404, 'sub category not found');
  }

  return result;
}

async function getById(req) {
  const { id } = req.params;

  const result = await prisma.subCategory.findUnique(subCategoryQuery.getById(id));

  if (!result) {
    throw new ApiErrorHandling(404, 'sub category not found');
  }

  return result;
}

async function update(req) {
  const { id } = req.params;
  const { name } = req.body;

  const result = await prisma.subCategory.update(subCategoryQuery.update(id, name));

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to update sub category');
  }

  return result;
}

async function destroy(req) {
  const { id } = req.params;

  const result = await prisma.subCategory.delete(subCategoryQuery.destroy(id));

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to delete sub category');
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
