import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';
import userQuery from '../../helper/query/user.query.js';

async function register(req) {
  const {
    name, username, password, address, phoneNumber, role,
  } = req.body;
  const guest = username.includes('guest');
  const token = uuid().toString();

  const isUserExist = await prisma.user.count({
    where: {
      username,
    },
  });

  if (isUserExist > 0) {
    throw new ApiErrorHandling(400, 'username is already use');
  }

  // Hash Password
  const hashedPassword = guest ? null : await bcrypt.hash(password, 10);

  const result = await prisma.user.create(
    userQuery.register(
      name,
      username,
      hashedPassword,
      address,
      phoneNumber,
      role,
      token,
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

async function getAll(req) {
  const { take, skip, username } = req.query;

  const result = await prisma.user.findMany(userQuery.getAll(take, skip, username));

  if (!result) {
    throw new ApiErrorHandling(404, 'user not found');
  }

  return result;
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
  const {
    name, oldPassword, newPassword, address, phoneNumber,
  } = req.body;

  const user = await prisma.user.findUnique({
    where: { id },
    select: { password: true },
  });

  if (!user) {
    throw new ApiErrorHandling(404, 'User not found');
  }

  const storedPassword = user.password;

  // Update all data
  if (name && oldPassword && newPassword && address && phoneNumber) {
    const passwordMatch = await bcrypt.compare(oldPassword, storedPassword);

    if (!passwordMatch) {
      throw new ApiErrorHandling(400, 'Old password does not match');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    return userQuery.update(id, {
      name, password: hashedNewPassword, address, phoneNumber,
    });
  }

  // Update name, address, and phone
  if (name && address && phoneNumber) {
    return userQuery.update(id, { name, address, phoneNumber });
  }

  // Update name and address
  if (name && address) {
    return userQuery.update(id, { name, address });
  }

  // Update only name
  if (name) {
    return userQuery.update(id, { name });
  }

  // Update only address
  if (address) {
    return userQuery.update(id, { address });
  }

  // Update only phoneNumber
  if (phoneNumber) {
    return userQuery.update(id, { phoneNumber });
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

async function logout(req) {
  const { id } = req.body;
  console.log(id);

  const result = await prisma.user.update({
    data: {
      token: null,
    },
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'logout failed');
  }

  return result;
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
  getAll,
  getById,
  update,
  logout,
  destroy,
};
