import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

async function get(id) {
  const result = await prisma.cart.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'cart not found');
  }

  return result;
}

async function getAll() {
  const result = await prisma.cart.findMany();

  if (!result) {
    throw new ApiErrorHandling(404, 'cart not found');
  }

  return result;
}

async function create(req) {
  const { cookieId } = req.body;

  const result = await prisma.cart.create({
    data: {
      cookieId,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(500, 'internal server error');
  }
  return result;
}

async function destroy(id) {
  const checkExistCart = await get(id);
  if (!checkExistCart) {
    throw new ApiErrorHandling(404, 'cart not found');
  }

  const result = await prisma.cart.delete({
    where: {
      id,
    },
  });

  return result;
}

export default {
  get,
  getAll,
  create,
  destroy,
};