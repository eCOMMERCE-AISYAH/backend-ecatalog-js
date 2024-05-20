import slugify from 'slugify';
import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';
import productImageService from '../productImage/productImage.service.js';

async function create(req) {
  const {
    name,
    description,
    stock,
    subCategoryId,
    price,
  } = req.body;
  const slug = slugify(name, { lower: true });
  const isExist = await prisma.product.count({
    where: {
      name,
    },
  });

  if (isExist > 0) {
    throw new ApiErrorHandling(400, 'product is exist');
  }

  const result = await prisma.product.create({
    data: {
      name,
      slug,
      description,
      stock: Number(stock),
      subCategoryId,
      price: Number(price),
    },
    include: {
      subCategory: {
        include: {
          category: true,
        },
      },
    },
  });
  if (!result) {
    throw new ApiErrorHandling(400, 'cannot create product');
  }

  // create product image

  if (!Array.isArray(req.files)) {
    throw new ApiErrorHandling(400, 'Images must be an array');
  }
  await productImageService.create(req, result.id);

  return result;
}

async function getAllByQuery(req) {
  const {
    take, skip, name, subCategory, price,
  } = req.query;

  const result = await prisma.product.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    take: take !== undefined ? Number(take) : undefined,
    skip: skip !== undefined ? Number(skip) : undefined,
    where: {
      name: name !== undefined ? { contains: name } : undefined,
      price: price !== undefined ? Number(price) : undefined,
      subCategory: {
        name: subCategory !== undefined ? subCategory : undefined,
      },
    },
    include: {
      subCategory: {
        include: {
          category: true,
        },
      },
      images: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'product not found');
  }

  return result;
}

async function getDetail(req) {
  const { id } = req.params;

  const result = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      subCategory: {
        include: {
          category: true,
        },
      },
      images: true,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'product not found');
  }

  return result;
}

async function update(req) {
  const { id } = req.params;
  const {
    name,
    description,
    stock,
    subCategoryId,
    price,
  } = req.body;
  const slug = slugify(name, { lower: true });

  const result = await prisma.product.update({
    data: {
      name,
      slug,
      description,
      stock,
      subCategoryId,
      price,
    },
    where: {
      id,
    },
    include: {
      subCategory: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to update product');
  }

  return result;
}

async function destroy(req) {
  const { id } = req.params;

  const result = await prisma.product.delete({
    where: {
      id,
    },
    include: {
      subCategory: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!result) {
    throw new ApiErrorHandling(400, 'failed to delete product');
  }

  return result;
}

export default {
  create,
  getAllByQuery,
  getDetail,
  update,
  destroy,
};
