import "dotenv/config";
import prisma from "./src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const email = "studio@admin.com";
  const password = "StudioPassword123!";

  console.log("Seeding admin user...");

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("Admin user already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: "Admin",
    },
  });

  console.log(`Admin user created with email: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
