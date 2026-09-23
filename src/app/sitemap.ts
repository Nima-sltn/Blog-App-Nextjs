import { MetadataRoute } from "next";
import { getPosts } from "@/services/postServices";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/blogs`, changeFrequency: "hourly", priority: 0.9 },
    { url: `${SITE_URL}/signin`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/signup`, changeFrequency: "monthly", priority: 0.3 },
  ];

  try {
    const { posts } = await getPosts();
    const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${SITE_URL}/blogs/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
    return [...staticRoutes, ...postRoutes];
  } catch {
    // Backend unavailable at build time — still ship the static routes.
    return staticRoutes;
  }
}
