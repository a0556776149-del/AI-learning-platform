import { prisma } from "../lib/prisma.js";

async function main() {
  const science = await prisma.category.upsert({
    where: { name: "Science" },
    update: {},
    create: { name: "Science" },
  });

  const history = await prisma.category.upsert({
    where: { name: "History" },
    update: {},
    create: { name: "History" },
  });

  const technology = await prisma.category.upsert({
    where: { name: "Technology" },
    update: {},
    create: { name: "Technology" },
  });

  await prisma.subCategory.createMany({
    data: [
      { name: "Space", categoryId: science.id },
      { name: "Biology", categoryId: science.id },
      { name: "Physics", categoryId: science.id },
      { name: "World War II", categoryId: history.id },
      { name: "Ancient Egypt", categoryId: history.id },
      { name: "The Renaissance", categoryId: history.id },
      { name: "Artificial Intelligence", categoryId: technology.id },
      { name: "Web Development", categoryId: technology.id },
      { name: "Cybersecurity", categoryId: technology.id },
    ],
    skipDuplicates: true,
  });

  await prisma.user.upsert({
    where: { phone: "0501234567" },
    update: {},
    create: { name: "Israel Israeli", phone: "0501234567" },
  });

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
