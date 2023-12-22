import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

async function create(req) {
  const { name } = req.body;

  const category = {
    name,
  };

  const result = await prisma.category.create({
    data: {
      category,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(500, 'internal server error');
  }

  return result;
}

async function getAll(req) {
  const { take, skip } = req.query;

  let result;
  if (take === undefined || skip === undefined) {
    result = await prisma.category.findMany();
  } else {
    result = await prisma.category.findMany({
      take,
      skip,
    });
  }

  return result;
}

async function getCategoryById(req) {
  const { id } = req.params;

  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'category not found');
  }

  return result;
}

async function updateCategory(req) {
  const { id } = req.params;
  const { name } = req.body;
  const category = {
    name,
  };

  const result = await prisma.category.update({
    data: {
      category,
    },
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'category not found');
  }

  return result;
}

export default {
  create,
  getAll,
  getCategoryById,
  updateCategory,
};
