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

  if (!getCartProduct) return false;

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

  await prisma.orderHistory.createMany({
    data,
  });

  return true;

  // await prisma.cartProduct.deleteMany({
  //   where: {
  //     id: userId,
  //   },
  // });
}

export default {
  getAllByQuery,
  create,
};
