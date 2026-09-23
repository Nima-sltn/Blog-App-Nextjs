import { getPosts } from "@/services/postServices";
import setCookiesOnReq from "@/utils/setCookieOnReq";
import queryString from "query-string";
import PostList from "../../../_components/PostList";

type SearchParams = Record<string, string | string[] | undefined>;

interface CategoryPageProps {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<SearchParams>;
}

const Category = async ({ params, searchParams }: CategoryPageProps) => {
  const { categorySlug } = await params;
  const resolvedSearchParams = await searchParams;

  const queries = `${queryString.stringify(resolvedSearchParams)}&categorySlug=${categorySlug}`;
  const options = await setCookiesOnReq();
  const { posts } = await getPosts(queries, options);

  return (
    <>
      {posts.length === 0 ? (
        <p className="text-lg text-secondary-600">
          پستی در این دسته بندی پیدا نشد
        </p>
      ) : (
        <PostList posts={posts} />
      )}
    </>
  );
};

export default Category;
