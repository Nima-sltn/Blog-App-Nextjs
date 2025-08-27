import { getAllPostsApi } from "@/services/postServices";
import Empty from "@/ui/Empty/Empty";
import Table from "@/ui/Table/Table";
import PostRow from "./PostRow";
import { Post } from "@/types/common";

async function PostsTable({ query = "" }) {
  const { posts }: { posts: Post[] } = await getAllPostsApi(query);
  console.log(posts.length);

  if (!posts.length) return <Empty resourceName="پستی" />;

  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>عنوان</th>
        <th>دسته بندی</th>
        <th>نویسنده</th>
        <th>تاریخ ایجاد</th>
        <th>نوع</th>
        <th>عملیات</th>
      </Table.Header>
      <Table.Body>
        {posts.map((post, index) => (
          <PostRow key={post._id} post={post} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}
export default PostsTable;
