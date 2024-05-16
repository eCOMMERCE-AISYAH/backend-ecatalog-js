// eslint-disable-next-line import/extensions
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
  const { orderId, userId } = req;

  const getCartProduct = await prisma.cartProduct.findMany({
    where: {
      userId,
    },
    include: {
      product: {
        include: {
          images: true,
          subCategory: true,
        },
      },
    },
  });

  if (!getCartProduct || getCartProduct.length < 1) throw new ApiErrorHandling(500, 'cart tidak boleh kosong');

  const createPromises = getCartProduct.map(async (item) => {
    const {
      name, subCategory, images, price,
    } = item.product;

    const data = {
      productName: name,
      subCategory: subCategory.name,
      productImage: images[0].image,
      quantity: item.quantity,
      orderId,
      price,
      totalPrice: (price * item.quantity),
    };

    return data;
  });
  const data = await Promise.all(createPromises);

  const createOrderHistory = await prisma.orderHistory.createMany({
    data,
  });

  if (!createOrderHistory) throw new ApiErrorHandling(500, 'gagal create order history');

  await prisma.cartProduct.deleteMany({
    where: {
      userId,
    },
  });

  return true;
}

export default {
  getAllByQuery,
  create,
};
