import sharp from 'sharp';
import * as fs from 'fs';
import prisma from '../../prisma/prismaClient.js';

async function create(req) {
  const { path, filename } = req.file;
  const { productId } = req.body;

  const compressedImageBuffer = await sharp(path)
    .resize({
      fit: sharp.fit.inside, withoutEnlargement: true,
    })
    .toBuffer();

  // Menyimpan gambar yang telah diompres
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

export default {
  create,
  getByQuery,
};
