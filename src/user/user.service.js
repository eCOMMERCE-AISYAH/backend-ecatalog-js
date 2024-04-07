import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

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

  const userData = {
    name: name !== null ? name : null,
    username,
    ...(guest ? { token, role } : {
      password: hashedPassword,
      address,
      phoneNumber,
      role: guest ? role : 'USER',
      token: null,
    }),
  };

  const result = await prisma.user.create({
    data: userData,
  });

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

  const result = await prisma.user.findMany({
    take: take !== undefined ? Number(take) : undefined,
    skip: skip !== undefined ? Number(skip) : undefined,
    where: {
      username: (username !== undefined && username.includes('guest')) ? { startsWith: username } : undefined,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'user not found');
  }

  return result;
}

async function getById(req) {
  const { id } = req.params;

  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

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
    return prisma.user.update({
      where: { id },
      data: {
        name,
        password: hashedNewPassword,
        address,
        phoneNumber,
      },
    });
  }

  // Update name, address, and phone
  if (name && address && phoneNumber) {
    return prisma.user.update({
      where: { id },
      data: {
        name,
        address,
        phoneNumber,
      },
    });
  }

  // Update name and address
  if (name && address) {
    return prisma.user.update({
      where: { id },
      data: {
        name,
        address,
      },
    });
  }

  // Update only name
  if (name) {
    return prisma.user.update({
      where: { id },
      data: {
        name,
      },
    });
  }

  // Update only address
  if (address) {
    return prisma.user.update({
      where: { id },
      data: {
        address,
      },
    });
  }

  // Update only phoneNumber
  if (phoneNumber) {
    return prisma.user.update({
      where: { id },
      data: {
        phoneNumber,
      },
    });
  }

  // Update only password
  if (oldPassword && newPassword) {
    const passwordMatch = await bcrypt.compare(oldPassword, storedPassword);

    if (!passwordMatch) {
      throw new ApiErrorHandling(400, 'Old password does not match');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    return prisma.user.update({
      where: { id },
      data: {
        password: hashedNewPassword,
      },
    });
  }

  throw new ApiErrorHandling(400, 'Invalid update request');
}

async function logout(req) {
  const { id } = req.body;

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

  const result = await prisma.user.delete({
    where: {
      id,
    },
  });

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
