// eslint-disable-next-line import/extensions
import prisma from '../../prisma/prismaClient.js';
import ApiErrorHandling from '../../helper/apiErrorHandling.js';
import productUtil from '../product/product.util.js';

async function create(req) {
  const { orderId, userId } = req;

  const getCartProduct = await prisma.cartProduct.findMany({
    where: {
      userId,
    },
    include: {
      product: {
        include: {
          images: true,
          subCategory: true,
        },
      },
    },
  });

  if (!getCartProduct || getCartProduct.length < 1) throw new ApiErrorHandling(500, 'cart tidak boleh kosong');

  const createPromises = getCartProduct.map(async (item) => {
    const {
      name, subCategory, images, price, id,
    } = item.product;
    console.log(id);
    const data = {
      productId: id,
      productName: name,
      subCategory: subCategory.name,
      productImage: images[0].image,
      quantity: item.quantity,
      orderId,
      price,
      totalPrice: (price * item.quantity),
    };

    const addTotalSold = await productUtil.addTotalSold(id, item.quantity);
    if (!addTotalSold) throw new ApiErrorHandling(500, 'gagal menambahkan total sold');

    return data;
  });
  const data = await Promise.all(createPromises);

  const createOrderHistory = await prisma.orderHistory.createMany({
    data,
  });

  if (!createOrderHistory) throw new ApiErrorHandling(500, 'gagal create order history');

  await prisma.cartProduct.deleteMany({
    where: {
      userId,
    },
  });
}

async function destroyMany(id) {
  const result = await prisma.orderHistory.deleteMany({
    where: {
      orderId: id,
    },
  });

  if (!result) {
    return false;
  }

  return true;
}

async function reduceStockByOrderHistory(id) {
  try {
    // Mengambil data dari orderHistory berdasarkan id
    const getProduct = await prisma.orderHistory.findMany({
      where: {
        orderId: id,
      },
    });

    if (getProduct.length === 0) {
      console.log('No products found');
      return false;
    }

    // Mengurangi stok produk berdasarkan orderHistories
    const createPromise = getProduct.map(async (item) => {
      const {
        productId,
        quantity,
      } = item;

      try {
        // Update stok produk
        await prisma.product.update({
          where: {
            id: productId,
          },
          data: {
            stock: {
              decrement: quantity,
            },
            totalSold: {
              increment: quantity,
            },
          },
        });
      } catch (error) {
        // Log error jika update gagal
        console.error(`Error updating product ${productId}:`, error);
      }
    });

    // Tunggu hingga semua update selesai
    await Promise.all(createPromise);

    return true;
  } catch (error) {
    console.error('Error processing order history:', error);
    return false;
  }
}

export default {
  create,
  destroyMany,
  reduceStockByOrderHistory,
};
