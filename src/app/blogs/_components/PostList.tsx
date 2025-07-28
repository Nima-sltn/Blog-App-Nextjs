import { Post } from "../type";
import CoverImage from "./CoverImage";
import Link from "next/link";
import { ClockIcon } from "@heroicons/react/24/outline";
import Author from "@/ui/Author/Author";
import PostInteraction from "./PostInteraction";
import { toPersianDigits } from "@/utils/numberFormatter";

const PostList = async () => {
  // await new Promise((res) => setTimeout(res, 3000));
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/list`);
  const {
    data: { posts },
  }: { data: { posts: Post[] } } = await res.json();

  return posts.length > 0 ? (
    <div className="grid grid-cols-12 gap-8">
      {posts.map((post) => (
        <div
          className="col-span-12 rounded-lg border border-secondary-300 p-2 sm:col-span-6 lg:col-span-4"
          key={post._id}
        >
          <CoverImage {...post} />
          {/* post content */}
          <div>
            <Link href={`/blogs/${post.slug}`}>
              <h2 className="mb-4 font-bold text-secondary-700">
                {post.title}
              </h2>
            </Link>

            {/* post description */}

            <div className="mb-4 flex items-center justify-between">
              <Author
                name={post.author.name}
                avatarUrl={post.author.avatarUrl}
              />
              <div className="flex items-center text-[10px] text-secondary-500">
                <ClockIcon className="ml-1 size-4 stroke-secondary-500" />
                <span className="ml-1">خواندن:</span>
                <span className="ml-1 leading-3">
                  {toPersianDigits(post.readingTime)}
                </span>
                <span>دقیقه</span>
              </div>
            </div>
            <PostInteraction post={post} />
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export default PostList;
