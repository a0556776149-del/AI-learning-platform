import { prisma } from "../lib/prisma.js";

async function main() {
  await prisma.prompt.deleteMany();
  await prisma.subCategory.deleteMany();
  await prisma.category.deleteMany();

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

  const programming = await prisma.category.upsert({
    where: { name: "Programming Languages" },
    update: {},
    create: { name: "Programming Languages" },
  });

  const languages = await prisma.category.upsert({
    where: { name: "Languages" },
    update: {},
    create: { name: "Languages" },
  });

  const mathematics = await prisma.category.upsert({
    where: { name: "Mathematics" },
    update: {},
    create: { name: "Mathematics" },
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
      { name: "Python", categoryId: programming.id },
      { name: "JavaScript", categoryId: programming.id },
      { name: "Java", categoryId: programming.id },
      { name: "C++", categoryId: programming.id },
      { name: "TypeScript", categoryId: programming.id },
      { name: "Go", categoryId: programming.id },
      { name: "Rust", categoryId: programming.id },
      { name: "SQL", categoryId: programming.id },
      { name: "English", categoryId: languages.id },
      { name: "Spanish", categoryId: languages.id },
      { name: "French", categoryId: languages.id },
      { name: "Hebrew", categoryId: languages.id },
      { name: "Arabic", categoryId: languages.id },
      { name: "German", categoryId: languages.id },
      { name: "Italian", categoryId: languages.id },
      { name: "Japanese", categoryId: languages.id },
      { name: "Algebra", categoryId: mathematics.id },
      { name: "Geometry", categoryId: mathematics.id },
      { name: "Statistics", categoryId: mathematics.id },
      { name: "Calculus", categoryId: mathematics.id },
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
