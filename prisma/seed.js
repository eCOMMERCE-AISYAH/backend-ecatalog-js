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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
