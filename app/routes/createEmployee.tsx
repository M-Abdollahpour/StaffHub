import { useEmployeesStore } from "~/stores/useEmployeesStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router";
import { nanoid } from "nanoid";
import type { Employee } from "~/types/employeeType";
import { Badge, Button, message, Space } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useState } from "react";
const CreateEmployee = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const addEmployee = useEmployeesStore((state) => state.addEmployee);
  const currentList = useEmployeesStore((state) => state.employees);
  const navigate = useNavigate();
  type FormData = yup.InferType<typeof schema>;
  const schema = yup.object({
    id: yup.string(),
    firstName: yup.string().trim().required("First name is required"),
    lastName: yup.string().trim().required("Last name is required"),
    email: yup
      .string()
      .trim()
      .email("Invalid email format")
      .required("Email is a required field")
      .matches(
        /(?:[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+(?:\.[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\x2d]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        { message: "Invalid email format" },
      ),
    password: yup
      .string()
      .trim()
      .required("Password is a required field")
      .min(8, "At least 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        { message: "Please match to roles" },
      ),
  });
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });
  const onSubmit = (data: FormData) => {
    const newEmployee: Employee = {
      id: nanoid(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: "user",
    };
    const exists = currentList.find(
      (item) => item.email.toLowerCase() === data.email.toLowerCase(),
    );
    if (exists) {
      setError("email", {
        message: "This email is already registered",
      });
      messageApi.open({
        type: "error",
        content: "An account with this email already exists. Try logging in",
        duration: 3,
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      addEmployee(newEmployee);
      reset();
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };
  const togglePass = () => {
    setIsVisible((prev) => !prev);
  };
  return (
    <div className="min-h-dvh text-black/80 text-sm md:text-base  bg-[url('/wall.jpg')] bg-cover bg-center bg-no-repeat bg-gray-100 flex items-center justify-center">
      {contextHolder}
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8 justify-center items-center">
          <div className="bg-white w-full border border-gray-500/50 py-10 px-5 md:py-20 md:px-10 rounded-lg md:mx-0 md:w-150">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-8 flex-col">
                <div className="flex text-center flex-col gap-2  justify-center items-center">
                  <h1 className="text-2xl md:text-3xl text-blue-600 font-bold">
                    Create account
                  </h1>
                  <p className="italic">TechNova</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span>First name</span>
                    <input
                      className="border rounded-lg p-2 w-full"
                      {...register("firstName")}
                      placeholder="First name"
                    />
                    <p className="text-xs md:text-sm text-red-600 min-h-5">
                      {errors.firstName?.message}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span>Last name</span>
                    <input
                      className="border rounded-lg p-2 w-full"
                      {...register("lastName")}
                      placeholder="Last name"
                    />
                    <p className="text-xs md:text-sm text-red-600 min-h-5">
                      {errors.lastName?.message}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span>Email</span>
                    <input
                      className="border rounded-lg p-2 w-full"
                      {...register("email")}
                      type="email"
                      placeholder="Email(ex:test@gmail.com)"
                    />
                    <p className="text-xs md:text-sm text-red-600 min-h-5">
                      {errors.email?.message}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 justify-between">
                    <span>Password</span>
                    <div className="relative">
                      <input
                        className="border rounded-lg p-2 pr-10 w-full"
                        {...register("password")}
                        type={isVisible ? "text" : "password"}
                        placeholder="Password"
                      />
                      <button
                        type="button"
                        onClick={togglePass}
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                      >
                        {isVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </button>
                    </div>
                    <p className="text-xs md:text-sm text-red-600 min-h-5">
                      {errors.password?.message}
                    </p>
                    <span>
                      <Space vertical>
                        <Badge status="default" text="8 characters or more" />
                        <Badge
                          status="default"
                          text="A mixed of uppercase and lowercase letters"
                        />
                        <Badge status="default" text="At least one number" />
                        <Badge status="default" text="At least one symbol" />
                      </Space>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <Button
                    className="py-5! text-base! md:text-lg!"
                    loading={isLoading}
                    htmlType="submit"
                    type="primary"
                  >
                    Create Account
                  </Button>
                  <div className="flex justify-center gap-0.5 md:gap-2">
                    <span className="opacity-50">Already have an account?</span>
                    <Link className="text-blue-600" to={"/"}>
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateEmployee;
