import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

async function getAll(req) {
  const { take, skip } = req.query;

  let result;
  if (take === undefined || skip === undefined) {
    result = await prisma.order.findMany();
  } else {
    result = await prisma.order.findMany({
      skip,
      take,
    });
  }
  //
  if (!result) {
    throw new ApiErrorHandling(500, 'internal server error');
  }

  return result;
}

async function get(id) {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'order not found');
  }

  return result;
}

async function create(req) {
  const {
    name, phoneNumber, address, notes, totalPrice, cartId,
  } = req.body;

  const data = {
    name,
    phoneNumber,
    address,
    notes,
    totalPrice,
    cart: {
      connect: {
        id: cartId,
      },
    },
  };

  const result = await prisma.order.create({
    data: {
      ...data,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(500, 'internal server error');
  }

  return result;
}

async function destroy(id) {
  // eslint-disable-next-line no-unused-vars
  const checkExistOrder = await get(id);

  const result = await prisma.order.delete({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(500, 'internal server error');
  }
}

export default {
  get,
  getAll,
  create,
  destroy,
};
