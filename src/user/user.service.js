import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';
import userQuery from '../../helper/query/user.query.js';

async function register(req) {
  const { name, username, password } = req.body;

  const isUserExist = await prisma.user.count({
    where: {
      username,
    },
  });

  if (isUserExist > 0) {
    throw new ApiErrorHandling(400, 'username is already use');
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await prisma.user.create(
    userQuery.create(
      name,
      username,
      hashedPassword,
    ),
  );

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to register');
  }

  return result;
}

async function login(req) {
  const { username, password } = req.body;
  const token = uuid().toString();

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new ApiErrorHandling(401, 'Username or password is invalid');
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new ApiErrorHandling(401, 'Username or password is invalid');
  }

  return prisma.user.update({
    data: {
      token,
    },
    where: {
      username,
    },
    select: {
      token: true,
    },
  });
}

async function getById(req) {
  const { id } = req.params;

  const result = await prisma.user.findUnique(userQuery.getById(id));

  if (!result) {
    throw new ApiErrorHandling(404, 'user not found');
  }

  return result;
}

async function update(req) {
  const { id } = req.params;
  const { name, oldPassword, newPassword } = req.body;

  const user = await prisma.user.findUnique({
    where: { id },
    select: { password: true },
  });

  if (!user) {
    throw new ApiErrorHandling(404, 'User not found');
  }

  const storedPassword = user.password;

  // Update all data
  if (name && oldPassword && newPassword) {
    const passwordMatch = await bcrypt.compare(oldPassword, storedPassword);

    if (!passwordMatch) {
      throw new ApiErrorHandling(400, 'Old password does not match');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    return userQuery.update(id, { name, password: hashedNewPassword });
  }

  // Update only name
  if (name) {
    return userQuery.update(id, { name });
  }

  // Update only password
  if (oldPassword && newPassword) {
    const passwordMatch = await bcrypt.compare(oldPassword, storedPassword);

    if (!passwordMatch) {
      throw new ApiErrorHandling(400, 'Old password does not match');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    return userQuery.update(id, { password: hashedNewPassword });
  }

  throw new ApiErrorHandling(400, 'Invalid update request');
}

async function destroy(req) {
  const { id } = req.params;

  const result = await prisma.user.delete(userQuery.destroy(id));

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to delete user');
  }

  return result;
}

export default {
  register,
  login,
  getById,
  update,
  destroy,
};
