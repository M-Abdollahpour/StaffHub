import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, message } from "antd";
import { useEmployeesStore } from "~/stores/useEmployeesStore";
import { useNavigate } from "react-router";
import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import ValidRolePassword from "~/components/validRolePassword/validRolePassword";
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
      .required("Email is required")
      .matches(
        /(?:[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+(?:\.[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\x2d]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      ),
    password: yup
      .string()
      .trim()
      .required("Password is a required field")
      .min(8, "At least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&_-])[A-Za-z\d@$!%*#?&_-]{8,}$/,
        {
          message: "Please match to roles",
        },
      ),
    confirmPassword: yup
      .string()
      .trim()
      .required("Confirm password is a required field")
      .oneOf([yup.ref("password")], "Passwords do not match")
      .min(8, "At least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&_-])[A-Za-z\d@$!%*#?&_-]{8,}$/,
      ),
  });
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
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
    <div className="min-h-svh text-black flex justify-center items-center bg-gray-100 bg-[url('/wall.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="container mx-auto px-4 md:px-0 md:w-150">
        {contextHolder}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-lg backdrop-blur-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="border border-gray-500/50 py-10 px-5 md:py-20 md:px-10 rounded-lg flex flex-col gap-8">
                <div className="flex flex-col gap-2 justify-center items-center">
                  <h1 className="text-2xl md:text-3xl text-blue-600 font-bold">
                    Forgot Password
                  </h1>
                  <p className="italic">TechNova</p>
                </div>
                <div className="flex flex-col gap-1 text-sm md:text-base">
                  <div>Email</div>
                  <input
                    placeholder="Email(ex:test@gmail.com)"
                    className="border rounded-lg  px-4 py-1 h-10 w-full"
                    {...register("email")}
                  />
                  <span className="text-sm text-red-600 min-h-5">
                    {errors.email?.message}
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-sm md:text-base">
                  <div>New password</div>
                  <div className="relative">
                    <input
                      placeholder="Password"
                      {...register("password")}
                      className="border rounded-lg pr-10 px-4 py-1 h-10 w-full"
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
                <div className="flex flex-col gap-1 text-sm md:text-base">
                  <div>Confirm password</div>
                  <div className="relative">
                    <input
                      placeholder="Confirm password"
                      {...register("confirmPassword")}
                      className="border rounded-lg pr-10 px-4 py-1 h-10 w-full"
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
                  <ValidRolePassword password={watch("password") ?? ""} />
                </div>
                <Button
                  className="py-5! text-base! md:text-lg!"
                  loading={isLoading}
                  htmlType="submit"
                  type="primary"
                >
                  Reset
                </Button>
                <Button
                  disabled={isLoading}
                  htmlType="button"
                  onClick={onClick}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
