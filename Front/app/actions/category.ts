"use server";

import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { createdAt: "asc" },
  });
}

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  
  if (!name || name.trim() === "") return;

  try {
    await prisma.category.create({
      data: {
        name: name.trim(),
      }
    });
    revalidatePath("/categories");
    revalidatePath("/projects");
    revalidatePath("/projects/new");
  } catch (error) {
    console.error("Error creating category:", error);
    // Ignore unique constraint errors silently for this simple UI
  }
}

export async function deleteCategory(id: number) {
  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath("/categories");
    revalidatePath("/projects");
    revalidatePath("/projects/new");
  } catch (error) {
    console.error("Error deleting category:", error);
  }
}
