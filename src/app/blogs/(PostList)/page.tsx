import setCookiesOnReq from "@/utils/setCookieOnReq";
import PostList from "../_components/PostList";
import { getPosts } from "@/services/postServices";
import queryString from "query-string";

type SearchParams = Record<string, string | string[] | undefined>;

const BlogPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const queries = queryString.stringify(searchParams);
  const options = await setCookiesOnReq();
  const posts = await getPosts(queries, options);

  const { search } = searchParams;

  return (
    <>
      {search ? (
        <p className="mb-4 text-secondary-700">
          {posts.length === 0
            ? "هیچ پستی با این مشخصات پیدا نشد"
            : `نشان دادن ${posts.length} نتیجه برای`}
          <span className="font-bold">&quot;{search}&quot;</span>
        </p>
      ) : null}
      <PostList posts={posts} />
    </>
  );
};

export default BlogPage;
