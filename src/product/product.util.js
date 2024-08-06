import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

async function reduceProduct(id, quantity) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    throw new ApiErrorHandling(404, 'product not found');
  }

  if (product.stock < quantity) {
    throw new ApiErrorHandling(400, 'stock not enough');
  }

  const result = await prisma.product.update({
    where: {
      id,
    },
    data: {
      stock: {
        decrement: quantity,
      },
    },
  });

  return true;
}

async function addTotalSold(id, quantity) {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      totalSold: {
        increment: quantity,
      },
    },
  });

  if (!product) {
    throw new ApiErrorHandling(404, 'product not found');
  }

  return true;
}

export default {
  reduceProduct,
  addTotalSold,
};
