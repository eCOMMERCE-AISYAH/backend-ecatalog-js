import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

async function getAll(req) {
  const { take, skip } = req.query;

  let result;
  if (take === undefined || skip === undefined) {
    result = await prisma.cartProduct.findMany();
  } else {
    result = await prisma.cartProduct.findMany({
      take,
      skip,
    });
  }

  return result;
}
async function create(req) {
  const {
    quantity, cartId, productId, notes, status,
  } = req.body;

  const data = {
    quantity,
    notes,
    status,
    cart: {
      connect: {
        id: cartId,
      },
    },
    product: {
      connect: {
        id: productId,
      },
    },
  };

  const result = await prisma.cartProduct.create({
    data: {
      ...data,
    },
  });
  if (!result) {
    throw new ApiErrorHandling(500, 'internal server error');
  }

  return result;
}

export {
  getAll,
  create,
};
