import http from "./httpService";

export const signupApi = async (data: any) => {
  return http.post("/user/signup", data).then(({ data }: any) => data.data);
};

export const signinApi = async (data: any) => {
  return http.post("/user/signin", data).then(({ data }: any) => data.data);
};
