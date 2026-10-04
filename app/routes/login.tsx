import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthStore } from "~/stores/useAuthStore";
import { Link, useNavigate } from "react-router";
import { Button } from "antd";
import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { message } from "antd";
type Submit = {
  email: string;
  password: string;
};
const Login = () => {
  const navigate = useNavigate();
  const logIn = useAuthStore((state) => state.login);
  const schema = yup.object({
    email: yup.string().required().trim().email("invalid email format"),
    password: yup.string().required().trim().min(4, "at least 4 characters"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const onSubmit = (data: Submit) => {
    setLoading(true);
    const success = logIn(data.email, data.password);
    if (success) {
      navigate("/dashboard");
    } else {
      messageApi.open({
        type: "error",
        content: "Not found user",
        duration: 3,
      });
    }
    setLoading(false);
    reset();
  };
  const togglePass = () => {
    setIsVisible((prev) => !prev);
  };
  return (
    <div className="min-h-screen">
      {contextHolder}
      <div className="flex min-h-screen flex-col bg-[url('/wall.jpg')] bg-cover bg-center bg-no-repeat md:flex-row">
        <div className="hidden w-1/2 flex-col items-center justify-center gap-4 text-white/50 md:flex">
          <h1 className="text-4xl font-bold">LOGIN</h1>
          <p className="italic">FOLLOW YOUR TEAM!</p>
        </div>
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white/10 px-4 py-8 text-white backdrop-blur-sm md:w-1/2 md:px-8">
          <div className="flex w-full max-w-md items-center justify-center rounded-2xl border-4 border-double border-white px-5 py-10 sm:px-10 sm:py-16 md:py-20">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <input
                    placeholder="email(ex:test@gmail.com)"
                    type="text"
                    {...register("email")}
                    className={`p-2 pr-10 border w-full rounded-lg ${errors.email ? "border-red-500 shadow-lg" : "border-white shadow-lg"}`}
                  />
                  <div className="text-sm text-red-600 min-h-5">
                    {errors.email?.message}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="relative">
                    <input
                      placeholder="password"
                      {...register("password")}
                      className={`p-2 pr-10 border w-full rounded-lg ${errors.password ? "border-red-500 shadow-lg" : "border-white shadow-lg"}`}
                      type={!isVisible ? "password" : "text"}
                    />
                    <button
                      type="button"
                      onClick={togglePass}
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {isVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </button>
                  </div>
                  <div className="text-sm text-red-600 min-h-5">
                    {errors.password?.message}
                  </div>
                </div>
                <Button
                  disabled={!isValid || loading}
                  type="primary"
                  htmlType="submit"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <div className="flex gap-2 text-sm">
                  <p className="opacity-50">Don't have an account?</p>
                  <Link to={"/"}>Sign up for free</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
