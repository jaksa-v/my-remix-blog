import type { Post, User } from "@prisma/client";
import { prisma } from "~/db.server";

export function getPost({
  id,
  userId,
}: Pick<Post, "id"> & { userId: Post["id"] }) {
  return prisma.post.findFirst({
    select: { id: true, title: true, slug: true, content: true },
    where: { id, userId },
  });
}

export function getPosts() {
  return prisma.post.findMany({
    select: { id: true, title: true, slug: true, content: true },
    orderBy: { updatedAt: "desc" },
    take: 10,
  });
}

export function getPostsByUser({ userId }: { userId: User["id"] }) {
  return prisma.post.findMany({
    where: { userId },
    select: { id: true, title: true, slug: true, content: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createPost({ title, slug, content, userId }: Post) {
  return prisma.post.create({
    data: {
      title,
      slug,
      content,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function updatePost({ id, title, slug, content, userId }: Post) {
  return prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deletePost({
  id,
  userId,
}: Pick<Post, "id"> & { userId: Post["id"] }) {
  return prisma.post.deleteMany({
    where: { id, userId },
  });
}
