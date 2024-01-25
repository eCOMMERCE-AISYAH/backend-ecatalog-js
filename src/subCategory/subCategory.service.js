import slugify from 'slugify';
import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';
import subCategoryQuery from '../../helper/query/subCategory.query.js';

async function create(req) {
  const { name, categoryId } = req.body;
  const slug = slugify(name, { lower: true });

  const isExist = await prisma.subCategory.count({
    where: {
      name,
    },
  });

  if (isExist > 0) {
    throw new ApiErrorHandling(400, 'sub category is exist');
  }

  const result = await prisma.subCategory.create(subCategoryQuery.create(name, slug, categoryId));

  if (!result) {
    throw new ApiErrorHandling(400, 'cannot create sub category');
  }

  return result;
}

async function getAll(req) {
  const { take, skip } = req.query;

  const result = await prisma.subCategory.findMany(subCategoryQuery.getAll(take, skip));

  if (!result) {
    throw new ApiErrorHandling(404, 'sub category not found');
  }

  return result;
}

async function getDetail(req) {
  const { slug } = req.params;

  const result = await prisma.subCategory.findUnique(subCategoryQuery.getDetail(slug));

  if (!result) {
    throw new ApiErrorHandling(404, 'sub category not found');
  }

  return result;
}

async function update(req) {
  const { id } = req.params;
  const { name } = req.body;
  const slug = slugify(name, { lower: true });

  const result = await prisma.subCategory.update(subCategoryQuery.update(id, name, slug));

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
  getDetail,
  update,
  destroy,
};
