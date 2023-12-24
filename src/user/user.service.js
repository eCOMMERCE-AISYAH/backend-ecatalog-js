import bcrypt from 'bcrypt';
import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

async function create(req) {
  const { name, username, password } = req.body;

  const isUserExist = await prisma.user.count({
    where: {
      username,
    },
  });

  if (isUserExist > 0) {
    return ApiErrorHandling(400, 'username is already use');
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await prisma.user.create({
    data: {
      name,
      username,
      password: hashedPassword,
    },
    select: {
      name: true,
      username: true,
    },
  });

  if (!result) {
    return ApiErrorHandling(400, 'failed to register');
  }

  return result;
}

async function getById(req) {
  const { id } = req.params;

  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      username: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'user not found');
  }

  return result;
}

async function update(req) {
  const { id } = req.params;
  const { name, oldPassword, newPassword } = req.body;

  // Mengambil data pengguna berdasarkan ID
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      password: true,
    },
  });

  if (!user) {
    throw new ApiErrorHandling(404, 'user not found');
  }

  const storedPassword = user.password;

  // Update all data
  if (name && oldPassword && newPassword) {
    // Compare old password with hash which stored
    const passwordMatch = await bcrypt.compare(oldPassword, storedPassword);

    if (!passwordMatch) {
      throw new ApiErrorHandling(400, 'old password not match');
    }

    // Hash New Password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        password: hashedNewPassword,
      },
      select: {
        name: true,
        username: true,
      },
    });

    if (!result) {
      throw new ApiErrorHandling(400, 'failed update user');
    }

    return result;
  }

  // Update only password
  if (oldPassword && newPassword) {
    // Compare old password with hash which stored
    const passwordMatch = await bcrypt.compare(oldPassword, storedPassword);

    if (!passwordMatch) {
      throw new ApiErrorHandling(400, 'old password not match');
    }

    // Hash New Password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedNewPassword,
      },
      select: {
        name: true,
        username: true,
      },
    });

    if (!result) {
      throw new ApiErrorHandling(400, 'failed update user');
    }

    return result;
  }

  // Update only name
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
    },
    select: {
      name: true,
      username: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(400, 'failed update user');
  }

  return result;
}

async function destroy(req) {
  const { id } = req.params;

  const result = await prisma.user.delete({
    where: {
      id,
    },
    select: {
      name: true,
      username: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to delete user');
  }

  return result;
}

export default {
  create,
  getById,
  update,
  destroy,
};
