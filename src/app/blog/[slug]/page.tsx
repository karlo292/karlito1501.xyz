export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { getAllBlogs, getBlogBySlug } from "@/lib/blog";
import Balancer from "react-wrap-balancer";
import { siteMetadata } from "@/data/siteMetadata";
import NotFound from "@/app/not-found";
import { formatDate } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Suspense } from "react";

const allBlogs = getAllBlogs();

const mdxComponents = {
  Image: (props: React.ComponentProps<typeof Image>) => (
    <Image {...props} className="rounded-lg" />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href || "";
    if (href.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {props.children}
        </Link>
      );
    }
    if (href.startsWith("#")) {
      return <a {...props} />;
    }
    return <a target="_blank" rel="noopener noreferrer" {...props} />;
  },
  Callout: (props: { emoji?: string; children: React.ReactNode }) => (
    <div className="mb-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
      {props.emoji && (
        <div className="mr-4 flex w-4 items-center">{props.emoji}</div>
      )}
      <div className="callout w-full">{props.children}</div>
    </div>
  ),
};


export const generateStaticParams = async () =>
  allBlogs.map((blog) => ({ slug: blog.slug }));

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const blog = getBlogBySlug(params.slug);
  if (!blog) {
    return;
  }

  const ogImage = `${siteMetadata.siteUrl}/og?title=${blog.title}`;

  return {
    title: blog.title,
    description: blog.summary,
    openGraph: {
      title: blog.title,
      description: blog.summary,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: blog.publishedAt,
      url: `${siteMetadata.siteUrl}/blog/${blog.slug}`,
      authors: siteMetadata.author,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.summary,
      images: [ogImage],
    },
  };
}

export default async function Blog(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    return <Suspense><NotFound /></Suspense>;
  }

  return (
    <article className="space-y-8">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/blog">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to blog
        </Link>
      </Button>

      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          <Balancer>{blog.title}</Balancer>
        </h1>
        <p className="text-lg text-muted-foreground">{blog.summary}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={blog.publishedAt}>
              {formatDate(blog.publishedAt)}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{blog.readingTime.text}</span>
          </div>
        </div>
      </header>

      <Separator />

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={blog.content} components={mdxComponents} />
      </div>
    </article>
  );
}
