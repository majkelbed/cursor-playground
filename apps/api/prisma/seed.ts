import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';

// Dummy data generator
const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  // Simple password hashing (in a real app, use bcrypt)
  return createHash('sha256').update(password).digest('hex');
}

async function main() {
  console.log('Start seeding database...');

  // Create users
  const users = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: await hashPassword('password123'),
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      password: await hashPassword('password123'),
    },
    {
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob@example.com',
      password: await hashPassword('password123'),
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
  console.log('Created users');

  // Create items (products)
  const items = [
    {
      title: 'Smartphone',
      description: 'Latest model with high-resolution camera and fast processor',
      price: 699.99,
      img: 'https://placehold.co/600x400?text=Smartphone',
    },
    {
      title: 'Laptop',
      description: 'Powerful laptop with dedicated graphics card and large storage',
      price: 1299.99,
      img: 'https://placehold.co/600x400?text=Laptop',
    },
    {
      title: 'Headphones',
      description: 'Noise-cancelling wireless headphones with long battery life',
      price: 199.99,
      img: 'https://placehold.co/600x400?text=Headphones',
    },
    {
      title: 'Smartwatch',
      description: 'Fitness tracking, notifications, and long battery life',
      price: 249.99,
      img: 'https://placehold.co/600x400?text=Smartwatch',
    },
    {
      title: 'Tablet',
      description: 'High-resolution display perfect for media consumption',
      price: 449.99,
      img: 'https://placehold.co/600x400?text=Tablet',
    },
    {
      title: 'Camera',
      description: 'Professional-grade camera with interchangeable lenses',
      price: 899.99,
      img: 'https://placehold.co/600x400?text=Camera',
    },
  ];

  for (const item of items) {
    await prisma.item.create({
      data: item,
    });
  }
  console.log('Created items');

  // Fetch created users and items to use their IDs
  const createdUsers = await prisma.user.findMany();
  const createdItems = await prisma.item.findMany();

  // Create orders with order items
  // Order for John Doe
  await prisma.order.create({
    data: {
      userId: createdUsers[0].id,
      total: 949.98,
      status: 'DELIVERED',
      items: {
        create: [
          {
            itemId: createdItems[2].id, // Headphones
            quantity: 1,
            price: createdItems[2].price,
          },
          {
            itemId: createdItems[3].id, // Smartwatch
            quantity: 3,
            price: createdItems[3].price,
          },
        ],
      },
    },
  });

  // Order for Jane Smith (in progress)
  await prisma.order.create({
    data: {
      userId: createdUsers[1].id,
      total: 1299.99,
      status: 'IN_PROGRESS',
      items: {
        create: [
          {
            itemId: createdItems[1].id, // Laptop
            quantity: 1,
            price: createdItems[1].price,
          },
        ],
      },
    },
  });

  // Another order for John Doe (new)
  await prisma.order.create({
    data: {
      userId: createdUsers[0].id,
      total: 699.99,
      status: 'NEW',
      items: {
        create: [
          {
            itemId: createdItems[0].id, // Smartphone
            quantity: 1,
            price: createdItems[0].price,
          },
        ],
      },
    },
  });

  console.log('Created orders with items');
  console.log('Seeding finished');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 