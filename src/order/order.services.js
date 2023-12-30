import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

async function getAllByQuery(req) {
  const {
    take, skip, name, phonenumber, cartid,
  } = req.query;

  const result = await prisma.order.findMany({
    take: take === undefined ? undefined : Number(take),
    skip: skip === undefined ? undefined : Number(skip),
    where: {
      name: name !== undefined ? name : undefined,
      phoneNumber: phonenumber !== undefined ? phonenumber : undefined,
      cartId: cartid !== undefined ? cartid : undefined,
    },
    include: {
      cart: true,
    },
  });

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
    select: {
      id: true,
      name: true,
      phoneNumber: true,
      address: true,
      notes: true,
      cart: {
        select: {
          id: true,
          cookieId: true,
        },
      },
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
    include: {
      cart: true,
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
  getAllByQuery,
  create,
  destroy,
};
