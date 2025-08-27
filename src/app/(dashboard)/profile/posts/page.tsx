import { Suspense } from "react";
import PostsTable from "./_/components/PostsTable";
import queryString from "query-string";
import Search from "@/ui/Search/Search";
import { CreatePost } from "./_/components/Buttons";
import Spinner from "@/ui/Spinner/Spinner";
import Pagination from "@/components/Pagination/Pagination";
import { getAllPostsApi } from "@/services/postServices";

const PostPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const query = queryString.stringify(searchParams);

  const { totalPages } = await getAllPostsApi(query);

  return (
    <div>
      <div className="mb-12 grid grid-cols-1 items-center gap-8 text-secondary-700 lg:grid-cols-3">
        <h1 className="text-xl font-bold text-secondary-700">لیست پست ها</h1>
        <Search />
        <CreatePost />
      </div>

      <Suspense fallback={<Spinner />} key={query}>
        <PostsTable query={query} />
      </Suspense>
      {!totalPages ? (
        ""
      ) : (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default PostPage;
