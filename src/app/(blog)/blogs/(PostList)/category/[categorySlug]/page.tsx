import { getPosts } from "@/services/postServices";
import setCookiesOnReq from "@/utils/setCookieOnReq";
import queryString from "query-string";
import PostList from "../../../_components/PostList";

type SearchParams = Record<string, string | string[] | undefined>;
interface CategoryPageProps {
  params: {
    categorySlug: string;
  };
  searchParams: SearchParams;
}
const Category = async ({ params, searchParams }: CategoryPageProps) => {
  const { categorySlug } = params;

  const queries = `${queryString.stringify(searchParams)}&categorySlug=${categorySlug}`;
  const options = await setCookiesOnReq();
  const posts = await getPosts(queries, options);

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
