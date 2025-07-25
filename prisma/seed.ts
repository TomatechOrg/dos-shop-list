import { PrismaClient, Prisma } from "@/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.ListItemCreateInput[] = [
  {
    name: "Apples",
    count: 2
  },
  {
    name: "Bread",
    count: 3
  },
  {
    name: "Milk",
    count: 1
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.listItem.create({ data: u });
  }
}

main();