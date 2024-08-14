import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.orderHistory.deleteMany();
  await prisma.cartProduct.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subCategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  // Seed Users
  // const users = await prisma.user.createMany({
  //   data: [
  //     {
  //       id: 'user-uuid-1',
  //       name: 'John Doe',
  //       username: 'johndoe',
  //       password: 'hashedpassword1',
  //       address: '123 Main St',
  //       phoneNumber: '123-456-7890',
  //       role: 'USER',
  //       token: 'randomtoken1',
  //     },
  //     {
  //       id: 'user-uuid-2',
  //       name: 'Jane Smith',
  //       username: 'janesmith',
  //       password: 'hashedpassword2',
  //       address: '456 Oak Ave',
  //       phoneNumber: '987-654-3210',
  //       role: 'ADMIN',
  //       token: 'randomtoken2',
  //     },
  //   ],
  // });

  // Seed Categories
  const categories = await prisma.category.createMany({
    data: [
      {
        id: 'category-uuid-1',
        name: 'Electronics',
        slug: 'electronics',
      },
      {
        id: 'category-uuid-2',
        name: 'Fashion',
        slug: 'fashion',
      },
    ],
  });

  // Seed SubCategories
  const subCategories = await prisma.subCategory.createMany({
    data: [
      {
        id: 'subcategory-uuid-1',
        name: 'Smartphones',
        slug: 'smartphones',
        categoryId: 'category-uuid-1',
      },
      {
        id: 'subcategory-uuid-2',
        name: 'Clothing',
        slug: 'clothing',
        categoryId: 'category-uuid-2',
      },
    ],
  });

  // Seed Products
  const products = await prisma.product.createMany({
    data: [
      {
        id: 'product-uuid-1',
        name: 'iPhone 14',
        slug: 'iphone-14',
        description: 'Latest iPhone with A15 chip.',
        stock: 50,
        price: 999,
        subCategoryId: 'subcategory-uuid-1',
        categoryId: 'category-uuid-1',
      },
      {
        id: 'product-uuid-2',
        name: 'T-shirt',
        slug: 't-shirt',
        description: 'Comfortable cotton t-shirt.',
        stock: 200,
        price: 19,
        subCategoryId: 'subcategory-uuid-2',
        categoryId: 'category-uuid-2',
      },
    ],
  });

  // Seed Product Images
  const productImages = await prisma.productImage.createMany({
    data: [
      {
        id: 'image-uuid-1',
        image: 'public/images/seedImage.webp',
        productId: 'product-uuid-1',
      },
    ],
  });

  // Seed Orders
  // const orders = await prisma.order.createMany({
  //   data: [
  //     {
  //       id: 'order-uuid-1',
  //       invoice: 'INV-001',
  //       name: 'John Doe',
  //       phoneNumber: '123-456-7890',
  //       address: '123 Main St',
  //       totalPrice: 999,
  //       userId: 'user-uuid-1',
  //       status: 'PROSES',
  //     },
  //     {
  //       id: 'order-uuid-2',
  //       invoice: 'INV-002',
  //       name: 'Jane Smith',
  //       phoneNumber: '987-654-3210',
  //       address: '456 Oak Ave',
  //       totalPrice: 19,
  //       userId: 'user-uuid-2',
  //       status: 'SUKSES',
  //     },
  //   ],
  // });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
