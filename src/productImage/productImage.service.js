import sharp from 'sharp';
import * as fs from 'fs/promises';
import fsCreate from 'fs';
import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';

async function create(req, productId) {
  try {
    const { files } = req; // Menggunakan "files" karena menerima lebih dari satu file
    if (files.length === 0) throw new ApiErrorHandling(400, 'gambar wajib diisi');

    const promises = files.map(async (file) => {
      const { path, filename } = file;

      const compressedImageBuffer = await sharp(path)
        .resize({
          fit: sharp.fit.inside, withoutEnlargement: true,
        })
        .toBuffer();

      const compressedImagePath = `public/images/${filename}`;
      fsCreate.writeFileSync(compressedImagePath, compressedImageBuffer);

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
    });

    return Promise.all(promises);
  } catch (e) {
    throw new ApiErrorHandling(500, e.message);
  }
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

async function destroy(productId) {
  try {
    const images = await prisma.productImage.findMany({
      where: {
        productId,
      },
    });

    if (images.length === 0) {
      throw new ApiErrorHandling(404, 'Gambar tidak ditemukan untuk produk tersebut');
    }

    // Menghapus file gambar secara asinkron
    const deleteFilesPromises = images.map(async (image) => {
      const pathImage = image.image;
      await fs.unlink(pathImage);
    });

    // Menunggu semua operasi penghapusan file selesai
    await Promise.all(deleteFilesPromises);

    // Menghapus entri database untuk semua gambar dengan productId tersebut
    const result = await prisma.productImage.deleteMany({
      where: {
        productId,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new ApiErrorHandling(500, 'Terjadi kesalahan saat menghapus gambar');
  }
}

export default {
  create,
  getByQuery,
  getById,
  destroy,
};
