import { getPostBySlug } from "@/services/postServices";
import Image from "next/image";
import { notFound } from "next/navigation";

type Params = {
  postSlug: string;
};

export const generateMetadata = async ({ params }: { params: Params }) => {
  const post = await getPostBySlug(params.postSlug);
  return {
    title: `${post.title}`,
  };
};

const singlePost = async ({ params }: { params: Params }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/slug/${params.postSlug}`,
  );
  const { data } = await res.json();
  const { post } = data || {};

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-screen-md text-secondary-600">
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
      {/* {post.related.length > 0 ? <RelatedPost posts={post.related} /> : null}
      <BlogComments post={post} /> */}
    </div>
  );
};

export default singlePost;
