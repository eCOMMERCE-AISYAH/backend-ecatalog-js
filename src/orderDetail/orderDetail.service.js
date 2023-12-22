import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

const get = async (id) => {
  const result = await prisma.orderDetail.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'detail order not found');
  }

  return result;
};

const create = async (body) => {
  const {
    name, phoneNumber, address, notes,
  } = body;

  const data = {
    name,
    address,
    notes,
    phoneNumber,
  };
  const result = await prisma.orderDetail.create({
    data: {
      ...data,
    },
  });
  if (!result) {
    throw new ApiErrorHandling(500, 'internal server error');
  }

  return result;
};

export default {
  create,
  get,
};
