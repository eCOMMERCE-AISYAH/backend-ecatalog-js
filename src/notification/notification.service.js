import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

async function getAllByQuery(req) {
  const { skip, take, status } = req.query;

  const result = await prisma.notification.findMany({
    take: take === undefined ? undefined : Number(take),
    skip: skip === undefined ? undefined : Number(skip),
    where: {
      status: status !== undefined ? (status === 'true') : undefined,
    },
    include: {
      order: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(500, 'internal server error');
  }

  return result;
}

async function get(id) {
  const result = await prisma.notification.findUnique({
    where: {
      id,
    },
    include: {
      order: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'notification not found');
  }

  return result;
}

async function create(req) {
  const { status = false, orderId } = req.body;

  const data = {
    status,
    order: {
      connect: {
        id: orderId,
      },
    },
  };

  const result = await prisma.notification.create({
    data: {
      ...data,
    },
    include: {
      order: true,
    },
  });

  return result;
}

async function update(req) {
  const { status, cartId } = req.body;

  const data = {
    status, cartId,
  };

  const result = await prisma.notification.update({
    where: {
      id: req.params.id,
    },
    data: {
      ...data,
    },
    include: {
      order: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(500, 'internal server error');
  }

  return result;
}

async function destroy(id) {
  const checKExist = await get(id);
  if (!checKExist) {
    throw new ApiErrorHandling(404, 'id not found');
  }

  const result = await prisma.notification.delete({
    where: {
      id,
    },
  });

  return result;
}

export default {
  getAllByQuery, create, update, get, destroy,
};
