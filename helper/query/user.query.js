import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../apiErrorHandling.js';

function create(name, username, hashedPassword) {
  return {
    data: {
      name,
      username,
      password: hashedPassword,
    },
  };
}

function getById(id) {
  return {
    where: {
      id,
    },
  };
}

async function update(id, data) {
  const result = await prisma.user.update({
    where: { id },
    data,
  });

  if (!result) {
    throw new ApiErrorHandling(400, 'Failed to update user');
  }

  return result;
}

function destroy(id) {
  return {
    where: {
      id,
    },
  };
}

export default {
  create,
  getById,
  update,
  destroy,
};
