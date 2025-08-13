import PostList from "@/app/blogs/_components/PostList";

const Category = async ({ params }: { params: any }) => {
  const { categorySlug } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/list?categorySlug=${categorySlug}`,
  );
  const { data } = await res.json();
  const { posts } = data || {};

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
