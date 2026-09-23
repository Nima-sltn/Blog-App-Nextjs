import { getPostBySlug } from "@/services/postServices";
import Image from "next/image";
import { notFound } from "next/navigation";
import RelatedPost from "@/components/RelatedPost/RelatedPost";
import BlogComments from "../_components/comment/BlogComments";
import ReadingProgress from "@/components/ReadingProgress/ReadingProgress";
import { Metadata } from "next";

/**
 * Posts are rendered on demand and cached for 5 minutes (ISR) instead of
 * being baked at build time: the build no longer needs a live API, and posts
 * published after a build are served immediately instead of 404-ing.
 */
export const revalidate = 300;

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params,
}: PostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "پستی یافت نشد" };

  return {
    title: post.title,
    description: post.briefText,
    openGraph: {
      title: post.title,
      description: post.briefText,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [{ url: post.coverImageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.briefText,
      images: [post.coverImageUrl],
    },
  };
};

const singlePost = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.briefText,
    image: post.coverImageUrl,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "بلاگ اپ",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${post.slug}`,
    },
  };

  return (
    <div className="mx-auto max-w-screen-md text-secondary-600">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="mb-8 text-2xl font-bold text-secondary-700">
        {post.title}
      </h1>
      <p className="mb-4">{post.briefText}</p>
      <p className="mb-8">{post.text}</p>
      <div className="relative mb-10 aspect-video overflow-hidden rounded-lg">
        <Image
          className="object-cover object-center transition-all duration-300 ease-out hover:scale-110"
          fill
          alt={post.title}
          src={post.coverImageUrl}
        />
      </div>
      {post.related.length > 0 ? <RelatedPost posts={post.related} /> : null}
      <BlogComments post={post} />
    </div>
  );
};

export default singlePost;
