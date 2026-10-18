import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthStore } from "~/stores/useAuthStore";
import { Link, useNavigate } from "react-router";
import { Button } from "antd";
import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useTimerStore } from "~/stores/useTimerStore";

type Submit = {
  email: string;
  password: string;
};
const Login = () => {
  const navigate = useNavigate();
  const logIn = useAuthStore((state) => state.login);
  const startTimer = useTimerStore((state) => state.start);
  const schema = yup.object({
    email: yup
      .string()
      .required("Email is a required field")
      .trim()
      .email("Invalid email format")
      .lowercase(),
    password: yup
      .string()
      .required("Password is a required field")
      .trim()
      .min(8, "At least 8 characters"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const onSubmit = (data: Submit) => {
    setLoading(true);
    const success = logIn(data.email, data.password);
    if (success) {
      startTimer(600);
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
    <div>
      {contextHolder}
      <div className="flex text-black/80  min-h-dvh flex-col bg-[url('/wall.jpg')] bg-cover bg-center bg-no-repeat md:flex-row">
        <div className="hidden w-1/2 flex-col items-center justify-center gap-4 md:flex">
          <h1 className="text-4xl font-bold">LOGIN</h1>
          <p className="italic">TechNova</p>
        </div>
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white/40 px-4 py-8 backdrop-blur-sm md:w-1/2 md:px-8">
          <div className="flex w-full max-w-md items-center bg-white justify-center rounded-2xl border border-gray-500/50 py-10 px-5 md:py-20 md:px-10">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col gap-8">
                <div className="flex gap-2 flex-col justify-center items-center">
                  <h1 className="text-2xl md:text-3xl text-blue-600 font-bold">
                    Login here
                  </h1>
                  <p className="italic">Welcome back</p>
                </div>
                <div className="flex flex-col gap-1">
                  <div>Email</div>
                  <input
                    placeholder="Email(ex:test@gmail.com)"
                    type="text"
                    {...register("email")}
                    className={`p-2 pr-10 border w-full rounded-lg ${errors.email ? "border-red-500 shadow-lg" : "shadow-lg"}`}
                  />
                  <div className="text-sm text-red-600 min-h-5">
                    {errors.email?.message}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div>Password</div>
                  <div className="relative">
                    <input
                      placeholder="Password"
                      {...register("password")}
                      className={`p-2 pr-10 border w-full rounded-lg ${errors.password ? "border-red-500 shadow-lg" : "shadow-lg"}`}
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
                  <div className="flex gap-2 justify-between items-center">
                    <div className="text-sm text-red-600 min-h-5">
                      {errors.password?.message}
                    </div>
                    <div className=" text-blue-600 text-sm">
                      <Link to="/forgotpassword">Forgot password?</Link>
                    </div>
                  </div>
                </div>
                <Button
                  className="py-5!"
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <div className="flex items-center gap-3 text-gray-500 before:h-px before:flex-1 before:bg-gray-300 after:h-px after:flex-1 after:bg-gray-300">
                  OR
                </div>
                <div className="flex justify-center gap-2 text-sm">
                  <p className="opacity-50">Don't have an account?</p>
                  <Link to="/signup" className="text-blue-600">
                    Sign up for free
                  </Link>
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
