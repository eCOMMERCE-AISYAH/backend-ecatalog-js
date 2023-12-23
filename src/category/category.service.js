import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

async function create(req) {
  const { name } = req.body;

  const result = await prisma.category.create({
    data: {
      name,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to create category');
  }

  return result;
}

async function getAll(req) {
  const { take, skip } = req.query;

  let result;
  if (take === undefined || skip === undefined) {
    result = await prisma.category.findMany({
      include: {
        subCategories: true,
      },
    });
  } else {
    result = await prisma.category.findMany({
      include: {
        subCategories: true,
      },
      take,
      skip,
    });
  }

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

async function update(req) {
  const { id } = req.params;
  const { name } = req.body;

  const result = await prisma.category.update({
    data: {
      name,
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
  getById,
  update,
  destroy,
};
