import slugify from 'slugify';
import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

async function create(req) {
  const { name } = req.body;
  const slug = slugify(name, { lower: true });

  const isExist = await prisma.category.count({
    where: {
      name,
    },
  });

  if (isExist > 0) {
    throw new ApiErrorHandling(400, 'category is exist');
  }

  const result = await prisma.category.create({
    data: {
      name,
      slug,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to create category');
  }

  return result;
}

async function getAll(req) {
  const { take, skip } = req.query;

  const result = await prisma.category.findMany({
    take: take !== undefined ? Number(take) : undefined,
    skip: skip !== undefined ? Number(skip) : undefined,
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'category not found');
  }

  return result;
}

async function getById(req) {
  const { id } = req.params;

  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      subCategories: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'category not found');
  }

  return result;
}

async function getDetail(req) {
  const { slug } = req.params;

  const result = await prisma.category.findUnique({
    where: {
      slug,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'category not found');
  }

  return result;
}

async function update(req) {
  const { id } = req.params;
  const { name } = req.body;
  const slug = slugify(name, { lower: true });

  const result = await prisma.category.update({
    data: {
      name,
      slug,
    },
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to update category');
  }

  return result;
}

async function destroy(req) {
  const { id } = req.params;

  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to delete category');
  }

  return result;
}

export default {
  create,
  getAll,
  getDetail,
  update,
  destroy,
  getById,
};
