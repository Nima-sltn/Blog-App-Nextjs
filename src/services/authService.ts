import http from "./httpService";

export const signupApi = async (data: any) => {
  return http.post("/user/signup", data).then(({ data }: any) => data.data);
};

