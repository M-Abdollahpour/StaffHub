import { Button, Select, Modal, DatePicker } from "antd";
import { useEmployeesStore } from "~/stores/useEmployeesStore";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import type { Role, Status } from "~/types/employeeType";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
type OnSave = {
  id: string;
  onSave: () => void;
  onCancel: () => void;
};
const EmployeeEdit = ({ onSave, id, onCancel }: OnSave) => {
  const employees = useEmployeesStore((state) => state.employees);
  const updateEmployees = useEmployeesStore((state) => state.updateEmployee);
  const removeEmployees = useEmployeesStore((state) => state.removeEmployee);
  const findUser = employees.find((user) => user.id === id);
  const schema = yup.object({
    role: yup.mixed<Role>().oneOf(["admin", "user"]).required(),
    status: yup
      .mixed<Status>()
      .oneOf(["active", "inactive", "onLeave"])
      .required(),
    department: yup.string().required(),
    position: yup.string().required(),
    hireDate: yup.number().required(),
  });
  const {
    register,
    formState: { isValid, errors },
    control,
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      role: findUser?.role,
      status: findUser?.status,
      department: findUser?.department,
      position: findUser?.position,
      hireDate: findUser?.hireDate,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  type FormData = yup.InferType<typeof schema>;
  const onSubmit = async (data: FormData) => {
    if (!findUser) return;
    setIsLoading(true);
    setTimeout(() => {
      const update = { ...findUser, ...data };
      updateEmployees(update);
      setIsLoading(false);
      onSave();
    }, 1000);
  };
  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];
  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "onLeave", label: "OnLeave" },
  ];

  const handleRemove = () => {
    if (!findUser?.id) return;
    setIsLoading(true);
    setTimeout(() => {
      removeEmployees(findUser.id);
      setIsLoading(false);
      setIsModalOpen(false);
      onSave();
    }, 1000);
  };
  return (
    <div className="min-h-svh">
      <div className="container mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg border-gray-400/40 p-4 mt-4 relative">
              <div className="absolute left-4 -top-3 bg-white font-bold">
                Personal Information
              </div>
              <div>
                <span>Name</span>
                <div
                  className={`${!findUser?.firstName ? "bg-gray-100 h-10 rounded p-2" : "bg-gray-100 rounded p-2"}`}
                >
                  {findUser?.firstName}
                </div>
              </div>
              <div>
                <span>Last Name</span>
                <div
                  className={`${!findUser?.lastName ? "bg-gray-100 h-10 rounded p-2" : "bg-gray-100 rounded p-2"}`}
                >
                  {findUser?.lastName}
                </div>
              </div>
              <div>
                <span>Phone</span>
                <div
                  className={`${!findUser?.phone ? "bg-gray-100 h-10 rounded p-2" : "bg-gray-100 rounded p-2"}`}
                >
                  {findUser?.phone}
                </div>
              </div>
              <div>
                <span>Email</span>
                <div
                  className={`${!findUser?.email ? "bg-gray-100 h-10 rounded p-2" : "bg-gray-100 rounded p-2"}`}
                >
                  {findUser?.email}
                </div>
              </div>
              <div>
                <span>Gender</span>
                <div
                  className={`${!findUser?.gender ? "bg-gray-100 h-10 rounded p-2" : "bg-gray-100 rounded p-2"}`}
                >
                  {findUser?.gender}
                </div>
              </div>
              <div>
                <span>BirthDate</span>
                <div
                  className={`${!findUser?.birthDate ? "bg-gray-100 h-10 rounded p-2" : "bg-gray-100 rounded p-2"}`}
                >
                  {findUser?.birthDate}
                </div>
              </div>
              <div>
                <span>Married</span>
                <div
                  className={`${!findUser?.maritalStatus ? "bg-gray-100 h-10 rounded p-2" : "bg-gray-100 rounded p-2"}`}
                >
                  {findUser?.maritalStatus}
                </div>
              </div>
              <div>
                <span>language</span>
                <div
                  className={`${!findUser?.language ? "bg-gray-100 h-10 rounded p-2" : "bg-gray-100 rounded p-2"}`}
                >
                  {findUser?.language?.join(" | ")}
                </div>
              </div>
              <div>
                <span>Address</span>
                <div
                  className={`${!findUser?.address ? "bg-gray-100 h-10 rounded p-2" : "bg-gray-100 rounded p-2"}`}
                >
                  {findUser?.address}
                </div>
              </div>
              <div>
                <span>City</span>
                <div
                  className={`${!findUser?.city ? "bg-gray-100 h-10 rounded p-2" : "bg-gray-100 rounded p-2"}`}
                >
                  {findUser?.city}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 md:gap-2 md:grid-cols-2 mt-8 border p-4 rounded-lg border-gray-400/40 relative">
              <div className="absolute left-4 -top-3 bg-white font-bold">
                Organizational Info
              </div>
              <div className="flex flex-col gap-1">
                <span>Role</span>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <div className="bg-gray-100 rounded p-2">
                      <Select
                        {...field}
                        options={roleOptions}
                        className="border! text-base! bg-gray-100! border-black! shadow-none! focus-within:border-blue-600! focus-within:border-2! rounded! w-full! px-4! py-2! h-11! items-center!"
                      />
                    </div>
                  )}
                />
                <span className="text-sm text-red-600 h-2">
                  {errors.role?.message}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span>Status</span>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <div className="bg-gray-100 rounded p-2">
                      <Select
                        {...field}
                        options={statusOptions}
                        className="border! text-base! bg-gray-100! border-black! shadow-none! focus-within:border-blue-600! focus-within:border-2! rounded! w-full! px-4! py-2! h-11! items-center!"
                      />
                    </div>
                  )}
                />
                <span className="text-sm text-red-600 h-2">
                  {errors.status?.message}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span>Department</span>
                <div className="bg-gray-100 rounded p-2">
                  <input
                    {...register("department")}
                    className="border rounded px-4 py-1 h-10 w-full"
                  />
                </div>
                <span className="text-sm text-red-600 h-2">
                  {errors.department?.message}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span>Position</span>
                <div className="bg-gray-100 rounded p-2">
                  <input
                    {...register("position")}
                    className="border rounded px-4 py-1 h-10 w-full"
                  />
                </div>
                <span className="text-sm text-red-600 h-2">
                  {errors.position?.message}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span>HireDate</span>
                <div className="bg-gray-100 rounded p-2">
                  <Controller
                    name="hireDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        picker="year"
                        value={
                          field.value ? dayjs().year(field.value) : undefined
                        }
                        onChange={(date) =>
                          field.onChange(date ? date.year() : undefined)
                        }
                        className="w-full! border-black! shadow-none! rounded! focus-within:border-2! focus-within:border-blue-500! h-10! bg-gray-100!"
                      />
                    )}
                  />
                </div>
                <span className="text-sm text-red-600 h-2">
                  {errors.hireDate?.message}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <div>
                <Button htmlType="button" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
              <div>
                <Button
                  loading={isLoading}
                  disabled={!isValid}
                  htmlType="submit"
                  type="primary"
                >
                  Save
                </Button>
              </div>
              <div>
                <Button
                  htmlType="button"
                  danger
                  onClick={() => setIsModalOpen(true)}
                >
                  Remove
                </Button>
                <Modal
                  open={isModalOpen}
                  onOk={handleRemove}
                  onCancel={() => setIsModalOpen(false)}
                  confirmLoading={isLoading}
                  okText="Remove"
                  cancelText="Cancel"
                  okButtonProps={{ danger: true }}
                >
                  <p>
                    Are you sure you want to remove {findUser?.firstName}{" "}
                    {findUser?.lastName}?
                  </p>
                </Modal>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EmployeeEdit;
