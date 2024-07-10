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
  // Create Categories
  const electronicsCategory = await prisma.category.create({
    data: {
      name: 'Electronics',
      slug: 'electronics',
    },
  });

  const clothingCategory = await prisma.category.create({
    data: {
      name: 'Clothing',
      slug: 'clothing',
    },
  });

  // Create SubCategories
  const mobileSubCategory = await prisma.subCategory.create({
    data: {
      name: 'Mobile Phones',
      slug: 'mobile-phones',
      category: {
        connect: { id: electronicsCategory.id },
      },
    },
  });

  const laptopSubCategory = await prisma.subCategory.create({
    data: {
      name: 'Laptops',
      slug: 'laptops',
      category: {
        connect: { id: electronicsCategory.id },
      },
    },
  });

  // Create Users
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      username: 'admin',
      password: 'adminpassword',
      role: 'ADMIN',
    },
  });

  const guestUser = await prisma.user.create({
    data: {
      name: 'Guest User',
      username: 'guest',
      password: 'guestpassword',
      role: 'GUEST',
    },
  });

  // Create Products
  const iphoneProduct = await prisma.product.create({
    data: {
      name: 'iPhone 13',
      slug: 'iphone-13',
      description: 'Latest iPhone model',
      stock: 100,
      price: 999,
      subCategory: {
        connect: { id: mobileSubCategory.id },
      },
      Category: {
        connect: { id: electronicsCategory.id },
      },
      images: {
        create: [{ image: 'iphone13.jpg' }],
      },
    },
  });

  const macbookProduct = await prisma.product.create({
    data: {
      name: 'MacBook Pro',
      slug: 'macbook-pro',
      description: 'Powerful laptop from Apple',
      stock: 50,
      price: 1999,
      subCategory: {
        connect: { id: laptopSubCategory.id },
      },
      Category: {
        connect: { id: electronicsCategory.id },
      },
      images: {
        create: [{ image: 'macbookpro.jpg' }],
      },
    },
  });

  // Create CartProducts
  const cartProduct1 = await prisma.cartProduct.create({
    data: {
      quantity: 1,
      user: {
        connect: { id: guestUser.id },
      },
      product: {
        connect: { id: iphoneProduct.id },
      },
    },
  });

  const cartProduct2 = await prisma.cartProduct.create({
    data: {
      quantity: 1,
      user: {
        connect: { id: guestUser.id },
      },
      product: {
        connect: { id: macbookProduct.id },
      },
    },
  });

  // Create Orders
  const order1 = await prisma.order.create({
    data: {
      invoice: 'INV001',
      name: 'Guest User',
      phoneNumber: '1234567890',
      address: 'Guest Address',
      totalPrice: 999,
      user: {
        connect: { id: guestUser.id },
      },
      orderHistory: {
        create: [{
          productName: 'iPhone 13',
          subCategory: 'Mobile Phones',
          quantity: 1,
          price: 999,
          totalPrice: 999,
          productImage: 'iphone13.jpg',
        }],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
