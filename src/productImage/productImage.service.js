import prisma from '../../prisma/prismaClient.js';

async function create(req) {
  const image = req.file.path;
  const { productId } = req.body;

  const result = await prisma.productImage.create({
    data: {
      image,
      product: {
        connect: {
          id: productId,
        },
      },
    },
  });

  return result;
}

async function getByQuery(req) {
  const { productId } = req.body;

  const result = await prisma.productImage.findMany({
    where: {
      productId: productId === undefined ? undefined : productId,
    },
  });

  return result;
}

export default {
  create,
  getByQuery,
};
