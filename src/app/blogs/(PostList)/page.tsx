import setCookiesOnReq from "@/utils/setCookieOnReq";
import PostList from "../_components/PostList";
import { getPosts } from "@/services/postServices";

const BlogPage = async () => {
  const options = await setCookiesOnReq();
  const posts = await getPosts(options);

  return (
    <>
      {/* <Suspense fallback={<Spinner />}> */}
      <PostList posts={posts} />
      {/* </Suspense> */}
    </>
  );
};

export default BlogPage;
