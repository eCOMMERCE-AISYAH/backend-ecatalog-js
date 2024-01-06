import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../apiErrorHandling.js';

function register(name, username, hashedPassword, address, phoneNumber, token) {
  const guest = username.includes('guest');
  const userData = {
    name: name !== null ? name : null,
    username,
    ...(guest ? { token } : {
      password: hashedPassword, address, phoneNumber, token: null,
    }),
  };

  return {
    data: userData,
  };
}

function getAll(take, skip, username) {
  return {
    take: take !== undefined ? Number(take) : undefined,
    skip: skip !== undefined ? Number(skip) : undefined,
    where: {
      username: (username !== undefined && username.includes('guest')) ? { startsWith: username } : undefined,
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
    throw new ApiErrorHandling(400, 'failed to update user');
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
  register,
  getAll,
  getById,
  update,
  destroy,
};
