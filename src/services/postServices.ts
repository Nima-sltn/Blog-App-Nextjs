import http from "./httpService";

export const getPostBySlug = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/slug/${slug}`,
  );
  const { data } = await res.json();
  const { post } = data || {};
  return post;
};

export async function getAllPostsApi(queries: string, options = {}) {
  return http
    .get(`/post/list?${queries}`, options)
    .then(({ data }) => data.data);
}

export const getPosts = async (queries?: string, options?: RequestInit) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/list?${queries}`,
    {
      ...options,
    },
  );
  const { data } = await res.json();
  const { posts, totalPages } = data || {};
  return { posts, totalPages };
};

export async function deletePostApi(id: string, options?: any) {
  return http
    .delete(`/post/remove/${id}`, options)
    .then(({ data }) => data.data);
}

export const likePostApi = async (postId: any) => {
  return http.post(`/post/like/${postId}`).then(({ data }) => data.data);
};

export const bookmarkPostApi = async (postId: any) => {
  return http.post(`/post/bookmark/${postId}`).then(({ data }) => data.data);
};
