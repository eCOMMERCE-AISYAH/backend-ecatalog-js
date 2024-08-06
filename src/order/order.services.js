import cryptoRandomString from 'crypto-random-string';
import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';
import orderHistoryService from '../orderHistory/orderHistory.service.js';
import productUtil from '../product/product.util.js';
import orderHistoryUtil from '../orderHistory/orderHistory.util.js';

// DASHBOARD

async function count() {
  const result = await prisma.order.count();

  if (!result) {
    throw new ApiErrorHandling(500, 'internal server error');
  }

  return result;
}

async function omzetByOrderStatus() {
  const result = await prisma.order.aggregate({
    _sum: {
      totalPrice: true,
    },
    where: {
      status: 'SUKSES',
    },
  });
  if (!result) {
    throw new ApiErrorHandling(500, 'internal server error');
  }

  return result._sum.totalPrice;
}
// ======================

async function getAllByQuery(req) {
  const {
    take, skip, name, phonenumber, userid, status,
  } = req.query;

  const result = await prisma.order.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
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
      orderHistory: true,
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

  // CREATE ORDER HISTORY
  await orderHistoryUtil.create({
    orderId: result.id,
    userId: result.user.id,
  });

  return result;
}

async function update(id, req) {
  const { status } = req.body;
  let result;
  if (status === 'BATAL') {
    result = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    if (!result) throw new ApiErrorHandling(500, 'internal server error');

    const removeOrderHistory = await orderHistoryUtil.destroyMany(id);

    if (!removeOrderHistory) {
      throw new ApiErrorHandling(500, 'internal server error');
    }
  } else if (status === 'SUKSES') {
    result = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    console.log('update success');

    if (!result) throw new ApiErrorHandling(500, 'internal server error');

    const reduceProduct = await orderHistoryUtil.reduceStockByOrderHistory(id);
    console.log(reduceProduct);
    if (!reduceProduct) {
      throw new ApiErrorHandling(500, 'internal server error');
    }
    console.log('success order update status');
  } else {
    throw new ApiErrorHandling(400, 'invalid status');
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
  update,
  count,
  omzetByOrderStatus,
};
