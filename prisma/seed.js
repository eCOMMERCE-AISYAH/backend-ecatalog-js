import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Menghapus data yang ada
  await prisma.orderHistory.deleteMany();
  await prisma.cartProduct.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subCategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

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
      // 10 Produk untuk kategori Electronics > Smartphones
      ...Array.from({ length: 10 }).map((_, i) => ({
        id: `product-electronics-uuid-${i + 1}`,
        name: `Product ${i + 1} Electronics`,
        slug: `product-${i + 1}-electronics`,
        description: `Description for Product ${i + 1} in Electronics.`,
        stock: Math.floor(Math.random() * 100),
        price: Math.floor(Math.random() * 1000),
        subCategoryId: 'subcategory-uuid-1',
        categoryId: 'category-uuid-1',
      })),
      // 10 Produk untuk kategori Fashion > Clothing
      ...Array.from({ length: 10 }).map((_, i) => ({
        id: `product-fashion-uuid-${i + 1}`,
        name: `Product ${i + 1} Fashion`,
        slug: `product-${i + 1}-fashion`,
        description: `Description for Product ${i + 1} in Fashion.`,
        stock: Math.floor(Math.random() * 100),
        price: Math.floor(Math.random() * 100),
        subCategoryId: 'subcategory-uuid-2',
        categoryId: 'category-uuid-2',
      })),
    ],
  });

  // Seed Product Images
  const productImages = await prisma.productImage.createMany({
    data: [
      // 10 Gambar untuk kategori Electronics
      ...Array.from({ length: 10 }).map((_, i) => ({
        id: `image-electronics-uuid-${i + 1}`,
        image: 'public/images/seedImage.webp',
        productId: `product-electronics-uuid-${i + 1}`,
      })),
      // 10 Gambar untuk kategori Fashion
      ...Array.from({ length: 10 }).map((_, i) => ({
        id: `image-fashion-uuid-${i + 1}`,
        image: 'public/images/seedImage.webp',
        productId: `product-fashion-uuid-${i + 1}`,
      })),
    ],
  });

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
