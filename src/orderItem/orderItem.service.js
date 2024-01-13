import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

async function getAllByQuery(req) {
  const { orderid } = req.query;

  const result = await prisma.orderItem.findMany({
    where: {
      orderId: orderid !== undefined ? orderid : undefined,
    },
    include: {
      order: true,
      product: true,
    },
  });

  return result;
}

async function getById(id) {
  const result = await prisma.orderItem.findUnique({
    where: {
      id,
    },
    include: {
      order: true,
      product: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'order not found');
  }

  return result;
}

async function create(req) {
  const { orderId, productId, quantinty } = req.body;
  const data = {
    orderId,
    productId,
    quantinty,
  };

  const result = await prisma.orderItem.create({
    data: {
      ...data,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(400, 'failed create order item');
  }

  return result;
}

export default {
  getAllByQuery,
  getById,
  create,
};
