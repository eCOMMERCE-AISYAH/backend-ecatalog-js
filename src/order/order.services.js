import cryptoRandomString from 'crypto-random-string';
import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

async function getAllByQuery(req) {
  const {
    take, skip, name, phonenumber, userid, status,
  } = req.query;

  const result = await prisma.order.findMany({
    take: take === undefined ? undefined : Number(take),
    skip: skip === undefined ? undefined : Number(skip),
    where: {
      name: name !== undefined ? name : undefined,
      phoneNumber: phonenumber !== undefined ? phonenumber : undefined,
      userId: userid !== undefined ? userid : undefined,
      status: status !== undefined ? status : undefined,
    },
    include: {
      user: true,
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
    include: {
      user: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'order not found');
  }

  return result;
}

async function create(req) {
  const {
    name, phoneNumber, address, notes, totalPrice, userId, status, description,
  } = req.body;

  const currentDate = new Date();
  const [day, month, year] = [
    'getDate',
    'getMonth',
    'getFullYear',
  ].map((method) => currentDate[method]());
  const randomString = cryptoRandomString({ length: 5, type: 'distinguishable' });
  const invoice = `${year.toString().substr(2)}${month + 1}${day}${randomString}`;

  const data = {
    name,
    phoneNumber,
    address,
    notes,
    totalPrice,
    status,
    description,
    invoice,
    user: {
      connect: {
        id: userId,
      },
    },
  };

  const result = await prisma.order.create({
    data: {
      ...data,
    },
    include: {
      user: true,
    },

  });

  if (!result) {
    throw new ApiErrorHandling(500, 'internal server error');
  }

  return result;
}

async function update(id, req) {
  const { description, status } = req.body;

  const result = await prisma.order.update({
    where: {
      id,
    },
    data: {
      description,
      status,
    },
  });

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
  update,
};
