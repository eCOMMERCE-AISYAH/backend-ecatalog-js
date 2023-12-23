import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

async function create(req) {
  const { name, categoryId } = req.body;

  const result = await prisma.subCategory.create({
    data: {
      name,
      categoryId,
    },
    include: {
      category: true,
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
    result = await prisma.subCategory.findMany({
      include: {
        category: true,
      },
    });
  } else {
    result = await prisma.subCategory.findMany({
      include: {
        category: true,
      },
      take,
      skip,
    });
  }

  if (!result) {
    throw new ApiErrorHandling(404, 'sub category not found');
  }

  return result;
}

async function getById(req) {
  const { id } = req.params;

  const result = await prisma.subCategory.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'sub category not found');
  }

  return result;
}

async function update(req) {
  const { id } = req.params;
  const { name } = req.body;

  const result = await prisma.subCategory.update({
    data: {
      name,
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
  getById,
  update,
  destroy,
};
