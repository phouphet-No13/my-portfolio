"use server";

import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getProjectById(id: number) {
  return await prisma.project.findUnique({
    where: { id },
  });
}

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string;
  const coverImageRaw = formData.get("coverImage") as string | null;
  const coverImage = coverImageRaw && coverImageRaw.trim() !== "" ? coverImageRaw : null;
  const description = formData.get("description") as string;
  const linkRaw = formData.get("link") as string | null;
  const link = linkRaw && linkRaw.trim() !== "" ? linkRaw : null;
  const tagsString = formData.get("tags") as string;
  
  const tags = tagsString.split(",").map(tag => tag.trim());

  await prisma.project.create({
    data: {
      title,
      category,
      image,
      coverImage,
      description,
      link,
      tags,
    }
  });

  revalidatePath("/projects");
}

export async function updateProject(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as string;
  const coverImageRaw = formData.get("coverImage") as string | null;
  const coverImage = coverImageRaw && coverImageRaw.trim() !== "" ? coverImageRaw : null;
  const description = formData.get("description") as string;
  const linkRaw = formData.get("link") as string | null;
  const link = linkRaw && linkRaw.trim() !== "" ? linkRaw : null;
  const tagsString = formData.get("tags") as string;
  
  const tags = tagsString.split(",").map(tag => tag.trim());

  await prisma.project.update({
    where: { id },
    data: {
      title,
      category,
      image,
      coverImage,
      description,
      link,
      tags,
    }
  });

  revalidatePath("/projects");
}

export async function deleteProject(id: number) {
  await prisma.project.delete({
    where: { id },
  });

  revalidatePath("/projects");
}
