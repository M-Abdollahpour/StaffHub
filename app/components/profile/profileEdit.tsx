import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthStore } from "~/stores/useAuthStore";
import { nanoid } from "nanoid";
import type { GetProp, UploadProps, DatePickerProps } from "antd";
import {
  Upload,
  message,
  Avatar,
  Button,
  Select,
  Modal,
  DatePicker,
} from "antd";
import { updateEmployees } from "../../mocks/api/updateEmployees";
import type { Language, Gender, MaritalStatus } from "~/types/employeeType";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
type OnSave = {
  onSave: () => void;
  onCancel: () => void;
};
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const weekFormat = "MM/DD";
const monthFormat = "YYYY/MM";

/** Manually entering any of the following formats will perform date parsing */
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const customFormat: DatePickerProps["format"] = (value) =>
  `custom format: ${value.format(dateFormat)}`;

const customWeekStartEndFormat: DatePickerProps["format"] = (value) =>
  `${dayjs(value).startOf("week").format(weekFormat)} ~ ${dayjs(value)
    .endOf("week")
    .format(weekFormat)}`;

const ProfileEdit = ({ onSave, onCancel }: OnSave) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const updateCurrentUserStore = useAuthStore(
    (state) => state.updateCurrentUser,
  );
  const schema = yup.object({
    firstName: yup.string().required().min(3),
    lastName: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().required().email(),
    gender: yup.mixed<Gender>().oneOf(["male", "female"]).required(),
    birthDate: yup.number().required(),
    maritalStatus: yup
      .mixed<MaritalStatus>()
      .oneOf(["single", "married"])
      .required(),
    city: yup.string().required(),
    address: yup.string().required(),
    language: yup
      .array()
      .of(
        yup
          .mixed<Language>()
          .oneOf(["persian", "english", "french", "spanish", "italian"])
          .required(),
      ),
    skills: yup.array().of(yup.string().required()),
    education: yup.array().of(
      yup.object({
        id: yup.string().required(),
        degree: yup.string().required().min(3),
        field: yup.string().required().min(3),
        university: yup.string().required().min(3),
        startYear: yup.number().required().min(4),
        endYear: yup.number().min(4),
      }),
    ),
    workExperience: yup.array().of(
      yup.object({
        id: yup.string().required(),
        title: yup.string().required(),
        company: yup.string().required(),
        startDate: yup.number().required(),
        endDate: yup.number().required(),
        description: yup.string().required(),
      }),
    ),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      phone: currentUser?.phone,
      email: currentUser?.email,
      gender: currentUser?.gender,
      birthDate: currentUser?.birthDate,
      maritalStatus: currentUser?.maritalStatus,
      city: currentUser?.city,
      address: currentUser?.address,
      language: currentUser?.language,
      skills: currentUser?.skills,
      education: currentUser?.education,
      workExperience: currentUser?.workExperience,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });
  const {
    fields: workFields,
    append: appendWork,
    remove: removeWork,
  } = useFieldArray({
    control,
    name: "workExperience",
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [imageUrl, setImageUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indexToRemove, setIndexToRemove] = useState<number | null>(null);
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      messageApi.error("You can only upload JPG/PNG file!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      messageApi.error("Image must smaller than 2MB!");
      return false;
    }
    setImageUrl(URL.createObjectURL(file));
    return false;
  };

  const personalInfo = [
    { label: "Name", name: "firstName", value: currentUser?.firstName },
    { label: "Last Name", name: "lastName", value: currentUser?.lastName },
    { label: "Phone", name: "phone", value: currentUser?.phone },
    { label: "Email", name: "email", value: currentUser?.email },
    { label: "Gender", name: "gender", value: currentUser?.gender },
    {
      label: "Married",
      name: "maritalStatus",
      value: currentUser?.maritalStatus,
    },
    { label: "City", name: "city", value: currentUser?.city },
    { label: "Address", name: "address", value: currentUser?.address },
  ] as const;
  type FormData = yup.InferType<typeof schema>;
  const onSubmit = async (data: FormData) => {
    if (!currentUser) return;
    setIsLoading(true);
    setTimeout(async () => {
      const updated = { ...currentUser, ...data };
      await updateEmployees(updated);
      updateCurrentUserStore(updated);
      setIsLoading(false);
      onSave();
    }, 500);
  };

  const languageOptions: Language[] = [
    "persian",
    "english",
    "french",
    "spanish",
    "italian",
  ];
  const selectOptions = languageOptions.map((lang) => ({
    value: lang,
    label: lang,
  }));
  const showModal = (index: number) => {
    setIndexToRemove(index);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handelOk = () => {
    if (indexToRemove !== null) {
      remove(indexToRemove);
    }
    setIsModalOpen(false);
  };
  return (
    <div className="container mx-auto">
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex gap-4 items-center">
            <div>
              <Upload
                name="avatar"
                listType="picture-circle"
                showUploadList={false}
                beforeUpload={beforeUpload}
                className="
                    avatar-uploader
                    [&_.ant-upload]:w-25!
                    [&_.ant-upload]:h-25!
                    [&_.ant-upload]:rounded-full!
                    [&_.ant-upload]:overflow-hidden!
"
              >
                {imageUrl ? (
                  <img
                    draggable={false}
                    src={imageUrl}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Avatar size={100}>
                    {currentUser?.firstName?.charAt(0)}
                  </Avatar>
                )}
              </Upload>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold">
                {currentUser?.firstName} {currentUser?.lastName}
              </span>
              <span className="text-sm opacity-50">{currentUser?.email}</span>
            </div>
          </div>
          <div className="border rounded-lg border-gray-400/40 p-4 mt-4 relative">
            <div className="absolute left-4 -top-3 bg-white font-bold">
              Personal Information
            </div>
            <ul className="grid grid-cols-2 gap-4">
              {personalInfo.map((item) => (
                <li key={item.label} className=" flex flex-col gap-1">
                  <div>{item.label}</div>
                  <div className="bg-gray-100 rounded p-2">
                    <input
                      {...register(item.name)}
                      className="border rounded px-4 py-1 h-10 w-full"
                    />
                  </div>
                  <span className="text-sm text-red-600 h-2">
                    {errors[item.name]?.message}
                  </span>
                </li>
              ))}
              <li className="flex flex-col gap-1">
                <div>Language</div>
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <div className="bg-gray-100 rounded p-2">
                      <Select
                        {...field}
                        mode="multiple"
                        options={selectOptions}
                        className="border! border-black! shadow-none! focus-within:border-blue-600! focus-within:border-2! rounded! w-full! px-4! py-2! h-10! items-center!"
                      />
                    </div>
                  )}
                />
                <span className="text-sm text-red-600 h-2">
                  {errors.language?.message}
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <div>Birthday</div>
                <div className="bg-gray-100 rounded p-2">
                  <Controller
                    name="birthDate"
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
                  {errors.birthDate?.message}
                </span>
              </li>
            </ul>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-8 border p-4 rounded-lg border-gray-400/40 relative">
            <div className="absolute left-4 -top-3 bg-white font-bold">
              Professional Background
            </div>
            <div>
              <div>Education</div>
              <ul className="grid gap-4">
                {fields.map((Item, index) => (
                  <li
                    key={Item.id}
                    className="bg-gray-100 rounded p-2 grid grid-cols-1 gap-2"
                  >
                    <div className="border px-2 pt-2 pb-4 rounded border-gray-500/55 flex flex-col gap-1">
                      <div>Degree</div>
                      <input
                        {...register(`education.${index}.degree`)}
                        className="border rounded px-2 py-1 w-full"
                        placeholder="Degree"
                      />
                      <span className="text-sm text-red-600 h-2">
                        {errors.education?.[index]?.degree?.message}
                      </span>
                    </div>
                    <div className="border px-2 pt-2 pb-4 rounded border-gray-500/55 flex flex-col gap-1">
                      <div>Field</div>
                      <input
                        {...register(`education.${index}.field`)}
                        className="border rounded px-2 py-1 w-full"
                        placeholder="Field"
                      />
                      <span className="text-sm text-red-600 h-2">
                        {errors.education?.[index]?.field?.message}
                      </span>
                    </div>
                    <div className="border px-2 pt-2 pb-4 rounded border-gray-500/55 flex flex-col gap-1">
                      <div>University</div>
                      <input
                        {...register(`education.${index}.university`)}
                        className="border rounded px-2 py-1 w-full"
                        placeholder="University"
                      />
                      <span className="text-sm text-red-600 h-2">
                        {errors.education?.[index]?.university?.message}
                      </span>
                    </div>
                    <div className="border px-2 pt-2 pb-4 rounded border-gray-500/55 flex flex-col gap-1">
                      <div>Start Year</div>
                      <Controller
                        name={`education.${index}.startYear`}
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            picker="year"
                            value={
                              field.value
                                ? dayjs().year(field.value)
                                : undefined
                            }
                            onChange={(date) =>
                              field.onChange(date ? date.year() : undefined)
                            }
                            className="w-full! border-black! shadow-none! rounded! focus-within:border-2! focus-within:border-blue-500! h-9! bg-gray-100!"
                          />
                        )}
                      />
                      <span className="text-sm text-red-600 h-2">
                        {errors.education?.[index]?.startYear?.message}
                      </span>
                    </div>
                    <div className="border px-2 pt-2 pb-4 rounded border-gray-500/55 flex flex-col gap-1">
                      <div>End Year</div>
                      <Controller
                        name={`education.${index}.endYear`}
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            picker="year"
                            value={
                              field.value
                                ? dayjs().year(field.value)
                                : undefined
                            }
                            onChange={(date) =>
                              field.onChange(date ? date.year() : undefined)
                            }
                            className="w-full! border-black! shadow-none! rounded! focus-within:border-2! focus-within:border-blue-500! h-9! bg-gray-100!"
                          />
                        )}
                      />
                      <span className="text-sm text-red-600 h-2">
                        {errors.education?.[index]?.endYear?.message}
                      </span>
                    </div>
                    <Button
                      danger
                      onClick={() => showModal(index)}
                      htmlType="button"
                    >
                      Remove
                    </Button>
                    <Modal
                      title="Warning"
                      closable={{ "aria-label": "Custom Close Button" }}
                      open={isModalOpen}
                      onOk={handelOk}
                      onCancel={handleCancel}
                    >
                      <p>Are you sure?</p>
                    </Modal>
                  </li>
                ))}
              </ul>
              <div className="py-4">
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={() =>
                    append({
                      id: nanoid(),
                      degree: "",
                      field: "",
                      university: "",
                      startYear: 0,
                      endYear: undefined,
                    })
                  }
                >
                  Add Education
                </Button>
              </div>
            </div>
            <div>
              <div>Work Experience</div>
              <ul className="grid gap-4">
                {workFields.map((Item, Index) => (
                  <li
                    key={Item.id}
                    className="bg-gray-100 rounded p-2 grid grid-cols-1 gap-2"
                  >
                    <div className="border px-2 pt-2 pb-4 rounded border-gray-500/55 flex flex-col gap-1">
                      <div>Title</div>
                      <input
                        {...register(`workExperience.${Index}.title`)}
                        className="border rounded px-2 py-1 w-full"
                        placeholder="Title"
                      />
                      <span className="text-sm text-red-600 h-2">
                        {errors.workExperience?.[Index]?.title?.message}
                      </span>
                    </div>
                    <div className="border px-2 pt-2 pb-4 rounded border-gray-500/55 flex flex-col gap-1">
                      <div>Company</div>
                      <input
                        {...register(`workExperience.${Index}.company`)}
                        className="border rounded px-2 py-1 w-full"
                        placeholder="Company"
                      />
                      <span className="text-sm text-red-600 h-2">
                        {errors.workExperience?.[Index]?.company?.message}
                      </span>
                    </div>
                    <div className="border px-2 pt-2 pb-4 rounded border-gray-500/55 flex flex-col gap-1">
                      <div>Start Date</div>
                      <Controller
                        name={`workExperience.${Index}.startDate`}
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            picker="year"
                            value={
                              field.value
                                ? dayjs().year(field.value)
                                : undefined
                            }
                            onChange={(date) =>
                              field.onChange(date ? date.year() : undefined)
                            }
                            className="w-full! border-black! shadow-none! rounded! focus-within:border-2! focus-within:border-blue-500! h-9! bg-gray-100!"
                          />
                        )}
                      />
                      <span className="text-sm text-red-600 h-2">
                        {errors.workExperience?.[Index]?.startDate?.message}
                      </span>
                    </div>
                    <div className="border px-2 pt-2 pb-4 rounded border-gray-500/55 flex flex-col gap-1">
                      <div>End Date</div>
                      <Controller
                        name={`workExperience.${Index}.endDate`}
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            picker="year"
                            value={field.value ? dayjs(`${field.value}`) : null}
                            onChange={(date) =>
                              field.onChange(date?.year() ?? undefined)
                            }
                            onBlur={field.onBlur}
                            className="w-full! border-black! shadow-none! rounded! focus-within:border-2! focus-within:border-blue-500! h-9! bg-gray-100!"
                          />
                        )}
                      />
                      <span className="text-sm text-red-600 h-2">
                        {errors.workExperience?.[Index]?.endDate?.message}
                      </span>
                    </div>
                    <div className="border px-2 pt-2 pb-4 rounded border-gray-500/55 flex flex-col gap-1">
                      <div>Description</div>
                      <input
                        {...register(`workExperience.${Index}.description`)}
                        className="border rounded px-2 py-1 w-full"
                        placeholder="Description"
                      />
                      <span className="text-sm text-red-600 h-2">
                        {errors.workExperience?.[Index]?.description?.message}
                      </span>
                    </div>
                    <Button
                      danger
                      onClick={() => removeWork(Index)}
                      htmlType="button"
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
              <div className="py-4">
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={() =>
                    appendWork({
                      id: nanoid(),
                      title: "",
                      company: "",
                      startDate: 0,
                      endDate: 0,
                      description: "",
                    })
                  }
                >
                  Add Experience
                </Button>
              </div>
            </div>
            <div>
              <ul className="grid gap-4 mt-2">
                <li>
                  <div>Skills</div>
                  <Controller
                    name="skills"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        mode="tags"
                        options={[]}
                        className="border! border-black! shadow-none! focus-within:border-blue-600! focus-within:border-2! rounded! w-full! mt-2! px-4! py-2! h-10! items-center!"
                      />
                    )}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-7 flex gap-2">
          <Button
            className="w-20!"
            htmlType="submit"
            type="primary"
            disabled={!isValid}
            loading={isLoading}
          >
            {isLoading ? isLoading : "Save"}
          </Button>
          <Button htmlType="button" danger onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
export default ProfileEdit;
