import setCookiesOnReq from "@/utils/setCookieOnReq";
import PostList from "../_components/PostList";
import { getPosts } from "@/services/postServices";
import queryString from "query-string";

type SearchParams = Record<string, string | string[] | undefined>;

interface BlogPageProps {
  searchParams: Promise<SearchParams>;
}

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  const resolvedSearchParams = await searchParams;
  const queries = queryString.stringify(resolvedSearchParams);
  const options = await setCookiesOnReq();
  const { posts } = await getPosts(queries, options);

  const { search } = resolvedSearchParams;

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
