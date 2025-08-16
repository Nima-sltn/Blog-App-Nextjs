import http from "./httpService";

export const createCommentApi = async (data: any, options?: any) => {
  return http.post(`/comment/add`, data, options).then(({ data }) => data);
};
