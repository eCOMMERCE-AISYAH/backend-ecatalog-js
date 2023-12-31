import sharp from 'sharp';
import * as fs from 'fs';
import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

async function create(req) {
  const { path, filename } = req.file;
  const { productId } = req.body;

  const compressedImageBuffer = await sharp(path)
    .resize({
      fit: sharp.fit.inside, withoutEnlargement: true,
    })
    .toBuffer();

  const compressedImagePath = `public/images/${filename}`;
  fs.writeFileSync(compressedImagePath, compressedImageBuffer);

  const result = await prisma.productImage.create({
    data: {
      image: compressedImagePath,
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

async function getById(req) {
  const { id } = req.params;

  const result = await prisma.productImage.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiErrorHandling(404, 'picture not found');
  }

  return result;
}

async function destroy(req) {
  const { id } = req.params;

  const image = await getById(req);
  if (!image) {
    throw new ApiErrorHandling(404, 'image not found for delete');
  }

  const pathImage = image.image;
  fs.unlinkSync(pathImage);

  const result = await prisma.productImage.delete({
    where: {
      id,
    },
  });

  return result;
}

export default {
  create,
  getByQuery,
  getById,
  destroy,
};
