import http from "./httpService";

export const getPostBySlug = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/slug/${slug}`,
  );
  const { data } = await res.json();
  const { post } = data || {};
  return post;
};

export const getPosts = async (options: RequestInit) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/list`, {
    ...options,
  });
  const { data } = await res.json();
  return data?.posts;
};

export const likePostApi = async (postId: any) => {
  return http.post(`/post/like/${postId}`).then(({ data }) => data.data);
};

export const bookmarkPostApi = async (postId: any) => {
  return http.post(`/post/bookmark/${postId}`).then(({ data }) => data.data);
};
