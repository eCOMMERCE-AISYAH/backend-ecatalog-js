import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

async function getAllByQuery(req) {
  const { take, skip, userid } = req.query;

  const result = await prisma.cartProduct.findMany({
    take: take !== undefined ? Number(take) : undefined,
    skip: skip !== undefined ? Number(skip) : undefined,
    where: {
      userId: userid !== undefined ? userid : undefined,
    },
    include: {
      product: true,
    },
  });

  return result;
}

async function get(id) {
  const result = await prisma.cartProduct.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      product: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'not found');
  }

  return result;
}
async function create(req) {
  const {
    quantity, userId, productId, notes,
  } = req.body;

  const data = {
    quantity,
    notes,
    user: {
      connect: {
        id: userId,
      },
    },
    product: {
      connect: {
        id: productId,
      },
    },
  };

  const result = await prisma.cartProduct.create({
    data: {
      ...data,
    },
    include: {
      user: true,
      product: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(500, 'internal server error');
  }

  return result;
}

async function update(id, req) {
  const {
    quantity, userId, productId, notes,
  } = req.body;

  const data = {
    quantity,
    notes,
    user: {
      connect: {
        id: userId,
      },
    },
    product: {
      connect: {
        id: productId,
      },
    },
  };

  const result = await prisma.cartProduct.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
    include: {
      user: true,
      product: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(500, 'internal server error');
  }

  return result;
}

async function destroy(id) {
  const checkExisting = await get(id);
  if (!checkExisting) {
    throw new ApiErrorHandling(404, 'cart product not found');
  }

  const result = await prisma.cartProduct.delete({
    where: {
      id,
    },
  });

  return result;
}

export default {
  getAllByQuery,
  create,
  get,
  destroy,
  update,
};
