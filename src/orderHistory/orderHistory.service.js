import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

async function getAllByQuery(req) {
  const { orderid, take, skip } = req.query;

  const result = await prisma.orderHistory.findMany({
    where: {
      take: take === undefined ? undefined : Number(take),
      skip: skip === undefined ? undefined : Number(skip),
      orderId: orderid === undefined ? undefined : orderid,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(500, 'internal server error');
  }

  return result;
}

async function create(req) {
  const {
    productName, category, subCategory, quantity, productImage, orderId,
  } = req.body;

  const data = {
    productName,
    category,
    subCategory,
    quantity,
    productImage,
    order: {
      connect: {
        id: orderId,
      },
    },
  };

  const result = await prisma.orderHistory.create({
    data: {
      ...data,
    },
  });

  return result;
}

export default {
  getAllByQuery,
  create,
};
