import slugify from 'slugify';
import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

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

  const result = await prisma.subCategory.create({
    data: {
      name,
      slug,
      categoryId,
    },
    include: {
      category: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(400, 'cannot create sub category');
  }

  return result;
}

async function getAll(req) {
  const { take, skip } = req.query;

  const result = await prisma.subCategory.findMany({
    take: take !== undefined ? Number(take) : undefined,
    skip: skip !== undefined ? Number(skip) : undefined,
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'sub category not found');
  }

  return result;
}

async function getDetail(req) {
  const { id } = req.params;

  const result = await prisma.subCategory.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'sub category not found');
  }

  return result;
}

async function update(req) {
  const { id } = req.params;
  const { name, categoryId } = req.body;
  const slug = slugify(name, { lower: true });

  const result = await prisma.subCategory.update({
    data: {
      name,
      slug,
      categoryId,
    },
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to update sub category');
  }

  return result;
}

async function destroy(req) {
  const { id } = req.params;

  const result = await prisma.subCategory.delete({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

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
