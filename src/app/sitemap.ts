import { MetadataRoute } from "next";
import { Blog } from "@/types/Blog";
import { getAllBlogs } from "@/lib/blog";
import { siteMetadata } from "@/data/siteMetadata";

const allBlogs = getAllBlogs();

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl;

  const undraftedBlogs = allBlogs.filter((blog: Blog) => !blog.draft);
  const blogRoutes = undraftedBlogs.map((post: Blog) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ["", "blog", "projects"].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogRoutes];
}
