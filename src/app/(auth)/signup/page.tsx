"use client";
import { useAuth } from "@/context/AuthContext";
import { signupApi } from "@/services/authService";
import Button from "@/ui/Button/Button";
import RHFTextField from "@/ui/RHFTextField/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

const schema = yup.object({
  name: yup
    .string()
    .min(5, "حداقل 5 کاراکتر نیاز است")
    .max(30)
    .required("نام و نام خوانوادگی الزامی است"),
  email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
  password: yup
    .string()
    .min(8, "حداقل 8 کاراکتر نیاز است")
    .required("رمز عبور الزامی است"),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const { signup } = useAuth();

  const onSubmit = async (values: any) => {
    await signup(values);
  };

  return (
    <>
      <h1 className="mb-6 text-center text-xl font-bold text-secondary-500">
        ثبت نام
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField
          label="نام و نام خانوادگی"
          name="name"
          register={register}
          errors={errors}
        />
        <RHFTextField
          label="ایمیل"
          name="email"
          register={register}
          dir="ltr"
          errors={errors}
        />
        <RHFTextField
          label="رمز عبور"
          name="password"
          register={register}
          type="password"
          dir="ltr"
          errors={errors}
        />
        <Button type="submit" variant="primary" className="w-full">
          تایید
        </Button>
      </form>
      <Link
        href="/signin"
        className="mt-4 text-center text-lg text-secondary-500"
      >
        ورود
      </Link>
    </>
  );
};

export default Signup;
