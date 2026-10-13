import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";
import { useEmployeesStore } from "~/stores/useEmployeesStore";
import { useNavigate } from "react-router";
import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
const ForgotPassword = () => {
  const allUser = useEmployeesStore((state) => state.employees);
  const updateEmployees = useEmployeesStore((state) => state.updateEmployee);
  const [messageApi, contextHolder] = message.useMessage();
  const [isVisit, setIsVisit] = useState(false);
  const [isVisitTwo, setIsVisitTwo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const schema = yup.object({
    email: yup
      .string()
      .trim()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup.string().trim().required().min(4),
    confirmPassword: yup
      .string()
      .trim()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  type FormData = yup.InferType<typeof schema>;
  const onSubmit = (data: FormData) => {
    const findEmail = allUser.find(
      (user) => user.email.toLowerCase() === data.email.toLowerCase(),
    );
    if (!findEmail) {
      setError("email", { message: "Not found user" });
      return;
    } else {
      setIsLoading(true);
      updateEmployees({ ...findEmail, password: data.password });
      messageApi.success("Password changed");
      setTimeout(() => navigate("/login"), 1000);
    }
  };
  const onClick = () => {
    navigate("/login");
  };
  const changeIconPass = () => {
    setIsVisit((prev) => !prev);
  };
  const changeIconPassTwo = () => {
    setIsVisitTwo((prev) => !prev);
  };
  return (
    <div className="min-h-svh flex justify-center items-center bg-gray-100 bg-[url('/wall.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="container mx-auto px-4 md:px-0 md:w-150">
        {contextHolder}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 justify-center items-center text-white/50">
            <h1 className="md:text-3xl text-2xl font-bold">Forgot Password</h1>
            <p className="italic">TechNova</p>
          </div>
          <div className="text-white bg-white/10 rounded-lg backdrop-blur-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="border border-gray-500/50 p-8 rounded-lg">
                <div className="flex flex-col gap-1">
                  <div>Email</div>
                  <input
                    className="border rounded  px-4 py-1 h-10 w-full"
                    {...register("email")}
                  />
                  <span className="text-sm text-red-600 min-h-5">
                    {errors.email?.message}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div>New password</div>
                  <div className="relative">
                    <input
                      {...register("password")}
                      className="border rounded pr-10 px-4 py-1 h-10 w-full"
                      type={!isVisit ? "password" : "text"}
                    />
                    <button
                      type="button"
                      onClick={changeIconPass}
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {isVisit ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </button>
                  </div>
                  <span className="text-sm text-red-600 min-h-5">
                    {errors.password?.message}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div>Confirm password</div>
                  <div className="relative">
                    <input
                      {...register("confirmPassword")}
                      className="border rounded pr-10 px-4 py-1 h-10 w-full"
                      type={!isVisitTwo ? "password" : "text"}
                    />
                    <button
                      type="button"
                      onClick={changeIconPassTwo}
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {isVisitTwo ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </button>
                  </div>

                  <span className="text-sm text-red-600 min-h-5">
                    {errors.confirmPassword?.message}
                  </span>
                </div>
                <div className="flex gap-2 mt-5">
                  <Button
                    disabled={isLoading}
                    htmlType="button"
                    onClick={onClick}
                  >
                    Cancel
                  </Button>
                  <Button
                    loading={isLoading}
                    disabled={!isValid}
                    htmlType="submit"
                    type="primary"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
