import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Blog = {
  draft?: boolean;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "src/content");

function calculateReadingTime(content: string) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return {
    text: `${minutes} min read`,
    minutes,
    time: minutes * 60 * 1000,
    words,
  };
}

export function getAllBlogs(): Blog[] {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"));

  const blogs = files.map((file) => {
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const slug = file.replace(".mdx", "");

    return {
      slug,
      title: data.title || "",
      summary: data.summary || "",
      publishedAt: data.publishedAt || "",
      readingTime: calculateReadingTime(content),
      content,
    };
  });

  return blogs.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getBlogBySlug(slug: string): Blog | undefined {
  const blogs = getAllBlogs();
  return blogs.find((blog) => blog.slug === slug);
}
