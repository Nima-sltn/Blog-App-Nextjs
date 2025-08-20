import PostsTable from "../../posts/_/components/PostsTable";

async function LatestPosts() {
  const query = "sort=latest&limit=5";
  return <PostsTable query={query} />;
}
export default LatestPosts;
