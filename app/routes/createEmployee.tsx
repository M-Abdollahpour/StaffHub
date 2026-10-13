import { useEmployeesStore } from "~/stores/useEmployeesStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { nanoid } from "nanoid";
import type { Employee } from "~/types/employeeType";
import { Button, Modal, message } from "antd";
import { useState } from "react";
const CreateEmployee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const addEmployee = useEmployeesStore((state) => state.addEmployee);
  const currentList = useEmployeesStore((state) => state.employees);
  const navigate = useNavigate();
  type FormData = yup.InferType<typeof schema>;
  const schema = yup.object({
    id: yup.string(),
    firstName: yup.string().trim().required("First name is required"),
    lastName: yup.string().trim().required("Last name is required"),
    email: yup.string().trim().email().required(),
    password: yup.string().trim().required(),
  });
  const {
    register,
    handleSubmit,
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
        content: "Found user",
        duration: 3,
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      addEmployee(newEmployee);
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };
  const onClick = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="min-h-dvh  bg-[url('/wall.jpg')] bg-cover bg-center bg-no-repeat bg-gray-100 flex items-center justify-center">
      {contextHolder}
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="flex flex-col gap-2 text-white/50 justify-center items-center">
            <h1 className="md:text-4xl text-2xl font-bold">Signup</h1>
            <p className="italic">TechNova</p>
          </div>
          <div className="bg-white/20 w-full text-white backdrop-blur-sm border px-6 py-8 rounded-lg md:mx-0 md:w-150">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-4 flex-col">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <input
                      className="border rounded px-2 py-1 w-full"
                      {...register("firstName")}
                      placeholder="First name"
                    />
                    <p className="text-sm text-red-600 h-2">
                      {errors.firstName?.message}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <input
                      className="border rounded px-2 py-1 w-full"
                      {...register("lastName")}
                      placeholder="Last name"
                    />
                    <p className="text-sm text-red-600 h-2">
                      {errors.lastName?.message}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <input
                      className="border rounded px-2 py-1 w-full"
                      {...register("email")}
                      type="email"
                      placeholder="Email"
                    />
                    <p className="text-sm text-red-600 h-2">
                      {errors.email?.message}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <input
                      className="border rounded px-2 py-1 w-full"
                      {...register("password")}
                      type="password"
                      placeholder="Password"
                    />
                    <p className="text-sm text-red-600 h-2">
                      {errors.password?.message}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button disabled={isLoading} onClick={onClick}>
                    Cancel
                  </Button>
                  <Button
                    disabled={!isValid}
                    loading={isLoading}
                    htmlType="submit"
                    type="primary"
                  >
                    Add
                  </Button>
                  <Modal
                    title="Are you sure?"
                    closable={{ "aria-label": "Custom Close Button" }}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  ></Modal>
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
