import "server-only";
import { prisma } from "@/lib/prisma";

export async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  let slug = base;
  let i = 2;
  for (let attempts = 0; attempts < 50; attempts++) {
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    slug = `${base}-${i++}`;
  }
  return `${base}-${Date.now()}`;
}
